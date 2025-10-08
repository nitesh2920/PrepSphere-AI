import { text } from "drizzle-orm/pg-core";
import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq,and } from "drizzle-orm";
import { generateNotesAIModel, generateFlashcards } from "@/configs/AiModel";
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
        console.log(result);
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
          console.log(userData);
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
    // console.log("courser all data",course);

    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      let index = 0;
      console.log("andarn hai");

      for (const chapter of chapters) {
        const prompt =
          "Generate detailed exam material for each chapter listed below. Include all topic points under each chapter. Format the response strictly in clean semantic HTML (do NOT include <html>, <head>, <body>, or <title> tags). Wrap each chapter in <div class='chapter'> with <h1> as the chapter number along with the title. Use proper structure with <p>, <h2>, <ul>, <li>, <code>, <pre>, <details>, <summary>, etc. The response must start with ```html and end with ``` and contain only HTML." +
          JSON.stringify(chapter);
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

      console.log("end hogya");

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
    const { studyType, prompt, courseId,recordId } = event.data;

    const FlashcardAiResult = await step.run(
      "Generating FlashCard using ai",
      async () => {
        const result = await generateFlashcards(prompt);
        const AIResult = JSON.parse(result);
        return AIResult;
      }
    );
    const DbResult = await step.run("Save result to db", async () => {
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: FlashcardAiResult,
          status:'Ready'
        })
        .where( eq(STUDY_TYPE_CONTENT_TABLE.id, recordId)
        );

      return "Flashcard Data Inserted";
    });
  }
);
