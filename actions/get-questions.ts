import { db } from "@/lib/db";
import { Question } from "@prisma/client";

interface GetQuestionProps {
    userId: string;
    courseId: string;
    quizId: string;
};

export const getQuestions = async ({
    userId,
    courseId,
    quizId,
}: GetQuestionProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                }
            }
        });

        let questions: Question[] = [];

        if (purchase) {
            questions = await db.question.findMany({
                where: {
                    quizId: quizId
                }
            });
        }

        return {
            questions
        }
    }
    catch (error) {
        console.log("[GET_QUESTIONS]", error);
        return {
            questions: []
        }
    }
}