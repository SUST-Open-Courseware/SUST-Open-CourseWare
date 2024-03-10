"use client";
import { Game, Question } from "@prisma/client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { checkAnswerSchema, endGameSchema } from "@/lib/game";
import { cn, formatTimeDelta } from "@/lib/utils";
import MCQCounter from "./MCQCounter";
import axios from "axios";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  game: Game
  questions: Question[];
};

const MCQ = ({game, questions }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());
  const [isChecking, setIsChecking] = React.useState(false);

  const currentQuestion = React.useMemo(() => {
    return questions[questionIndex];
  }, [questionIndex, questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return currentQuestion.options;
  }, [currentQuestion]);

  const { toast } = useToast();

  const checkAnswer = React.useCallback(
    async (callback: Function) => {
      setIsChecking(true);
      try {
        const payload: z.infer<typeof checkAnswerSchema> = {
          questionId: currentQuestion.id,
          gameId: game.id,
          userInput: options[selectedChoice],
        };
        const response = await axios.post(`/api/game/checkAnswer`, payload);
        const { isCorrect } = response.data;

        setStats((prevStats) => {
          if (isCorrect) {
            return {
              ...prevStats,
              correct_answers: prevStats.correct_answers + 1,
            };
          } else {
            return {
              ...prevStats,
              wrong_answers: prevStats.wrong_answers + 1,
            };
          }
        });

        toast({
          title: isCorrect ? "Correct" : "Incorrect",
          description: isCorrect ? "You got it right!" : "You got it wrong!",
          variant: isCorrect ? "success" : "destructive",
        });

        if (questionIndex === questions.length - 1) {
          setHasEnded(true);
          callback();
        } else {
          setQuestionIndex((prevIndex) => prevIndex + 1);
          callback();
        }
      } catch (error) {
        console.error("Error checking answer:", error);
      } finally {
        setIsChecking(false);
      }
    },
    [currentQuestion.id, options, selectedChoice, questionIndex, questions.length, toast]
  );

  const endGame = React.useCallback(
    async () => {
      try {
        const payload: z.infer<typeof endGameSchema> = {
          gameId: game.id,
        };
        await axios.post(`/api/game/endGame`, payload);
      } catch (error) {
        console.error("Error ending game:", error);
      }
    },
    [game.id]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(() => {
      endGame();
    });
  }, [checkAnswer, endGame]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "1") {
        setSelectedChoice(0);
      } else if (key === "2") {
        setSelectedChoice(1);
      } else if (key === "3") {
        setSelectedChoice(2);
      } else if (key === "4") {
        setSelectedChoice(3);
      } else if (key === "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You Completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`${game.id}/statistic`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">

          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        <MCQCounter
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.text}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? "default" : "outline"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isChecking || hasEnded}
          onClick={() => {
            handleNext();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
