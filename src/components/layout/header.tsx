"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/our-story", label: "Our Story" },
  { href: "/how-to-join", label: "How To Join" },
  { href: "/events", label: "Events" },
  { href: "/clubhouse-appeal", label: "ClubHouse Appeal" },
];

const resultsItems: NavItem[] = [
  { href: "/results/dawn-to-dusk", label: "Dawn To Dusk" },
  { href: "/results/summer-samosa", label: "Summer Samosa" },
  {
    href: "/results/fauja-singh-birthday-challenge",
    label: "Fauja Singh Birthday Challenge",
  },
];

const contactItem: NavItem = { href: "/contact", label: "Contact Us" };

const storeLink = {
  href: "https://sikhs-in-the-city.sumupstore.com",
  label: "Store",
};

interface HeaderProps {
  /** Additional className for the header */
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResultsOpen, setMobileResultsOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileResultsOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-secondary",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/sitc-logo.svg"
            alt="Sikhs In The City"
            width={130}
            height={55}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent focus:bg-transparent"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
              >
                Results
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-secondary text-secondary-foreground">
                <ul className="flex w-64 flex-col gap-1 p-2">
                  {resultsItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        asChild
                        className="text-secondary-foreground hover:bg-secondary-foreground/10 focus:bg-secondary-foreground/10 rounded-sm px-3 py-2 text-sm font-medium"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-transparent focus:bg-transparent"
                )}
              >
                <Link href={contactItem.href}>{contactItem.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="ml-4">
              <Button size="sm" asChild>
                <a
                  href={storeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {storeLink.label}
                </a>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-75 sm:w-100 p-2">
            <SheetTitle className="text-left">Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu
            </SheetDescription>
            <nav className="mt-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  aria-expanded={mobileResultsOpen}
                  aria-controls="mobile-results-submenu"
                  onClick={() => setMobileResultsOpen((open) => !open)}
                  className="flex items-center justify-between text-left text-lg font-medium transition-colors hover:text-primary"
                >
                  <span>Results</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform",
                      mobileResultsOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileResultsOpen && (
                  <ul
                    id="mobile-results-submenu"
                    className="flex flex-col gap-3 pl-4"
                  >
                    {resultsItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block text-base font-medium transition-colors hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link
                href={contactItem.href}
                onClick={closeMobileMenu}
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                {contactItem.label}
              </Link>
              <Button asChild>
                <a
                  href={storeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  {storeLink.label}
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
