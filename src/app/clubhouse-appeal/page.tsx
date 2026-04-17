import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PolaroidImage } from "@/components/polaroid-image";
import { VideoEmbed } from "@/components/sections/video-embed";
import { MapEmbed } from "@/components/sections/map-embed";

// TODO(asset): swap Fauja Singh portrait, polaroid photo, YouTube IDs, donate
// link, and confirm the clubhouse address before launch. Flagged in PR 9a.
const DONATE_HREF = "#donate";
const FAUJA_PORTRAIT_SRC = "/images/hero/slide-2.jpg";
const HONOURING_IMAGE_SRC = "/images/hero/slide-3.jpg";
const CLUBHOUSE_ADDRESS = "Beal High School, Woodford Bridge Road, Ilford IG4 5LP";
const CLUBHOUSE_MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  CLUBHOUSE_ADDRESS
)}&output=embed`;

const VIDEOS: { videoId: string; title: string; caption: string }[] = [
  {
    videoId: "dQw4w9WgXcQ",
    title: "Fauja Singh on the clubhouse vision",
    caption: "Fauja Singh on the clubhouse vision",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Harmander Singh on building a lasting legacy",
    caption: "Harmander Singh on building a lasting legacy",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "The SITC team on community impact",
    caption: "The SITC team on community impact",
  },
];

function DonateButton({ className }: { className?: string }) {
  return (
    <Button asChild size="lg" className={className}>
      <Link href={DONATE_HREF}>Donate Now</Link>
    </Button>
  );
}

export default function ClubhouseAppealPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Section 1 — Hero */}
        <section className="bg-blue-100 px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                  Fauja Singh Clubhouse Appeal
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                  Help us build a permanent home for our community — a place
                  that honours the legacy of Fauja Singh BEM and supports
                  health, wellbeing, and connection for generations to come.
                </p>
                <DonateButton className="mt-8" />
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-72 md:w-72">
                  <Image
                    src={FAUJA_PORTRAIT_SRC}
                    alt="Fauja Singh BEM"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 18rem, 14rem"
                  />
                </div>
              </div>
            </div>
            <p className="mt-10 text-xs text-foreground/70 md:text-sm">
              Registered Charity No 1179621 · Community project supported by
              the London Borough of Redbridge
            </p>
          </div>
        </section>

        {/* Section 2 — Honouring a Legacy */}
        <section className="bg-background px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Honouring a Legacy. Building for the Future.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                  Fauja Singh BEM inspired a generation of runners and showed
                  the world what&apos;s possible at any age. The clubhouse will
                  carry that spirit forward — a space where our community
                  gathers, trains, and grows together, rooted in the values
                  Fauja lived by.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                  Every donation helps us turn this vision into bricks, mortar,
                  and belonging.
                </p>
                <DonateButton className="mt-8" />
              </div>
              <div className="flex justify-center md:justify-end">
                <PolaroidImage
                  src={HONOURING_IMAGE_SRC}
                  alt="Fauja Singh with the Sikhs In The City community"
                  width={480}
                  height={560}
                  rotate={-3}
                  className="max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Words from Fauja Singh and the team */}
        <section className="bg-secondary px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Words from Fauja Singh and the team
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {VIDEOS.map((video) => (
                <VideoEmbed
                  key={video.title}
                  videoId={video.videoId}
                  title={video.title}
                  caption={video.caption}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — A place with meaning */}
        <section className="bg-background px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <MapEmbed
                src={CLUBHOUSE_MAP_SRC}
                title="Proposed clubhouse location"
              />
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  A place with meaning
                </h2>
                <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                  The proposed clubhouse sits in the heart of Redbridge, steps
                  from the streets and parks where our community trains every
                  Sunday. It will be an eco-friendly, fully accessible home for
                  running, wellbeing, and Sikh values in action.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                  {CLUBHOUSE_ADDRESS}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
