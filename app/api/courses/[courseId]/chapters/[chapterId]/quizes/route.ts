import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title } = await req.json();
        const { courseId, chapterId } = params;

        const quiz = await db.quiz.create({
            data: {
                title: title,
                courseId: courseId,
                chapterId: chapterId,
            }
        });

        return new NextResponse(JSON.stringify(quiz), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log("COURSE_ID_QUIZES", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

