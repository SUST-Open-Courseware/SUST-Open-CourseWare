import { FileText } from "lucide-react";
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
} from "@/components/ui/table";

const GradePage = async () => {
    return (
        <div className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/dashboard" className={buttonVariants()}>
                        <FileText className="mr-2" />
                        Download PDF
                    </Link>
                </div>
            </div>

                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody></TableBody>
                </Table>
        </div>
    )
};

export default GradePage;