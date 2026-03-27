"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/our-story", label: "Our Story", external: false },
  { href: "/how-to-join", label: "How To Join", external: false },
  { href: "/events", label: "Events", external: false },
  { href: "/clubhouse-appeal", label: "ClubHouse Appeal", external: false },
  { href: "/contact", label: "Contact Us", external: false },
];

const storeLink = { href: "https://sikhs-in-the-city.sumupstore.com", label: "Store" };

interface HeaderProps {
  /** Additional className for the header */
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent focus:bg-transparent")}>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="ml-4">
              <Button size="sm" asChild>
                <a href={storeLink.href} target="_blank" rel="noopener noreferrer">{storeLink.label}</a>
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild>
                <a
                  href={storeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
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
