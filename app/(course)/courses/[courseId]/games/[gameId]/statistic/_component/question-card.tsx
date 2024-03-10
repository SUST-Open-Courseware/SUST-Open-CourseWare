"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@prisma/client";
import { GameResult } from "@prisma/client";

type Props = {
  results: GameResult[];
  questions: Question[];
};

const QuestionsList = ({ results, questions }: Props) => {
  const combinedResults = results.map((gameResult) => {
    const matchingQuestion = questions.find(
      (question) => question.id === gameResult.questionId
    );

    if (matchingQuestion) {
      return {
        answer: matchingQuestion.answer,
        question: matchingQuestion.text,
        userAnswer: gameResult.userAnswer,
        isCorrect: gameResult.isCorrect,
      };
    }

    console.warn(
      `Game result with ID ${gameResult.id} does not have a matching question`
    );
    return null; // Or return a default object if needed
  });

  const filteredResults = combinedResults.filter(Boolean); // Remove null/undefined

  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {filteredResults.map((combinedResult, index) => (combinedResult &&
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {combinedResult.question} <br />
                <br />
                <span className="font-semibold">{combinedResult.answer}</span>
              </TableCell>
              <TableCell
                className={`${combinedResult.isCorrect ? "text-green-600" : "text-red-600"
                  } font-semibold`}
              >
                {combinedResult.userAnswer}
              </TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
