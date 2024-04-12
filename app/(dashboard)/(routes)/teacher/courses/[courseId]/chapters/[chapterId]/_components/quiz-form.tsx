"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Chapter, Quiz } from "@prisma/client";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

interface QuizFormProps {
    initialData: Chapter & { quizes: Quiz[] };
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    title: z.string(),
    questions: z.string()
});

export const QuizForm = ({
    initialData,
    courseId,
    chapterId,
}: QuizFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const { isSubmitting, isValid } = form.formState;

    interface Question {
        text: string;
        options: string[];
        answer: string;
    }

    function parseQuestions(text: string): Question[] {
        // Split the text into individual lines
        const lines: string[] = text.split('\n');
        const questions: Question[] = [];

        let currentQuestion: Question | null = null;

        // Iterate through each line
        lines.forEach((line: string) => {
            // Remove leading and trailing whitespace
            line = line.trim();

            // Check if the line starts with '#' indicating a new question
            if (line.startsWith('#')) {
                // If there was a previous question, push it to the questions array
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                // Create a new question object
                currentQuestion = {
                    text: line.substring(1).trim(),
                    options: [],
                    answer: ''
                };
            } else if (line.startsWith('>')) {
                // If the line starts with '>' it is an option, add it to the current question's options
                if (currentQuestion) {
                    currentQuestion.options.push(line.substring(1).trim());
                }
            } else if (line.startsWith('-')) {
                if (currentQuestion) {
                    currentQuestion.answer = line.substring(1).trim();
                }
            }
        });

        // Push the last question to the questions array
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        return questions;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quizes`, {
                title: values.title
            });

            const quizId = response.data.id;

            const questions = parseQuestions(values.questions);
            await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quizes/${quizId}/questions`, { questions: questions })

            toast.success("Quiz added successfully");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/quizes/${id}`);
            toast.success("Attachment deleted");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Quizes
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Quiz
                        </>
                    )}
                </Button>
            </div>
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Quiz 1'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="questions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="write questions here..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Add Quiz
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            {initialData.quizes.length > 0 && (
                <div className="space-y-2">
                    {initialData.quizes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                        >
                            <QuestionMarkIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <p className="text-xs line-clamp-1">
                                {quiz.title}
                            </p>
                            {deletingId === quiz.id && (
                                <div>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {deletingId !== quiz.id && (
                                <button
                                    onClick={() => onDelete(quiz.id)}
                                    className="ml-auto hover:opacity-75 transition"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};