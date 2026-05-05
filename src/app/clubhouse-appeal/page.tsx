import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PolaroidImage } from "@/components/polaroid-image";
import { AmenityCard } from "@/components/amenity-card";
import { VideoEmbed } from "@/components/sections/video-embed";
import { MapEmbed } from "@/components/sections/map-embed";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { clubhouseAmenities } from "@/data/clubhouse-amenities";

// TODO(asset): swap Fauja Singh portrait and confirm the clubhouse address
// before launch.
const DONATE_HREF = "https://www.gofundme.com/f/fauja-singh-clubhouse-appeal";

const BANK_DETAILS: { label: string; value: string }[] = [
  { label: "Account Name", value: "Sikhs In The City" },
  { label: "Account Number", value: "38715668" },
  { label: "Sort Code", value: "30-90-89" },
];
const FAUJA_PORTRAIT_SRC = "/images/hero/slide-2.jpg";
const HONOURING_IMAGE_SRC = "/images/clubhouse-appeal/clubhouse-legacy.jpg";
const RENDER_IMAGE_SRCS = [
  "/images/clubhouse-appeal/clubhouse-vision-1.png",
  "/images/clubhouse-appeal/clubhouse-vision-2.png",
  "/images/clubhouse-appeal/clubhouse-vision-3.png",
] as const;
const FUNDING_IMAGE_SRC = "/images/clubhouse-appeal/clubhouse-funding.png";
const VALUES_IMAGE_SRC = "/images/clubhouse-appeal/clubhouse-values.jpg";
const CLUBHOUSE_ADDRESS = "Beal High School, Woodford Bridge Road, Ilford IG4 5LP";
const CLUBHOUSE_MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  CLUBHOUSE_ADDRESS
)}&output=embed`;

const RENDER_ROTATIONS = [-3, 2, -2] as const;

const VIDEOS: {
  videoId: string;
  hash: string;
  title: string;
  caption: string;
}[] = [
  {
    videoId: "332851874",
    hash: "c858666df8",
    title: "Pre Clubhouse Appeal Video",
    caption: "Pre Clubhouse Appeal Video",
  },
  {
    videoId: "332850326",
    hash: "228ff61275",
    title: "Clubhouse Appeal Video with Fauja Singh",
    caption: "Clubhouse Appeal Video with Fauja Singh",
  },
  {
    videoId: "332851767",
    hash: "bffa67fdd5",
    title: "Post Clubhouse Appeal Video",
    caption: "Post Clubhouse Appeal Video",
  },
];

function DonateButton({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "secondary";
}) {
  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <a href={DONATE_HREF} target="_blank" rel="noopener noreferrer">
        Donate Now
      </a>
    </Button>
  );
}

export default function ClubhouseAppealPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Section 1 — Hero */}
        <section className="relative overflow-hidden bg-blue-100 px-4 py-16 md:py-24">
          <Image
            src="/images/our-story/the-beginning-bg.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="pointer-events-none object-cover opacity-25"
          />
          <div className="container relative z-10 mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
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
                <div
                  className="relative h-72 w-80 overflow-hidden bg-blue-300 md:h-[28rem] md:w-[32rem]"
                  style={{ borderRadius: "60% 40% 45% 55% / 50% 55% 45% 50%" }}
                >
                  <Image
                    src={FAUJA_PORTRAIT_SRC}
                    alt="Fauja Singh BEM"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 32rem, 20rem"
                    priority
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
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-6">
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
              <div className="md:col-span-6 flex justify-center md:justify-end">
                <PolaroidImage
                  src={HONOURING_IMAGE_SRC}
                  alt="Fauja Singh BEM running with the Sikhs In The City community at a marathon"
                  width={720}
                  height={480}
                  fit="cover"
                  rotate={-3}
                  responsive
                  className="w-full"
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
                  hash={video.hash}
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

        {/* Section 5 — Bringing the Vision to Life */}
        <section className="bg-secondary px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Bringing the Vision to Life
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                Our architects have translated the community&apos;s dream into
                a set of thoughtful, sustainable spaces. These early renders
                show how the clubhouse could look, feel, and serve everyone
                who walks through its doors.
              </p>
            </div>
            <div className="mt-12 flex flex-col items-center justify-center gap-10 md:flex-row md:flex-wrap md:items-start md:gap-8">
              {RENDER_IMAGE_SRCS.map((src, index) => (
                <PolaroidImage
                  key={src}
                  src={src}
                  alt={`Architectural render of the proposed clubhouse (${
                    index + 1
                  } of ${RENDER_IMAGE_SRCS.length})`}
                  width={360}
                  height={420}
                  rotate={RENDER_ROTATIONS[index]}
                  className="max-w-xs"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Designed for Wellbeing, Accessibility, and Community Use */}
        <section className="bg-background px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Designed for Wellbeing, Accessibility, and Community Use
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                Every space in the clubhouse is planned around real community
                needs — from daily training to recovery, learning, and rest.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clubhouseAmenities.map((amenity) => (
                <AmenityCard
                  key={amenity.label}
                  icon={amenity.icon}
                  label={amenity.label}
                  description={amenity.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 — Funding the Build */}
        <section className="bg-secondary px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Funding the Build
                </h2>
                <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                  We&apos;re raising funds to cover design, construction, and
                  fit-out of the clubhouse. Every contribution — large or
                  small — moves us closer to breaking ground and handing the
                  keys back to the community.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                  Donate today to help us build a permanent home for Sikhs In
                  The City.
                </p>
                <DonateButton className="mt-8" />
              </div>
              <div className="flex justify-center md:justify-end">
                <PolaroidImage
                  src={FUNDING_IMAGE_SRC}
                  alt="Runners training together with the Sikhs In The City community"
                  width={480}
                  height={560}
                  rotate={3}
                  className="max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 — Carrying Fauja Singh's Values Forward */}
        <section className="bg-background px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="flex justify-center md:justify-start">
                <PolaroidImage
                  src={VALUES_IMAGE_SRC}
                  alt="Fauja Singh BEM with members of Sikhs In The City"
                  width={480}
                  height={560}
                  rotate={-3}
                  className="max-w-sm"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Carrying Fauja Singh&apos;s Values Forward
                </h2>
                <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                  Fauja Singh lived by service, humility, and the belief that
                  age is no barrier to purpose. The clubhouse will embody those
                  values — a welcoming space for every generation to run,
                  gather, and give back.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                  It&apos;s more than a building. It&apos;s a promise to
                  continue the legacy Fauja helped build.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Supporting the Clubhouse Appeal */}
        <section className="bg-secondary px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Supporting the Clubhouse Appeal
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
                To protect supporters and ensure transparency, no individuals
                are authorised to collect funds (cash or otherwise) for this
                project.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                All donations should be made electronically via this website
                or directly into the Sikhs In The City charity account.
              </p>
            </div>
            <dl className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
              {BANK_DETAILS.map((detail, index) => (
                <div
                  key={detail.label}
                  className={
                    "flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 " +
                    (index < BANK_DETAILS.length - 1
                      ? "border-b border-border"
                      : "")
                  }
                >
                  <dt className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                    {detail.label}
                  </dt>
                  <dd className="font-mono text-base text-foreground sm:text-right md:text-lg">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mx-auto mt-10 max-w-2xl">
              <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                Important donation notes
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80 md:text-lg">
                <li>
                  If donating via GoFundMe, please set the optional platform
                  tip to £0.00.
                </li>
                <li>
                  UK taxpayers are encouraged to select Gift Aid, allowing us
                  to claim an additional 25% on donations.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 10 — Help Build a Lasting Community Legacy */}
        <section className="bg-primary px-4 py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Help Build a Lasting Community Legacy
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">
              Join us in honouring Fauja Singh BEM and creating a permanent
              home for our running community. Your donation today helps shape a
              clubhouse that will serve generations to come.
            </p>
            <DonateButton variant="secondary" className="mt-8" />
          </div>
        </section>

        {/* Section 11 — Join CTA */}
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
