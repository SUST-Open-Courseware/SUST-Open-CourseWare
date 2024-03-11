import { db } from "@/lib/db";
import { getGame } from "./get-game";

interface GetGradesProps {
    userId: string;
    courseId: string;
}

type Grade = {
    quizName: string;
    submitted: string;
    score: number;
};

export const getGrades = async ({
    userId,
    courseId,
}: GetGradesProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        let grades: Grade[] = [];

        if (purchase) {
            const course = await db.course.findUnique({
                where: { id: courseId },
                include: { quizes: true },
            });

            if (course?.quizes) {
                for (const quiz of course.quizes) {
                    const games = await db.game.findMany({
                        where: {
                            userId,
                            quizId: quiz.id,
                        },
                    });

                    let bestGame = null;
                    let bestScore = 0;

                    if (games.length > 0) {
                        for (const game of games) {
                            const currentResult = await db.gameResult.findMany({
                                where: { gameId: game.id },
                            });

                            const currentScore = currentResult.reduce(
                                (acc, result) => acc + (result.isCorrect ? 1 : 0),
                                0
                            );

                            if (currentScore > bestScore) {
                                bestGame = game;
                                bestScore = currentScore;
                            }
                        }
                    }

                    grades.push({
                        quizName: quiz.title,
                        submitted: bestGame?.timeEnded?.toDateString() || "-",
                        score: bestScore,
                    });
                }
            }
        }

        return {
            grades,
        };
    } catch (error) {
        console.log("[GET_GRADES]", error);
        return {
            grades: [],
        };
    }
};
