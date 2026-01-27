import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventCardProps {
  /** Event title */
  title: string;
  /** Event description */
  description: string;
  /** Event date string */
  date: string;
  /** Category badge text */
  category?: string;
  /** Image path */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Link to event details */
  href?: string;
  /** Link text */
  linkText?: string;
  /** Additional className */
  className?: string;
}

export function EventCard({
  title,
  description,
  date,
  category,
  imagePath,
  imageAlt = "",
  href = "#",
  linkText = "Find out more",
  className,
}: EventCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {imagePath && (
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {category && <Badge variant="secondary">{category}</Badge>}
          <time className="text-sm text-muted-foreground">{date}</time>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
        <Link
          href={href}
          className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {linkText} →
        </Link>
      </CardContent>
    </Card>
  );
}
