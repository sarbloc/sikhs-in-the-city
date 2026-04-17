import { Clock, MapPin } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { InfoRow } from "@/components/info-row";
import { ContactForm } from "@/components/sections/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";

// Placeholder — confirm real address before merge (flagged in PR body).
const CONTACT_EMAIL = "info@sikhsinthecity.com";

const MEETING_ADDRESS =
  "Junction of Roding Lane South & Woodford Bridge Road opposite the PDSA centre, nearest postcode for SatNav IG4 5PS";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=IG4+5PS&output=embed";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        {/* Form section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Register Your Interest
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Use the form below to get in touch, whether you have a general
                enquiry or are interested in joining the group.
              </p>
              <ContactForm
                targetEmail={CONTACT_EMAIL}
                className="mt-8"
              />
            </div>
          </div>
        </section>

        {/* Training & Racing Meeting Point */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Training &amp; Racing Meeting Point
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              <InfoRow icon={MapPin}>{MEETING_ADDRESS}</InfoRow>
              <InfoRow icon={Clock}>
                Every <strong>Sunday</strong> morning{" "}
                <strong>6:00am&ndash;9:00am</strong>
              </InfoRow>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              (Please note: no changing facilities or WC, bring your own water
              / drinks)
            </p>
            <MapEmbed
              title="Map showing Sikhs In The City training meeting point near IG4 5PS"
              src={MAP_EMBED_SRC}
              className="mt-8"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
