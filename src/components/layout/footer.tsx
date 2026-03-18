import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/our-story", label: "Our Story" },
  { href: "/how-to-join", label: "How to Join" },
  { href: "/training", label: "Training & Support" },
  { href: "/events", label: "Events" },
  { href: "/clubhouse-appeal", label: "Clubhouse Appeal" },
  { href: "/contact", label: "Register Interest" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
];

interface FooterProps {
  /** Additional className for the footer */
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-blue-950 text-white", className)}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              Address
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={`address-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported By + Connect With Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold">
              Supported By
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/images/sponsors/new-balance.png"
                alt="New Balance"
                width={86}
                height={47}
                className="rounded bg-white p-2"
              />
              <Image
                src="/images/sponsors/sporting-equals.png"
                alt="Sporting Equals"
                width={160}
                height={35}
                className="rounded bg-white p-2"
              />
            </div>

            <h3 className="mb-4 mt-8 text-sm font-bold">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-blue-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-blue-800" />

        {/* Copyright */}
        <div className="text-center text-sm text-white">
          <p>
            © Copyright Sikhs In The City (Registered Charity
            Number 1179621) All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
