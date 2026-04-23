import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PolaroidImage } from "@/components/polaroid-image";
import { FeatureCard } from "@/components/sections/feature-card";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { TrusteeCard } from "@/components/sections/trustee-card";
import { Button } from "@/components/ui/button";

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
        <JoinCtaSection />
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

/** Section 2 — blue bg, Fauja cut-out bottom-anchored with halftone bg pattern, white text right. */
function BeginningSection() {
  return (
    <section className="relative overflow-hidden bg-blue-600 px-4 pt-16 text-white md:pt-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
          <div className="relative order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-sm">
              <Image
                src="/images/our-story/the-beginning-bg.png"
                alt=""
                aria-hidden="true"
                width={575}
                height={534}
                className="pointer-events-none absolute left-1/2 top-0 w-[140%] max-w-none -translate-x-1/2 -translate-y-[8%] brightness-0 invert opacity-50"
              />
              <Image
                src="/images/our-story/beginning.png"
                alt="Fauja Singh, founder of Sikhs In The City"
                width={500}
                height={787}
                className="relative block h-auto w-full"
              />
            </div>
          </div>
          <div className="order-1 pb-16 md:order-2 md:pb-20 md:self-center">
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
              src="/images/our-story.png"
              alt="The founding members of Sikhs In The City"
              width={520}
              height={340}
              fit="cover"
              objectPosition="top"
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

/**
 * Scrapbook-style cluster of 4 polaroids in a 2x2 arrangement. Mobile (<md):
 * single-column stack centered. md+: fixed-dimension canvas where the four
 * boxes anchor at corners so only the ~16px white polaroid padding edges
 * overlap (photos themselves don't cover each other). Widths sum to
 * canvas_width + 16 per row; heights sum to canvas_height + 16 per column.
 */
function DedicationCluster() {
  return (
    <div
      role="group"
      aria-label="Photos of Sikhs In The City community members training and racing"
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 md:relative md:block md:h-[460px] md:max-w-xl"
    >
      <PolaroidImage
        src="/images/our-story/dedication-1.jpg"
        alt="Club members training together on a Sunday morning"
        width={240}
        height={240}
        fit="cover"
        rotate={-4}
        className="md:absolute md:left-0 md:top-0 md:z-10"
      />
      <PolaroidImage
        src="/images/our-story/dedication-2.jpg"
        alt="Club members at a marathon event"
        width={320}
        height={200}
        fit="cover"
        rotate={3}
        className="md:absolute md:right-0 md:top-0 md:z-20"
      />
      <PolaroidImage
        src="/images/our-story/dedication-3.png"
        alt="Lifetime members celebrating a race finish"
        width={240}
        height={200}
        fit="cover"
        rotate={5}
        className="md:absolute md:left-0 md:bottom-0 md:z-30"
      />
      <PolaroidImage
        src="/images/our-story/dedication-4.jpg"
        alt="Golden Oldies team in action"
        width={320}
        height={240}
        fit="cover"
        rotate={-3}
        className="md:absolute md:right-0 md:bottom-0 md:z-20"
      />
    </div>
  );
}

/** Section 5 — two blue FeatureCards side-by-side. */
function FeatureCardsSection() {
  return (
    <section className="bg-background px-4 py-16 md:py-20">
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

/** Section 6 — yellow band with centered heading, intro copy, and blue Contact Us CTA. */
function GetInTouchSection() {
  return (
    <section className="bg-secondary px-4 py-14 text-secondary-foreground md:py-16">
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Get In Touch
        </h2>
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          If you have any questions or would like to learn more about becoming
          a lifetime member of Sikhs In The City, we&rsquo;d love to hear from
          you.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}

/** Trustee data — eight current trustees in alphabetical order. */
const trustees: { name: string; role?: string; photo: string }[] = [
  {
    name: "Ghanaya Singh Talewar",
    role: "Secretary",
    photo: "/images/trustees/ghanaya-singh-talewar.png",
  },
  {
    name: "Harmander Singh",
    role: "President",
    photo: "/images/trustees/harmander-singh.png",
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
    name: "Rajinder Shinhmar",
    photo: "/images/trustees/rajinder-shinhmar.png",
  },
  {
    name: "Sandy Jobanputra",
    role: "Treasurer",
    photo: "/images/trustees/sandy-jobanputra.png",
  },
  {
    name: "Surinder Kaur Atwal",
    photo: "/images/trustees/surinder-kaur-atwal.png",
  },
  {
    name: "Vanessa Brewster",
    photo: "/images/trustees/vanessa-brewster.png",
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
            The current Trustees of the Club in alphabetical order are:
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-x-8">
          {trustees.map((trustee) => (
            <TrusteeCard
              key={trustee.name}
              name={trustee.name}
              role={trustee.role}
              photo={trustee.photo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Section 8 — SITC flagship events info block with polaroid right. */
function EventsInfoSection() {
  return (
    <section className="bg-background px-4 pb-16 md:pb-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              SITC Dawn To Dusk Ultra &amp; Summer Samosa Challenge events
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground md:text-lg">
              These iconic SITC events are run on a multi-lap course, offering
              distances from 10K through to Ultra Marathon (50km+).
            </p>
            <dl className="mt-6 space-y-4 text-base leading-relaxed text-foreground md:text-lg">
              <div>
                <dt className="font-semibold">Distances</dt>
                <dd className="text-muted-foreground">
                  10K, Half Marathon, Full Marathon, Ultra Marathon
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Course Format</dt>
                <dd className="text-muted-foreground">
                  Official 2.014km measured lap with feeding station each lap
                </dd>
              </div>
              <div>
                <dt className="font-semibold">When It Happens</dt>
                <dd className="text-muted-foreground">
                  First Sunday in December and last Sunday in June
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
              All finishers receive an event T-shirt, bespoke medal, and
              refreshments. All proceeds help support the Fauja Singh BEM
              Clubhouse Appeal.
            </p>
          </div>
          <div className="flex w-full justify-center md:justify-end">
            <PolaroidImage
              src="/images/our-story/events.jpg"
              alt="Fauja Singh with Sikhs In The City runners after a race"
              width={640}
              height={424}
              rotate={3}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
