import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Check status of specific courses by their IDs
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseIds } = body as { courseIds: string[] };

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return NextResponse.json(
        { error: "courseIds array is required" },
        { status: 400 }
      );
    }

    // Query only the specific courses
    const result = await db
      .select({
        courseId: STUDY_MATERIAL_TABLE.courseId,
        status: STUDY_MATERIAL_TABLE.status
      })
      .from(STUDY_MATERIAL_TABLE)
      .where(inArray(STUDY_MATERIAL_TABLE.courseId, courseIds));

    return NextResponse.json({ result });
    
  } catch (error) {
    console.error("Error checking course status:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}