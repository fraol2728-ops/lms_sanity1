import { CourseCard } from "@/components/courses";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";

interface FeaturedCoursesSectionProps {
  courses: FEATURED_COURSES_QUERYResult;
}

export function FeaturedCoursesSection({
  courses,
}: FeaturedCoursesSectionProps) {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Popular Courses
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Train with high-impact cybersecurity modules
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses?.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            description={course.description}
            tier={course.tier}
            thumbnail={course.thumbnail}
            moduleCount={course.moduleCount}
            lessonCount={course.lessonCount}
            href={
              course.slug?.current ? `/courses/${course.slug.current}` : "#"
            }
          />
        ))}
      </div>
    </section>
  );
}
