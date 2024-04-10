import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import ImageSlideshow from "./_components/ImageSlideshow";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch data on server-side
  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  // Image data (replace with your actual image paths)
  const imageData = [
    { src: "/sust-iict-1.jpg", alt: "Image 1" },
    { src: "/sust-iict-2.jpg", alt: "Image 2" },
    { src: "/sust-iict-3.jpg", alt: "Image 3" },
  ];

  return (
    <div className="space-y-6">
      <div className="px-10">
        <ImageSlideshow images={imageData} /> {/* Client component with image data */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
