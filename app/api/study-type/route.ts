import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Assuming studyType and courseId are destructured from the request body
  const { studyType, courseId } = await req.json();

  if (studyType === "ALL") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    // Get The All Other Study Type Records

    const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId))


    const result = {
      notes: notes,
      Flashcard: contentList?.filter(item => item.type == 'Flashcard'),
      quiz: contentList?.filter(item => item.type == 'quiz'),
      qa: contentList?.filter(item => item.type == 'qa')

    };

    return NextResponse.json(result);
  } else if (studyType === "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    return NextResponse.json(notes);
  }
  else {
    const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(and(
        eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE?.type, studyType)
      ))
    
    if (result.length > 0) {
      const data = result[0];
      
      // Ensure content is properly parsed if it's a string
      if (data.content && typeof data.content === 'string') {
        try {
          data.content = JSON.parse(data.content);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ content: null });
    }
  }
}
