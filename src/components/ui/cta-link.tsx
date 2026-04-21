import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ctaLinkVariants = cva(
  "inline-flex items-center gap-2 text-base font-bold transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        foreground: "text-foreground hover:text-foreground/80",
        inverse: "text-white hover:text-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CtaLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "children">,
    VariantProps<typeof ctaLinkVariants> {
  /** Visible link label. The trailing arrow is appended automatically. */
  children: React.ReactNode;
}

/**
 * Secondary CTA — text link with trailing arrow, sized to match Button text.
 * Variants select colour for different backgrounds.
 */
export function CtaLink({
  className,
  variant,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <Link className={cn(ctaLinkVariants({ variant, className }))} {...props}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export { ctaLinkVariants };
