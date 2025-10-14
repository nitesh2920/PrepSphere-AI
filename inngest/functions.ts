import { text } from "drizzle-orm/pg-core";
import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq, and } from "drizzle-orm";
import { generateNotesAIModel, generateFlashcards, generateQuiz, generateQA } from "@/configs/AiModel";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE
} from "@/configs/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {

    const { user } = event.data;
    const result = await step.run(
      "Check existing user and create New user if dont exists ",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        if (result?.length == 0) {
          const userData = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress
            })
            .returning({
              id: USER_TABLE.id
            });
        }
        return result;
      }
    );
    return "Account Created Successfully";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "course.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    console.log("courser all data",course);

    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      console.log("coursesss",course)
      let index = 0;
      for (const chapter of chapters) {
        const prompt =
          `Generate comprehensive study notes for the following chapter. Create detailed, well-structured content that covers all topics thoroughly.

Chapter Information: ${JSON.stringify(chapter)}

Requirements:
1. Format as clean semantic HTML (NO <html>, <head>, <body>, or <title> tags)
2. Start with <h1> containing "Chapter [number]: [title] [emoji]" format (e.g., "Chapter 1: Introduction to React ⚛️")
3. Use proper HTML structure: <div class='chapter'>, <h2>, <h3>, <p>, <ul>, <li>, <code>, <pre>, <details>, <summary>
4. Include explanations for each topic listed in the chapter according to the diffculty choosed.
5. Add practical examples and code snippets where relevant
6. Use emojis that are contextually relevant to the chapter content
8. Structure content with clear headings and subheadings

Generate detailed, educational content that helps students master the concepts for their studies.`;
        const result = await generateNotesAIModel(prompt);
        const aiResp = result;
        // console.log("AI Response:", aiResp);
        await db.insert(CHAPTER_NOTES_TABLE).values({
          courseId: course?.courseId,
          chapterId: index,
          notes: aiResp
        });
        index++;
      }

      return "Completed";
    });

    const updateCourseStatus = await step.run(
      "Update Course Status",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "Ready"
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

        return "Course Status Updated to Ready";
      }
    );


  }
);

// Used to generate Flashcard, Quiz, Question Answer
export const GenerateStudyTypeContent = inngest.createFunction(
  
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },

  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;
     


    const AiResult = await step.run(
      "Generating AI result using ai",
      async () => {
        try {
          console.log(`Starting AI generation for studyType: ${studyType}`);
          let result;
          
          if (studyType === 'Flashcard') {
            result = await generateFlashcards(prompt);
          } else if (studyType === 'quiz') {
            result = await generateQuiz(prompt);
          } else if (studyType === 'qa') {
            result = await generateQA(prompt);
          } else {
            throw new Error(`Unsupported study type: ${studyType}`);
          }
          
          
          if (!result || result.trim() === '') {
            throw new Error(`Empty result from AI for study type: ${studyType}`);
          }
          
          const AIResult = JSON.parse(result);
          console.log(`Parsed AI result for ${studyType}:`, Array.isArray(AIResult) ? `Array with ${AIResult.length} items` : typeof AIResult);
          
          return AIResult;
        } catch (error) {
          console.error(`Error in AI generation for ${studyType}:`, error);
          throw error;
        }
      }
    );





    const DbResult = await step.run("Save result to db", async () => {
      try {
        console.log(`Saving to database - recordId: ${recordId}, studyType: ${studyType}`);
        console.log(`Content to save:`, Array.isArray(AiResult) ? `Array with ${AiResult.length} items` : typeof AiResult);
        
        const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content: AiResult,
            status: 'Ready'
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

        console.log(`Database update result:`, result);
        
        // Verify the data was saved
        const verification = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
          
        console.log(`Verification - Record found:`, verification.length > 0);
        if (verification.length > 0) {
          console.log(`Saved content status:`, verification[0].status);
          console.log(`Saved content type:`, typeof verification[0].content);
        }

        return "data inserted successfully";
      } catch (error) {
        console.error(`Error saving to database:`, error);
        throw error;
      }
    });

    console.log(`GenerateStudyTypeContent completed for ${studyType}`);
    return { 
      success: true, 
      studyType, 
      recordId, 
      message: "Content generated and saved successfully" 
    };
  }
);
