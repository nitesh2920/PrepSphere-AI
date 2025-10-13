import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, userEmail, amount } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    if (action === 'get_credits') {
      // Get user credits
      const user = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, userEmail));

      if (user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        credits: user[0].credits || 0,
        isMember: user[0].isMember || false
      });
    }

    if (action === 'use_credit') {
      // Use one credit
      const user = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, userEmail));

      if (user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const currentCredits = user[0].credits || 0;
      if (currentCredits <= 0) {
        return NextResponse.json({ 
          error: "Insufficient credits", 
          needsUpgrade: true 
        }, { status: 403 });
      }

      // Deduct one credit
      await db
        .update(USER_TABLE)
        .set({ credits: currentCredits - 1 })
        .where(eq(USER_TABLE.email, userEmail));

      return NextResponse.json({
        success: true,
        remainingCredits: currentCredits - 1
      });
    }

    if (action === 'add_credits') {
      // Add credits (for premium upgrade)
      if (!amount || amount <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
      }

      await db
        .update(USER_TABLE)
        .set({ 
          credits: amount,
          isMember: true 
        })
        .where(eq(USER_TABLE.email, userEmail));

      return NextResponse.json({ success: true });
    }

    if (action === 'sync_member_credits') {
      // Sync credits for existing members who might have wrong credit count
      // Only sync if credits are 0 or negative (not for normal usage 1-49)
      const user = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, userEmail));

      if (user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const currentUser = user[0];
      const currentCredits = currentUser.credits || 0;
      
      
      // Only sync if user is a member and has 0 or negative credits (indicating an issue)
      // Don't sync for normal credit usage (1-49 credits)
      if (currentUser.isMember && currentCredits <= 0) {
        await db
          .update(USER_TABLE)
          .set({ credits: 50 })
          .where(eq(USER_TABLE.email, userEmail));

        return NextResponse.json({ 
          success: true, 
          message: "Credits synced to 50 for Pro member",
          newCredits: 50 
        });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Credits already correct",
        credits: currentUser.credits 
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}