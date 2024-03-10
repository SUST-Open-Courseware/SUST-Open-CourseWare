import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { checkAnswerSchema } from "@/lib/game";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { questionId, gameId, userInput } = checkAnswerSchema.parse(body);
    const question = await db.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return NextResponse.json(
        {
          message: "Question not found",
        },
        {
          status: 404,
        }
      );
    }

    const isCorrect =
      question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();

    await db.gameResult.create({
      data: {
        questionId: questionId,
        userAnswer: userInput.toLowerCase(),
        isCorrect: isCorrect,
        gameId: gameId
      }
    })

    return NextResponse.json({
      isCorrect,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
}
