import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { startGameSchema } from "@/lib/game";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { quizId } = startGameSchema.parse(body);
        const game = await db.game.create({
            data: {
                timeStarted: new Date(),
                userId: userId,
                quizId: quizId
            },
        });

        return NextResponse.json({ gameId: game.id }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues },
                {
                    status: 400,
                }
            );
        } else {
            return NextResponse.json(
                { error: "An unexpected error occurred." },
                {
                    status: 500,
                }
            );
        }
    }
}
export async function GET(req: Request, res: Response) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const url = new URL(req.url);
        const gameId = url.searchParams.get("gameId");
        if (!gameId) {
            return NextResponse.json(
                { error: "You must provide a game id." },
                {
                    status: 400,
                }
            );
        }

        const game = await db.game.findUnique({
            where: {
                id: gameId,
            }
        });
        if (!game) {
            return NextResponse.json(
                { error: "Game not found." },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            { game },
            {
                status: 400,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            {
                status: 500,
            }
        );
    }
}
