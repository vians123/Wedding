"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal, revealItemVariants } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { RsvpForm } from "@/components/RsvpForm";
import { Lightbox } from "@/components/Lightbox";

export default function Home() {
  const photos = useMemo(
    () => [
      "/invites/first.jpeg",
      "/invites/2nd.jpeg",
      "/invites/3rd.jpeg",
      "/invites/4th.jpeg",
    ],
    [],
  );
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-ivory-50 text-ink-300">
      {/* Hero */}
      <section id="top" className="relative min-h-[92svh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 22, ease: "easeOut" }}
          >
            <Image
              src="/invites/first.jpeg"
              alt="Soft florals background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-ivory-50/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,246,248,0.50),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(251,236,200,0.25),transparent_55%)]" />
        </div>

        <Container className="relative">
          <nav className="flex items-center justify-between py-6 text-sm">
            <a href="#top" className="font-medium tracking-wide text-ivory-50">
              A &amp; J
            </a>
            <div className="hidden items-center gap-6 text-ivory-50/90 sm:flex">
              <a className="hover:text-ivory-50" href="#story">
                Our Story
              </a>
              <a className="hover:text-ivory-50" href="#details">
                Details
              </a>
              <a className="hover:text-ivory-50" href="#gallery">
                Photos
              </a>
              <a className="hover:text-ivory-50" href="#rsvp">
                RSVP
              </a>
            </div>
          </nav>

          <div className="pb-24 pt-16 sm:pb-32 sm:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-[11px] tracking-[0.28em] uppercase text-ivory-50/90"
              >
                Wedding Invitation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: 0.1,
                }}
                className="mt-6 font-display text-6xl tracking-[-0.02em] text-ivory-50 drop-shadow sm:text-7xl lg:text-8xl"
              >
                Avery <span className="text-gold-200">&amp;</span> Jordan
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: 0.28,
                }}
                className="mt-6 text-base leading-7 text-ivory-50/90 sm:text-lg"
              >
                Saturday, September 19, 2026 • Santa Barbara, California
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: 0.42,
                }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <a
                  href="#rsvp"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ivory-50/95 px-7 font-medium text-ink-300 shadow-soft backdrop-blur transition hover:bg-white"
                >
                  RSVP
                </a>
                <a
                  href="#details"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-black/20 px-7 font-medium text-ivory-50 shadow-ring backdrop-blur transition hover:bg-black/30"
                >
                  View details
                </a>
              </motion.div>

              <motion.a
                href="#story"
                aria-label="Scroll down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.85 }}
                className="mt-14 inline-flex flex-col items-center gap-2 text-xs tracking-[0.22em] uppercase text-ivory-50/80"
              >
                <span>Scroll</span>
                <motion.span
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur"
                >
                  <span className="text-base leading-none">↓</span>
                </motion.span>
              </motion.a>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section id="story" className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="A quiet hello, a timeless yes."
              subtitle="A few moments that brought us here — the kind you carry in your pocket forever."
            />
          </Reveal>

          <div className="relative mt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-black/0 via-black/10 to-black/0 lg:block"
            />

            <Reveal mode="stagger">
              <div className="grid gap-10">
                {[
                  {
                    year: "2018",
                    title: "We met",
                    body: "A rainy afternoon, a borrowed umbrella, and a conversation that never really ended.",
                  },
                  {
                    year: "2021",
                    title: "We moved in",
                    body: "Sunday coffee, shared playlists, and a home that felt like a promise.",
                  },
                  {
                    year: "2025",
                    title: "We got engaged",
                    body: "Golden hour, happy tears, and the easiest question we’ve ever answered.",
                  },
                ].map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <motion.div
                      key={item.year}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 28,
                          x: 0,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          x: 0,
                          transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] },
                        },
                      }}
                      className="relative grid items-start gap-6 lg:grid-cols-2"
                    >
                      <div className={isLeft ? "lg:pr-12" : "lg:col-start-2 lg:pl-12"}>
                        <motion.div
                          variants={{
                            hidden: { ...revealItemVariants.hidden, x: isLeft ? -24 : 24 },
                            visible: {
                              ...revealItemVariants.visible,
                              x: 0,
                              transition: {
                                duration: 0.9,
                                ease: [0.21, 0.47, 0.32, 0.98],
                              },
                            },
                          }}
                          className="glass rounded-2xl p-6 shadow-ring transition will-change-transform hover:-translate-y-0.5 hover:shadow-soft"
                        >
                          <p className="text-[11px] tracking-[0.24em] uppercase text-ink-50">
                            {item.year}
                          </p>
                          <h3 className="mt-2 font-display text-2xl tracking-tight">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-ink-50">
                            {item.body}
                          </p>
                        </motion.div>
                      </div>

                      <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-7 hidden -translate-x-1/2 lg:block"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 shadow-ring backdrop-blur">
                          <div className="h-2.5 w-2.5 rounded-full bg-gold-300" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Details */}
      <section
        id="details"
        className="relative py-24 sm:py-32 bg-[radial-gradient(circle_at_15%_10%,rgba(251,236,200,0.30),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(255,246,248,0.55),transparent_55%)]"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Event details"
              title="A day to savor"
              subtitle="We’d love for you to join us for a ceremony at sunset, followed by dinner and dancing."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal className="glass rounded-2xl p-6 shadow-ring transition will-change-transform hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight">Ceremony</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 shadow-ring backdrop-blur">
                  <span className="text-base">⛪</span>
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                4:30 PM • Courtyard Garden
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                Rosewood Estate
                <br />
                123 Coastal Way, Santa Barbara
              </p>
              <div className="mt-5">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-medium text-ink-200 shadow-ring backdrop-blur transition hover:bg-white/85"
                >
                  View in Google Maps
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.06}
              className="glass rounded-2xl p-6 shadow-ring transition will-change-transform hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight">Reception</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 shadow-ring backdrop-blur">
                  <span className="text-base">🥂</span>
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                6:00 PM • Dinner &amp; Dancing
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                The Conservatory Hall
                <br />
                (same venue)
              </p>
            </Reveal>

            <Reveal
              delay={0.12}
              className="glass rounded-2xl p-6 shadow-ring transition will-change-transform hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight">Map</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 shadow-ring backdrop-blur">
                  <span className="text-base">📍</span>
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-beige-50">
                <div className="flex aspect-[4/3] items-center justify-center text-center">
                  <div className="px-6">
                    <p className="text-sm text-ink-100">Map embed placeholder</p>
                    <p className="mt-2 text-xs leading-6 text-ink-50">
                      Replace with a Google Maps iframe or your favorite map
                      provider.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Photo gallery"
              title="Little glimpses"
              subtitle="A few favorites — soft light, warm laughs, and the sweet in-between."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {photos.map((src, idx) => (
              <Reveal
                key={`${src}-${idx}`}
                delay={idx * 0.03}
                className="group relative overflow-hidden rounded-2xl shadow-ring"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 opacity-0 transition group-hover:opacity-100" />
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="block h-full w-full focus:outline-none"
                  aria-label="Open photo"
                >
                  <Image
                    src={src}
                    alt="Gallery photo"
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Lightbox
        open={lightboxIdx !== null}
        src={
          lightboxIdx === null
            ? ""
            : photos[lightboxIdx]
        }
        alt="Gallery photo"
        onClose={() => setLightboxIdx(null)}
      />

      {/* RSVP */}
      <section
        id="rsvp"
        className="relative py-24 sm:py-32 bg-[radial-gradient(circle_at_20%_20%,rgba(255,246,248,0.55),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,236,200,0.22),transparent_55%)]"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="RSVP"
                title="Save us a seat"
                subtitle="Please respond by August 15, 2026. With love, thank you for being part of our story."
              />
              <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white/60 p-6 shadow-soft backdrop-blur">
                <h3 className="font-display text-2xl tracking-tight">Note</h3>
                <p className="mt-3 text-sm leading-7 text-ink-50">
                  Dress code is semi-formal. Ceremony is outdoors — consider a
                  light layer for the evening breeze.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="glass rounded-2xl p-6 shadow-soft">
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink-50">
                RSVP form
              </p>
              <RsvpForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <footer className="border-t border-black/10 bg-ivory-50 py-10">
        <Container className="text-center">
          <p className="font-display text-2xl tracking-tight">
            Thank you for celebrating with us.
          </p>
          <p className="mt-3 text-sm text-ink-50">
            With love, Avery &amp; Jordan
          </p>
        </Container>
      </footer>
    </main>
  );
}
