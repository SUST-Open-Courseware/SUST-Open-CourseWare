import { db } from "@/lib/db";
import { getQuestions } from "./get-questions";

interface GetGradesProps {
    userId: string;
    courseId: string;
}

type Grade = {
    quizName: string;
    submitted: string;
    score: number;
    totalScore: number;
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
        let totalScore: number = 0;

        if (purchase) {
            const course = await db.course.findUnique({
                where: { id: courseId },
                include: { quizes: true },
            });

            if (course?.quizes) {
                for (const quiz of course.quizes) {

                    const {questions} = await getQuestions({userId, courseId, quizId: quiz.id});
                    let quizTotalScore:number = questions.length;
                    
                    totalScore += quizTotalScore;

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
                        totalScore: quizTotalScore,
                    });
                }
            }
        }

        return {
            grades, totalScore
        };
    } catch (error) {
        console.log("[GET_GRADES]", error);
        return {
            grades: [],
        };
    }
};
