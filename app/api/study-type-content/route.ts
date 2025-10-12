import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
   const {chapters,courseId,type}=await req.json();

 let PROMPT = '';
   
   if (type === 'Flashcard') {
     PROMPT = `Generate comprehensive flashcards on topics: ${chapters}
     
     Requirements:
     - Create 15-20 flashcards covering key concepts
     - Front: Clear, concise question or term
     - Back: Detailed explanation with examples
     - Focus on important concepts, definitions, and practical applications
     - Include both theoretical and practical aspects
     - Make questions challenging but fair for study preparation
     
     Return in JSON format with front and back content.`;
   } else if (type === 'quiz') {
     PROMPT = `Generate a comprehensive quiz on topics: ${chapters}
     
     Requirements:
     - Create 10-15 multiple choice questions
     - Cover all major concepts from the topics
     - Include 4 options per question (A, B, C, D)
     - Mix difficulty levels (easy, medium, hard)
     - Focus on practical application and understanding
     - Ensure one clearly correct answer per question
     
     Return in JSON format with question, options array, and correct answer.`;
   } else if (type === 'qa') {
     PROMPT = `Generate comprehensive interview-style Q&A content on topics: ${chapters}
     
     Requirements:
     - Create 15-20 detailed question-answer pairs
     - Focus on interview-style questions commonly asked about these topics
     - Include different difficulty levels: Easy, Medium, Hard
     - Categories: Conceptual, Practical, Problem-solving, Best Practices
     - Provide detailed, comprehensive answers with explanations
     - Include follow-up questions that might be asked
     - Add relevant tags for easy categorization
     - Cover both theoretical knowledge and practical implementation
     - Include real-world scenarios and examples
     
     For each Q&A pair include:
     - question: The main interview question
     - answer: Detailed, comprehensive answer with examples
     - difficulty: Easy/Medium/Hard
     - category: Type of question (Conceptual/Practical/Problem-solving/Best Practices)
     - tags: Array of relevant keywords
     - followUpQuestions: Array of potential follow-up questions
     
     Return in JSON format.`;
   } else {
     PROMPT = `Generate study content for: ${chapters}`;
   }
   
   console.log(`Creating database record for courseId: ${courseId}, type: ${type}`);
   
   const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
    courseId:courseId,
    type:type

   }).returning({
    id:STUDY_TYPE_CONTENT_TABLE.id
   })
   
   console.log(`Database record created with ID: ${result[0].id}`);
   console.log(`Sending inngest event for studyType: ${type}`);
   
   try {
     await inngest.send({
      name:'studyType.content',
      data:{
          studyType:type,
          prompt:PROMPT,
          courseId:courseId,
          recordId:result[0].id

      }

     });

     console.log(`Inngest event sent successfully`);
   } catch (inngestError) {
     console.error(`Error sending inngest event:`, inngestError);
     throw inngestError;
   }

   // Verify the record was created
   const verification = await db
     .select()
     .from(STUDY_TYPE_CONTENT_TABLE)
     .where(eq(STUDY_TYPE_CONTENT_TABLE.id, result[0].id));
   
   console.log(`Verification - Record exists: ${verification.length > 0}`);
   if (verification.length > 0) {
     console.log(`Initial record status: ${verification[0].status}`);
   }

   return NextResponse.json({
     id: result[0].id,
     status: 'initiated',
     message: 'Content generation started'
   })

}