import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface CourseGradeButtonProps {
  examCount: number;
}

export const CourseGradeButton = () => {
  return (
    <Button
      type="button"
      variant="success"
      className="w-full mt-5 relative"
    >
      <GraduationCap className="mr-2" />
      Grades
    </Button>
  );
};
