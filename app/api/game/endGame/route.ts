import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { endGameSchema } from "@/lib/game";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gameId, score } = endGameSchema.parse(body);

    const game = await db.game.findUnique({
      where: {
        userId: userId,
        id: gameId,
      },
    });
    if (!game) {
      return NextResponse.json(
        {
          message: "Game not found",
        },
        {
          status: 404,
        }
      );
    }
    await db.game.update({
      where: {
        userId: userId,
        id: gameId,
      },
      data: {
        score: score,
        timeEnded: new Date(),
      },
    });
    return NextResponse.json({
      message: "Game ended",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
