import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getGame } from "@/actions/get-game";
import { getQuestions } from "@/actions/get-questions";
import MCQ from "./_components/MCQ";

const gameIdPage = async ({
    params
}: {
    params: { courseId: string; gameId: string }
}) => {

    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const { game } = await getGame({ userId, gameId: params.gameId });

    if (!game) {
        return redirect("/");
    }

    const {
        questions,
    } = await getQuestions({
        userId,
        courseId: params.courseId,
        quizId: game?.quizId || "",
    })

    if (!questions) {
        return redirect("/");
    }

    return (
        <>
            <MCQ game={game} questions={questions} />
        </>
    )
};

export default gameIdPage;