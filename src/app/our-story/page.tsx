import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PolaroidImage } from "@/components/polaroid-image";
import { FeatureCard } from "@/components/sections/feature-card";
import { TrusteeCard } from "@/components/sections/trustee-card";
import { Button } from "@/components/ui/button";

/**
 * Our Story page — rebuild per design refresh.
 *
 * Sections 1–4 landed in PR 8a (intro, beginning, founders, dedication).
 * Sections 5–8 (feature cards, Get In Touch, trustees, SITC events info)
 * are added in PR 8b below.
 */
export default function OurStoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <IntroSection />
        <BeginningSection />
        <FoundersSection />
        <DedicationSection />
        <FeatureCardsSection />
        <GetInTouchSection />
        <TrusteesSection />
        <EventsInfoSection />
      </main>
      <Footer />
    </div>
  );
}

/** Section 1 — light bg intro. */
function IntroSection() {
  return (
    <section className="bg-background px-4 py-16 md:py-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          About Sikhs In The City
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          The Club has been representing the UK at the Interfaith Relay
          marathon in Luxembourg since 2008.
        </p>
      </div>
    </section>
  );
}

/** Section 2 — blue bg, portrait image left, white text right. */
function BeginningSection() {
  return (
    <section className="bg-blue-600 px-4 py-16 text-white md:py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="order-2 md:order-1">
            <PolaroidImage
              src="/images/our-story/beginning.jpg"
              alt="Fauja Singh, founder of Sikhs In The City"
              width={520}
              height={640}
              rotate={-2}
              className="mx-auto block"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              The Beginning
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                The club was formed in 2000 and originally called &lsquo;Team
                Fauja&rsquo;, but following the BBC documentary &lsquo;Sikhs and
                the City&rsquo; on 13 August 2004 about who Sikhs are in which
                Fauja Singh featured, he agreed to change the name of the club
                to Sikhs In The City. The original &lsquo;elders&rsquo; of the
                club were five individuals aged between 79 and 88 in the Golden
                Oldies team which ran the Edinburgh Marathon relay in 2009.
              </p>
              <p>
                The SITC running club is now a well-established team based in
                East London, running marathons across the world with interfaith
                groups and raising money for charities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 3 — white bg, text left, single polaroid right. */
function FoundersSection() {
  return (
    <section className="bg-background px-4 py-16 md:py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              The Founders
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
              In the picture are (from left to right) Ajit Singh from
              Huddersfield, Gorbakhsh Singh from Gravesend, Fauja Singh from
              Ilford (East London), Amrik Singh from Glasgow and Karnail Singh
              also from Ilford, Amrik Singh. Sadly, they have all passed away
              with Fauja Singh BEM doing so on 14 July 2025 that made
              international news. Another member of the Golden Oldies, Ajit
              Singh Kalirai MBE from Beaconsfield was the first to pass away on
              19 May 2008. He was also a winner of several British Masters
              titles at other events.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <PolaroidImage
              src="/images/our-story/founders.jpg"
              alt="The founding members of Sikhs In The City"
              width={520}
              height={380}
              rotate={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 4 — yellow bg, text left, polaroid cluster right. */
function DedicationSection() {
  return (
    <section className="bg-secondary px-4 py-16 text-secondary-foreground md:py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Dedication
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
              <p>
                Following the lead of the Golden Oldies group who were
                exceedingly enthusiastic about their training, Club members
                meet regularly throughout the week but particularly on Sunday
                morning whatever the weather to train for long distance runs.
              </p>
              <p>
                Other than the outstanding world class achievements of Fauja
                Singh and the Golden Oldies, among the club current lifetime
                members, there are several who have completed more than 100,
                200, 300 and 400 marathons including five, six and seven
                Marathon Majors.
              </p>
            </div>
          </div>
          <DedicationCluster />
        </div>
      </div>
    </section>
  );
}

/** Cluster of 4 polaroids arranged in a 2×2 grid with varied rotations. */
function DedicationCluster() {
  return (
    <div
      className="mx-auto grid max-w-xl grid-cols-2 gap-4 md:gap-6"
      aria-label="Photos of Sikhs In The City community members training and racing"
    >
      <PolaroidImage
        src="/images/our-story/dedication-1.jpg"
        alt="Club members training together on a Sunday morning"
        width={280}
        height={210}
        rotate={-4}
      />
      <PolaroidImage
        src="/images/our-story/dedication-2.jpg"
        alt="Club members at a marathon event"
        width={280}
        height={210}
        rotate={3}
      />
      <PolaroidImage
        src="/images/our-story/dedication-3.jpg"
        alt="Lifetime members celebrating a race finish"
        width={280}
        height={210}
        rotate={4}
      />
      <PolaroidImage
        src="/images/our-story/dedication-4.jpg"
        alt="Golden Oldies team in action"
        width={280}
        height={210}
        rotate={-3}
      />
    </div>
  );
}

/** Section 5 — two blue FeatureCards side-by-side. */
function FeatureCardsSection() {
  return (
    <section className="bg-background px-4 pt-4 pb-16 md:pt-6 md:pb-20">
      <div className="container mx-auto">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <FeatureCard
            title="Credibility and Community Impact"
            description="With over two decades of representing the UK at international interfaith marathons and supporting causes close to home, Sikhs In The City is a trusted community of runners championing service, dedication, and longevity."
            href="/clubhouse-appeal"
          />
          <FeatureCard
            title="Events For Everyone"
            description="From the flagship Dawn To Dusk Ultra to the Fauja Singh Birthday Challenge, our events welcome runners of every pace and background. Come and be part of something bigger than a race."
            href="/events"
          />
        </div>
      </div>
    </section>
  );
}

/** Section 6 — yellow band with centered heading and blue Contact Us CTA. */
function GetInTouchSection() {
  return (
    <section className="bg-secondary px-4 py-14 text-secondary-foreground md:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Get In Touch
        </h2>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}

/** Trustee data — 9 cells arranged alphabetically across a 3×3 grid. */
const trustees: {
  name: string;
  role?: string;
  photo?: string;
  variant?: "default" | "vacancy";
}[] = [
  {
    name: "Ghanaya Singh Talewar",
    role: "Secretary",
    photo: "/images/trustees/ghanaya-singh-talewar.jpg",
  },
  {
    name: "Harmander Singh",
    role: "President",
    photo: "/images/trustees/harmander-singh.jpg",
  },
  {
    name: "Misbah Choudhury",
    photo: "/images/trustees/misbah-choudhury.jpg",
  },
  {
    name: "Nadhira Uddin",
    photo: "/images/trustees/nadhira-uddin.jpg",
  },
  {
    name: "To Be Confirmed",
    photo: "/images/trustees/placeholder.jpg",
  },
  {
    name: "Rajinder Shinhmar",
    photo: "/images/trustees/rajinder-shinhmar.jpg",
  },
  {
    name: "Sandy Jobanputra",
    role: "Treasurer",
    photo: "/images/trustees/sandy-jobanputra.jpg",
  },
  {
    name: "Surinder Kaur Atwal",
    photo: "/images/trustees/surinder-kaur-atwal.jpg",
  },
  {
    name: "Vacancy",
    variant: "vacancy",
  },
];

/** Section 7 — Our Trustees heading and 3×3 grid of TrusteeCards. */
function TrusteesSection() {
  return (
    <section className="bg-background px-4 py-16 md:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Our Trustees
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The volunteers who steward the club and keep the community running.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-8">
          {trustees.map((trustee, index) => (
            <TrusteeCard
              key={`${trustee.name}-${index}`}
              name={trustee.name}
              role={trustee.role}
              photo={trustee.photo}
              variant={trustee.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Section 8 — 2-col SITC events info block with polaroid cluster right. */
function EventsInfoSection() {
  return (
    <section className="bg-background px-4 pb-16 md:pb-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              SITC Events To Suit All Abilities &amp; Interests
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground md:text-lg">
              Every year we host two flagship community races alongside our
              weekly training meet-ups. Whether you&apos;re chasing a personal
              best, your first 10K, or simply a Sunday morning community, our
              events are designed to welcome runners of every ability.
            </p>
            <dl className="mt-6 space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <div>
                <dt className="font-semibold">Distances</dt>
                <dd className="text-muted-foreground">
                  Options ranging from 5K and 10K up to full ultra distances of
                  50K and beyond, on looped courses that let runners pick the
                  commitment that suits them.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Course Format</dt>
                <dd className="text-muted-foreground">
                  A flat, multi-lap circuit around Redbridge with on-course
                  water, nutrition, and lap counting. Friendly marshals at every
                  turn.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Timing</dt>
                <dd className="text-muted-foreground">
                  Chip-timed results delivered the same day. Live leaderboards
                  available throughout the event via our Results pages.
                </dd>
              </div>
            </dl>
          </div>
          <EventsInfoCluster />
        </div>
      </div>
    </section>
  );
}

/** Polaroid cluster of past SITC events — paired with EventsInfoSection. */
function EventsInfoCluster() {
  return (
    <div
      className="mx-auto grid max-w-xl grid-cols-2 gap-4 md:gap-6"
      aria-label="Photos from past Sikhs In The City events"
    >
      <PolaroidImage
        src="/images/our-story/events-1.jpg"
        alt="Runners setting off at the start line of a SITC event"
        width={280}
        height={210}
        rotate={-3}
      />
      <PolaroidImage
        src="/images/our-story/events-2.jpg"
        alt="Volunteers cheering runners on the course"
        width={280}
        height={210}
        rotate={4}
      />
      <PolaroidImage
        src="/images/our-story/events-3.jpg"
        alt="A finisher receiving their medal"
        width={280}
        height={210}
        rotate={3}
      />
      <PolaroidImage
        src="/images/our-story/events-4.jpg"
        alt="Group photo of runners after a SITC race"
        width={280}
        height={210}
        rotate={-4}
      />
    </div>
  );
}
