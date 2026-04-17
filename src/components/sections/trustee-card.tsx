import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrusteeCardProps {
  /** Trustee's full name */
  name: string;
  /** Optional role label displayed under the name (e.g. "PRESIDENT") */
  role?: string;
  /** Photo path; falls back to a silhouette when not supplied */
  photo?: string;
  /**
   * Visual variant. Use "vacancy" for the open-role silhouette card that
   * invites applications.
   */
  variant?: "default" | "vacancy";
  /** Additional className applied to the outer card */
  className?: string;
}

/**
 * TrusteeCard — photo-first card used in the Our Story trustees grid.
 *
 * The `vacancy` variant renders a silhouette placeholder with a
 * "Contact Us To Apply" call to action instead of a name/role.
 */
export function TrusteeCard({
  name,
  role,
  photo,
  variant = "default",
  className,
}: TrusteeCardProps) {
  const isVacancy = variant === "vacancy";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl bg-white text-center shadow-sm",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full bg-muted">
        {isVacancy || !photo ? (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"
          >
            <UserRound className="h-20 w-20" strokeWidth={1.25} />
          </div>
        ) : (
          <Image
            src={photo}
            alt={`Portrait of ${name}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-1 px-4 py-4">
        {isVacancy ? (
          <>
            <p className="text-base font-semibold tracking-tight text-foreground">
              {name}
            </p>
            <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Contact Us To Apply
            </p>
          </>
        ) : (
          <>
            <p className="text-base font-semibold tracking-tight text-foreground">
              {name}
            </p>
            {role && (
              <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                {role}
              </p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
