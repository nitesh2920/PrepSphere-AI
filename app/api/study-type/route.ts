import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
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

    const result = {
      notes: notes,
      flashcard: null,
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
}
