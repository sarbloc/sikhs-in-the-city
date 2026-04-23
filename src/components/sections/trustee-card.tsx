import Image from "next/image";
import { cn } from "@/lib/utils";

interface TrusteeCardProps {
  /** Trustee's full name */
  name: string;
  /** Optional role label displayed under the name (e.g. "PRESIDENT") */
  role?: string;
  /** Portrait photo path */
  photo: string;
  /** Additional className applied to the outer card */
  className?: string;
}

export function TrusteeCard({ name, role, photo, className }: TrusteeCardProps) {
  return (
    <article className={cn("flex flex-col", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-lg font-bold tracking-tight text-foreground">
          {name}
        </p>
        {role && (
          <p className="text-xs font-semibold tracking-[0.15em] text-yellow-600 uppercase">
            {role}
          </p>
        )}
      </div>
    </article>
  );
}
