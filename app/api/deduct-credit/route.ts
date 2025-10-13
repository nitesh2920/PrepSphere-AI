import { NextResponse, NextRequest } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ 
        error: "User email is required" 
      }, { status: 400 });
    }


    // Get user credits
    const user = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, userEmail));

    if (user.length === 0) {
      console.log('❌ User not found:', userEmail);
      return NextResponse.json({ 
        error: "User not found",
        needsUpgrade: true 
      }, { status: 404 });
    }

    const currentCredits = user[0].credits || 0;

    if (currentCredits <= 0) {
      return NextResponse.json({ 
        error: "Insufficient credits. Please upgrade your plan.",
        needsUpgrade: true 
      }, { status: 403 });
    }

    // Deduct one credit
    const newCredits = currentCredits - 1;
    await db
      .update(USER_TABLE)
      .set({ credits: newCredits })
      .where(eq(USER_TABLE.email, userEmail));


    return NextResponse.json({ 
      success: true,
      remainingCredits: newCredits,
      message: "Credit deducted successfully"
    });

  } catch (error) {
    console.error('❌ Error deducting credit:', error);
    return NextResponse.json({ 
      error: "Failed to process credit deduction. Please try again.",
      needsUpgrade: false 
    }, { status: 500 });
  }
}