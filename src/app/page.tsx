"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Lightbox } from "@/components/Lightbox";

export default function Home() {
  const weddingDate = useMemo(() => new Date("2026-06-29T09:00:00+08:00"), []);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = weddingDate.getTime() - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [weddingDate]);

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
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-100 via-ivory-50 to-beige-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,246,248,0.75),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(251,236,200,0.45),transparent_50%)]" />
        </div>

        <Container className="relative">
          <nav className="flex items-center justify-between py-6 text-sm">
            <a href="#top" className="font-medium tracking-wide text-ink-200">
              J &amp; A
            </a>
            <div className="hidden items-center gap-6 text-ink-100 sm:flex">
              <a className="hover:text-ink-200" href="#details">
                Details
              </a>
              <a className="hover:text-ink-200" href="#gallery">
                Photos
              </a>
              <a className="hover:text-ink-200" href="#rsvp">
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
                className="text-[11px] tracking-[0.28em] uppercase text-ink-100"
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
                className="mt-6 font-display text-6xl tracking-[-0.02em] text-ink-300 sm:text-7xl lg:text-8xl"
              >
                James Rhyll <span className="text-gold-200">&amp;</span> Algen Mary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: 0.28,
                }}
                className="mt-6 text-base leading-7 text-ink-100 sm:text-lg"
              >
                Monday, June 29, 2026 • Dauis, Bohol
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
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink-300 px-7 font-medium text-ivory-50 shadow-soft transition hover:bg-ink-200"
                >
                  RSVP
                </a>
                <a
                  href="#details"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-black/10 bg-white/70 px-7 font-medium text-ink-200 shadow-ring backdrop-blur transition hover:bg-white/85"
                >
                  View details
                </a>
              </motion.div>

              <motion.a
                href="#details"
                aria-label="Scroll down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.85 }}
                className="mt-14 inline-flex flex-col items-center gap-2 text-xs tracking-[0.22em] uppercase text-ink-100"
              >
                <span>Scroll</span>
                <motion.span
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur"
                >
                  <span className="text-base leading-none">↓</span>
                </motion.span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.95 }}
                className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-gold-100 bg-beige-50/90 px-5 py-6 text-ink-200 shadow-soft backdrop-blur"
              >
                <p className="text-center font-display text-4xl tracking-tight">
                  June 29, 2026
                </p>
                <div className="mt-4 grid grid-cols-4 gap-3 text-center sm:gap-5">
                  {[
                    { label: "Day(s)", value: countdown.days },
                    { label: "Hour(s)", value: countdown.hours },
                    { label: "Minute(s)", value: countdown.minutes },
                    { label: "Second(s)", value: countdown.seconds },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="font-display text-4xl leading-none text-gold-400 sm:text-5xl">
                        {String(item.value).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-xs tracking-wide text-ink-50">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
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
              subtitle="Join us as we say ‘I do’ in a beautiful morning ceremony."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal className="glass rounded-2xl p-6 shadow-ring transition will-change-transform hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight">Ceremony</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 shadow-ring backdrop-blur">
                  <span className="text-base">⛪</span>
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                9:00 AM
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                Our Lady of Assumption Dauis Church
                <br />
                Dauis, Bohol
              </p>
              <div className="mt-5">
                <a
                  href="https://maps.app.goo.gl/ZzanPpd7UG44Q7uz9"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-medium text-ink-200 shadow-ring backdrop-blur transition hover:bg-white/85"
                >
                  View Wedding Map
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
                11:00 AM – 12:00 NN
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-50">
                Bohol Tropics Resort
                <br />
                Tagbilaran City, Bohol
              </p>
              <div className="mt-5">
                <a
                  href="https://maps.app.goo.gl/FDxCVvsY5i9hYMkS8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-medium text-ink-200 shadow-ring backdrop-blur transition hover:bg-white/85"
                >
                  View Reception Map
                </a>
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

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((src, idx) => (
              <Reveal
                key={`${src}-${idx}`}
                delay={idx * 0.03}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-ring"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 opacity-0 transition group-hover:opacity-100" />
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="block h-full w-full focus:outline-none"
                  aria-label="Open photo"
                >
                  <div className="relative h-[560px] w-full bg-white/40 p-2 sm:h-[620px]">
                    <Image
                      src={src}
                      alt="Gallery photo"
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
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
                subtitle="Please respond by June 14, 2026. With love, thank you for celebrating with us."
              />
            </Reveal>

            <Reveal delay={0.06} className="glass rounded-2xl p-6 shadow-soft">
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink-50">
                RSVP form
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-ring">
                <iframe
                  title="Wedding RSVP Form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSebpj82v8Y42trvpyTwI4TlUM4zc-TJpQxQcWN_7Ltu2LToqg/viewform?embedded=true"
                  className="h-[1200px] w-full bg-white"
                  loading="lazy"
                >
                  Loading RSVP form...
                </iframe>
              </div>
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
            With love, James Rhyll &amp; Algen Mary
          </p>
        </Container>
      </footer>
    </main>
  );
}
