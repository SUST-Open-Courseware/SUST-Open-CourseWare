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
                    const gameResults = await db.gameResult.findMany({
                        where: {
                            gameId: {
                                in: await db.game.findMany({
                                    where: {
                                        userId,
                                        quizId: quiz.id,
                                    },
                                }).then((games) => games.map((game) => game.id)),
                            },
                        },
                        orderBy: { isCorrect: "desc" }, // Order by isCorrect descending (highest first)
                        take: 1, // Limit to 1 result (best performing)
                    });

                    if (gameResults.length > 0) {
                        const bestResult = gameResults[0];
                        const { game } = await getGame({ userId: userId, gameId: bestResult.gameId });
                        grades.push({
                            quizName: quiz.title,
                            submitted: game?.timeEnded?.toDateString() || " ",
                            score: gameResults.reduce(
                                (acc, result) => acc + (result.isCorrect ? 1 : 0),
                                0
                            ),
                        });
                    }
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
