import Image from "next/image";
import Link from "next/link";

interface ImageCardProps {
  imagePath: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function ImageCard({
  imagePath,
  title,
  description,
  buttonText,
  buttonHref,
}: ImageCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-900">
      <div className="relative aspect-video w-full">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
