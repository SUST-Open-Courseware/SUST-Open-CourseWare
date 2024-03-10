import { z } from "zod";

export const checkAnswerSchema = z.object({
    userInput: z.string(),
    questionId: z.string(),
});

export const endGameSchema = z.object({
    gameId: z.string(),
    score: z.number()
});

export const startGameSchema = z.object({
    quizId: z.string()
});
