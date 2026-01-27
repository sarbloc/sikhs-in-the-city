import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/our-story", label: "Our Story" },
  { href: "/how-to-join", label: "How to Join" },
  { href: "/courses", label: "Training & Support" },
  { href: "/events", label: "Events" },
  { href: "/clubhouse-appeal", label: "Clubhouse Appeal" },
  { href: "/contact", label: "Register Interest" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
];

interface FooterProps {
  /** Additional className for the footer */
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-muted/50 border-t border-border", className)}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Address
            </h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Beal High School</p>
              <p>Woodford Bridge Road</p>
              <p>Ilford</p>
              <p>IG4 5LP</p>
              <p className="mt-3">Sundays at 7am</p>
            </address>
          </div>

          {/* Supported By */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Supported By
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Placeholder for sponsor logos */}
              <div className="h-12 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Sponsor
              </div>
              <div className="h-12 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Sponsor
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Sikhs In The City (Registered Charity
            Number 1179621) All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
