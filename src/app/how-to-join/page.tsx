import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HowToJoinHero } from "@/components/sections/how-to-join-hero";
import { HowToJoinSection } from "@/components/sections/how-to-join-section";

const steps = [
  {
    title: "Register your interest",
    description: (
      <>
        Complete our{" "}
        <Link href="/contact" className="font-semibold underline underline-offset-2">
          contact form
        </Link>{" "}
        and tell us a little about yourself and your goals.
      </>
    ),
  },
  {
    title: "Come and meet us",
    description:
      "Join us on a Sunday at 7am at Beal High School and get to know the community.",
  },
  {
    title: "Start your journey",
    description:
      "Bring your training gear and water. We'll understand your goals and help you follow a plan that suits you.",
  },
];

export default function HowToJoinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HowToJoinHero />
        <HowToJoinSection steps={steps} />
      </main>
      <Footer />
    </div>
  );
}
