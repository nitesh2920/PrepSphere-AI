import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"; // Renamed for camelCase convention
import { eq,desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST requests to fetch study materials created by a specific user.
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} A JSON response containing the list of study materials.
 */
export async function POST(req: NextRequest) {
  try {
    // We expect the request body to be a JSON object with a 'createdBy' property.
    const body = await req.json();
    const { createdBy } = body as { createdBy: string };

    // Validate that 'createdBy' was provided
    if (!createdBy) {
      return NextResponse.json(
        { error: "The 'createdBy' field is required" },
        { status: 400 }
      );
    }

    // Perform the database query using Drizzle ORM
    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id));

    // Return the found materials
    return NextResponse.json({ result });
    
  } catch (error) {
    // Handle potential errors, such as invalid JSON or database issues
    console.error("Error fetching study materials:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}