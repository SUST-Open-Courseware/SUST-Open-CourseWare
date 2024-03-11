import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { FileText, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import { getGrades } from "@/actions/get-grades";

interface GradeParam {
    courseId: string;
}

const GradePage = async ({
    params
}: {
    params: { courseId: string; chapterId: string }
}) => {


    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { grades, totalScore } = await getGrades({
        userId: userId,
        courseId: params.courseId
    });

    if (!grades) {
        return redirect("/");
    }

    let score: number = grades.reduce((accScore, grade) => {
        accScore += grade.score;
        return accScore;
    }, 0);

    let accuracy: number = 0;

    if (totalScore) {
        accuracy = (score / totalScore) * 100;
    }

    return (
        <div className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/dashboard" className={buttonVariants()}>
                        <ShieldCheck className="mr-2" />
                        Apply for Certificate
                    </Link>
                    <Link href="/dashboard" className={buttonVariants()}>
                        <FileText className="mr-2" />
                        Download PDF
                    </Link>
                </div>
            </div>

            <Table className="mt-4">
                <TableHeader className="text-l font-bold">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grades && (<>{grades.map((grade, index) => (
                        <TableRow key={index}>
                            <TableCell>{grade.quizName}</TableCell>
                            <TableCell>{grade.submitted}</TableCell>
                            <TableCell>{grade.score}/{grade.totalScore}</TableCell>
                        </TableRow>
                    ))}</>)}
                </TableBody>
                <TableFooter className="bg-muted/80 text-primary font-bold">
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell> {accuracy}%</TableCell>
                        <TableCell>{score}/{totalScore}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
};

export default GradePage;