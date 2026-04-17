import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExternalResultsButtonProps {
  /** Destination URL — opens in a new tab. */
  href: string;
  /** Button label. Defaults to "View Live Results →". */
  label?: string;
  /** Additional className on the button. */
  className?: string;
}

/**
 * Blue primary button that links to an external live-results page.
 * Always opens in a new tab with safe rel attributes.
 */
export function ExternalResultsButton({
  href,
  label = "View Live Results \u2192",
  className,
}: ExternalResultsButtonProps) {
  return (
    <Button asChild size="lg" className={cn(className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  );
}
