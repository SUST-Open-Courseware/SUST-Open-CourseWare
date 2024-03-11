import { Button } from "@/components/ui/button";

interface CourseGradeButtonProps {
  examCount: number;
}

export const CourseGradeButton = ({ examCount }: CourseGradeButtonProps) => {
  return (
    <Button
      type="button"
      variant="popup"
      className="w-full mt-5 relative"
    >
      Grades
      {/* <span
        className="absolute top-[-8px] right-[-8px] p-2 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center"
        style={{ width: "25px", height: "25px" }}
      >
        {examCount}
      </span> */}
    </Button>
  );
};
