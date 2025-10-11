import { NextResponse,NextRequest} from "next/server"
import { getCourseOutline } from "@/configs/AiModel"
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { inngest } from "@/inngest/client";

export async function POST(req:NextRequest) {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();

    const PROMPT = 'Generate a study material for ' + topic + ' for' + studyType + ' and level of difficulty  will be ' + difficultyLevel + ' with sumery of course, List of Chapters along with summary and Emoji icon related for each chapter and the heading of each chapter should be in h1 tag, Topic list in each chapter in JSON format only. '

    const aiResp = await getCourseOutline(PROMPT)
    const cleanJson = aiResp.replace(/```json\n?|```/g, '').trim();
    const aiResult = JSON.parse(cleanJson);

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: studyType,
        difficultyLevel: difficultyLevel,

        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,

    }).returning({ resp: STUDY_MATERIAL_TABLE })

    console.log(dbResult)

    const result = await inngest.send({
        name:'course.generate',
        data:{
            course:dbResult[0].resp
        }

    });
    console.log("Inngest Result:", result);
    return NextResponse.json({ result: dbResult[0] })
}