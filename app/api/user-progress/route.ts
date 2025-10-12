import { db } from "@/configs/db";
import { USER_PROGRESS_TABLE, CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, userId, courseId, materialType, itemId } = await req.json();

    if (action === 'mark_complete') {
      // Mark an item as completed
      const existingProgress = await db
        .select()
        .from(USER_PROGRESS_TABLE)
        .where(and(
          eq(USER_PROGRESS_TABLE.userId, userId),
          eq(USER_PROGRESS_TABLE.courseId, courseId),
          eq(USER_PROGRESS_TABLE.materialType, materialType),
          eq(USER_PROGRESS_TABLE.itemId, itemId)
        ));

      if (existingProgress.length === 0) {
        // Create new progress record
        await db.insert(USER_PROGRESS_TABLE).values({
          userId,
          courseId,
          materialType,
          itemId,
          completed: true,
          completedAt: new Date()
        });
      } else {
        // Update existing record
        await db
          .update(USER_PROGRESS_TABLE)
          .set({
            completed: true,
            completedAt: new Date()
          })
          .where(and(
            eq(USER_PROGRESS_TABLE.userId, userId),
            eq(USER_PROGRESS_TABLE.courseId, courseId),
            eq(USER_PROGRESS_TABLE.materialType, materialType),
            eq(USER_PROGRESS_TABLE.itemId, itemId)
          ));
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'get_progress') {
      // Get user progress for a course
      const userProgress = await db
        .select()
        .from(USER_PROGRESS_TABLE)
        .where(and(
          eq(USER_PROGRESS_TABLE.userId, userId),
          eq(USER_PROGRESS_TABLE.courseId, courseId),
          eq(USER_PROGRESS_TABLE.completed, true)
        ));

      // Get total available items for each material type
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      const studyMaterials = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

      // Calculate progress for each material type
      const notesProgress = userProgress.filter(p => p.materialType === 'notes') || [];
      const flashcardsProgress = userProgress.filter(p => p.materialType === 'flashcards') || [];
      const quizProgress = userProgress.filter(p => p.materialType === 'quiz') || [];
      const qaProgress = userProgress.filter(p => p.materialType === 'qa') || [];

      // Get flashcard count from content
      const flashcardContent = studyMaterials.find(s => s.type === 'Flashcard');
      let flashcardCount = 0;
      if (flashcardContent?.content) {
        try {
          const content = typeof flashcardContent.content === 'string' 
            ? JSON.parse(flashcardContent.content) 
            : flashcardContent.content;
          flashcardCount = Array.isArray(content) ? content.length : 0;
        } catch (e) {
          flashcardCount = 0;
        }
      }

      // Get quiz count from content
      const quizContent = studyMaterials.find(s => s.type === 'quiz');
      let quizCount = 0;
      if (quizContent?.content) {
        try {
          const content = typeof quizContent.content === 'string' 
            ? JSON.parse(quizContent.content) 
            : quizContent.content;
          quizCount = Array.isArray(content) ? content.length : 0;
        } catch (e) {
          quizCount = 0;
        }
      }

      // Get QA count from content
      const qaContent = studyMaterials.find(s => s.type === 'qa');
      let qaCount = 0;
      if (qaContent?.content) {
        try {
          const content = typeof qaContent.content === 'string' 
            ? JSON.parse(qaContent.content) 
            : qaContent.content;
          qaCount = Array.isArray(content) ? content.length : 0;
        } catch (e) {
          qaCount = 0;
        }
      }

      const progressData = {
        notes: {
          completed: notesProgress?.length || 0,
          total: notes?.length || 0,
          percentage: (notes?.length || 0) > 0 ? Math.round(((notesProgress?.length || 0) / (notes?.length || 0)) * 100) : 0
        },
        flashcards: {
          completed: flashcardsProgress?.length || 0,
          total: flashcardCount || 0,
          percentage: flashcardCount > 0 ? Math.round(((flashcardsProgress?.length || 0) / flashcardCount) * 100) : 0
        },
        quiz: {
          completed: quizProgress?.length || 0,
          total: quizCount || 0,
          percentage: quizCount > 0 ? Math.round(((quizProgress?.length || 0) / quizCount) * 100) : 0
        },
        qa: {
          completed: qaProgress?.length || 0,
          total: qaCount || 0,
          percentage: qaCount > 0 ? Math.round(((qaProgress?.length || 0) / qaCount) * 100) : 0
        }
      };

      // Calculate overall progress
      const totalItems = (notes?.length || 0) + (flashcardCount || 0) + (quizCount || 0) + (qaCount || 0);
      const completedItems = (notesProgress?.length || 0) + (flashcardsProgress?.length || 0) + (quizProgress?.length || 0) + (qaProgress?.length || 0);
      const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      return NextResponse.json({
        progress: progressData,
        overall: {
          completed: completedItems,
          total: totalItems,
          percentage: overallPercentage
        }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}