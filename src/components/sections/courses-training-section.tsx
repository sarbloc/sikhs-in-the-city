import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface Course {
  title: string;
  description: string;
  level?: string;
  schedule?: string;
  href?: string;
}

interface CoursesTrainingSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Courses array */
  courses?: Course[];
  /** CTA text */
  ctaText?: string;
  /** CTA href */
  ctaHref?: string;
  /** Additional className */
  className?: string;
}

const defaultCourses: Course[] = [
  {
    title: "Couch to 5K",
    description:
      "Perfect for beginners. A structured 9-week programme taking you from zero to running 5K continuously.",
    level: "Beginner",
    schedule: "Sundays 7am",
    href: "/training/couch-to-5k",
  },
  {
    title: "5K to 10K",
    description:
      "Build on your 5K foundation and work towards completing your first 10K race with confidence.",
    level: "Intermediate",
    schedule: "Sundays 7am",
    href: "/training/5k-to-10k",
  },
  {
    title: "Half Marathon Training",
    description:
      "A comprehensive training plan for runners looking to complete their first half marathon.",
    level: "Intermediate",
    schedule: "Sundays 7am",
    href: "/training/half-marathon",
  },
  {
    title: "Marathon Preparation",
    description:
      "Advanced training for experienced runners preparing for the ultimate distance challenge.",
    level: "Advanced",
    schedule: "Sundays 7am",
    href: "/training/marathon",
  },
];

export function CoursesTrainingSection({
  title = "Courses & Training",
  description = "Whether you're just starting out or training for your next marathon, we have a programme to suit you. All sessions are led by experienced coaches and are completely free.",
  courses = defaultCourses,
  ctaText = "View all programmes",
  ctaHref = "/training",
  className,
}: CoursesTrainingSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {course.level && (
                    <Badge variant="outline" className="shrink-0">
                      {course.level}
                    </Badge>
                  )}
                </div>
                {course.schedule && (
                  <p className="text-sm text-muted-foreground">
                    {course.schedule}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {course.description}
                </CardDescription>
                {course.href && (
                  <Link
                    href={course.href}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Learn more →
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
