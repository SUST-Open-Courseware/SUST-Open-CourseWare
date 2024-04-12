import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Question } from "@prisma/client";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string, quizId: string } }
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

        const { quizId } = params;
        const { questions } = await req.json();

        questions.forEach(async (q: Question) => {
            await db.question.create({
                data: {
                    text: q.text,
                    options: q.options,
                    answer: q.answer,
                    quizId: quizId
                }
            });
        });


        return new NextResponse("", { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log("QUESTION", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

