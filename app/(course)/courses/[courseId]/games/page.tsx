"use client";
import { redirect, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";
import { startGameSchema } from '@/lib/game';

import LoadingGame from './_components/loading-game';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

type ErrorType = {
    title: string;
    description: string;
    variant: "default" | "destructive" | "success" | null | undefined; // Ensure alignment
};

type Input = z.infer<typeof startGameSchema>;

const GamesPage = ({
    params
}: {
    params: { courseId: string; }
}) => {
    const searchParams = useSearchParams();
    const quizId = searchParams.get('quizId');
    const router = useRouter();
    const [gameId, setGameId] = useState(null); // Stores the retrieved game ID
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState<ErrorType | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!params.courseId?.length || !quizId?.length) {
            redirect("/");
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.post("/api/game/startGame", { quizId });
                setGameId(response.data.gameId);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 500) {
                        setError({
                            title: "Error",
                            description: "Something went wrong. Please try again later.",
                            variant: "destructive",
                        });
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.courseId, quizId]);

    const handleStartTest = async () => {
        if (!quizId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/game/startGame", { quizId });
            setGameId(response.data.gameId);
            setTimeout(() => {
                router.push(`/courses/${params.courseId}/games/${gameId}`);
            }, 2000);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 500) {
                    setError({
                        title: "Error",
                        description: "Something went wrong. Please try again later.",
                        variant: "destructive",
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingGame finished={gameId !== null} />; // Indicate completion when gameId is set
    }

    if (error) {
        // Extract valid properties for toast
        const toastData = {
            title: error.title,
            description: error.description,
            variant: error.variant || "destructive", // Set a default variant if necessary
        };
        toast(toastData);
        return null;
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="w-full max-w-md p-4 shadow-md rounded-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                    <CardDescription>Example Quiz Details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>Topic: Science</p>
                        <p>Number of Questions: 5</p>
                        <p>Quiz Type: Multiple Choice</p>
                    </div>
                    <Button className="mt-5 w-full" disabled={isLoading} onClick={handleStartTest}>Start Test</Button>
                </CardContent>
            </Card>
        </div>

    );
};

export default GamesPage;
