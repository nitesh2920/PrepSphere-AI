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
      flashcard: contentList?.filter(item=>item.type == 'Flashcard'),
      quiz: null,
      qa: null
    };

    return NextResponse.json(result);
  } else if (studyType === "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    return NextResponse.json(notes);
  }
  else{
     const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(and(
        eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
      ))

    return NextResponse.json(  result[0] ? JSON.parse(JSON.stringify(result[0])) : null
);
  }
}
