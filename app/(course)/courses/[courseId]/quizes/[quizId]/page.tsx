import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getQuestions } from "@/actions/get-questions";

const QuizIdPage = async ({
    params
}: {
    params: { courseId: string; quizId: string }
}) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }
    const {
        questions,
    } = await getQuestions({
        userId,
        courseId: params.courseId,
        quizId: params.quizId
    })

    if (!questions) {
        return redirect("/");
    }

    return (
        <>
            {questions && questions.map((question) => (
                <div key={question.id}> {question.text} </div>
            ))}
        </>
    )
};

export default QuizIdPage;