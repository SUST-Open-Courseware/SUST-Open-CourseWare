import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { getGame } from "@/actions/get-game";
import { getQuestions } from "@/actions/get-questions";
import { getGameResult } from "@/actions/get-game-result";

import { redirect } from "next/navigation";
import React from "react";
import AccuracyCard from "./_component/accuracy-card";
import QuestionsList from "./_component/question-card";
import TimeTakenCard from "./_component/time-taken";
import ResultsCard from "./_component/result-card";

type Props = {
    params: {
        gameId: string;
    };
};

const Statistics = async ({
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

    const { results } = await getGameResult({
        gameId: params.gameId
    })

    if (!results) {
        return redirect("/");
    }

    let accuracy: number = 0;
    let totalCorrect = results.reduce((acc, result) => {
        if (result.isCorrect) {
            return acc + 1;
        }
        return acc;
    }, 0)
    accuracy = (totalCorrect / results.length) * 100;

    return (
        <>
            <div className="p-8 mx-auto max-w-7xl">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
                    <div className="flex items-center space-x-2">
                        <Link href={`/courses/${params.courseId}`} className={buttonVariants()}>
                            <LucideLayoutDashboard className="mr-2" />
                            Back to Course
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 mt-4 md:grid-cols-7">
                    <ResultsCard accuracy={accuracy} />
                    <AccuracyCard accuracy={accuracy} />
                    <TimeTakenCard
                        timeEnded={new Date(game.timeEnded ?? 0)}
                        timeStarted={new Date(game.timeStarted ?? 0)}
                    />
                </div>
                <QuestionsList questions={questions} results={results} />
            </div>
        </>
    );
};

export default Statistics;
