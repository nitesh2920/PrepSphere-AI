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
  const exam = course?.courseType;  
  const difficultyLevel = course?.difficultyLevel;  
  
  console.log("coursesss", course);
  
  let index = 0;
  for (const chapter of chapters) {
    // Constructing the prompt based on the `exam` and `difficultyLevel`
    const prompt = `
    Generate study notes accoring to the diffcultyLevel ${difficultyLevel} for the following chapter. Make sure to include all topic points listed in the chapter. Format the content as clean semantic HTML (without <html>, <head>, <body>, or <title> tags).

    Chapter Information: ${JSON.stringify(chapter)}

    Requirements:
    1. Format as clean semantic HTML (NO <html>, <head>, <body>, or <title> tags).
    2. Start with <h1> containing "Chapter [number]: [title] [emoji]" format (e.g., "Chapter 1: Introduction to React ⚛️").
    3. Use proper HTML structure: <div class='chapter'>, <h2>, <h3>, <p>, <ul>, <li>, <code>, <pre>, <details>, <summary>.
    4. Include explanations for each topic listed in the chapter based on the selected difficulty level of the course (i.e., ${difficultyLevel}).
    5. Add practical examples and code snippets where relevant.
    6. use bakctick only for keywords or main point don't use it on heading or subheadings.
    7. Use emojis that are contextually relevant to the chapter content and match the topic.
    8. For ${exam}, make sure to focus on key concepts that are likely to be tested, especially on the difficulty level of ${difficultyLevel}.
    9. Structure content with clear headings and subheadings to make the content easy to follow and understand.

    Ensure the study notes are comprehensive and relevant to the chapter topics. The material should be useful for mastering the concepts for exams and interviews.
    `;
    
    // Call the AI model with the generated prompt to get the study notes for the chapter
    const result = await generateNotesAIModel(prompt);
    const aiResp = result;

    // Insert the generated study notes into the database
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
