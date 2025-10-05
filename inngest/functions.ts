import { text } from 'drizzle-orm/pg-core';
import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAIModel } from "@/configs/AiModel";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";


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
      console.log('andarn hai')
   

     for (const chapter of chapters) {
        const prompt =
          "Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML , Head, Body, title tag), The chapters: " +
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

      console.log("end hogya")

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
      });
  }
);
