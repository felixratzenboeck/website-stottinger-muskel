"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Cat, Crown, Gem, Layers3, Sparkles, Star, Cpu, Terminal, Shield, Zap, BadgeCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  stat?: string;
  icon?: any;
};

const slides: Slide[] = [
  {
    id: "01",
    eyebrow: "Gemini ACP // V2",
    title: "Imperium von Leo",
    body: "Willkommen beim strategischen Briefing der V2-Plattform. Eine luxuriöse, satirische Inszenierung für Felix Ratzenböck und seinen Operator Leo.",
    stat: "ACP Active",
    icon: Crown,
  },
  {
    id: "02",
    eyebrow: "Der Architekt",
    title: "Felix entwirft die Ordnung.",
    body: "Er ist der strategische Kopf hinter dem Imperium. Jedes Detail, jede Farbe und jede Animation folgt seiner imperialen Vision.",
    bullets: ["Visionäre Führung", "Unfehlbarer Geschmack", "Strategische Gravitas"],
    icon: Shield,
  },
  {
    id: "03",
    eyebrow: "Der Operator",
    title: "Leo führt die Befehle aus.",
    body: "Orange, effizient und mit einer Präsenz, die keine Fragen offen lässt. Leo ist das Herzstück der operativen Exzellenz.",
    bullets: ["Orange Energy Core", "Präzisions-Pfote", "Agent-Control-Logic"],
    icon: Cat,
  },
  {
    id: "04",
    eyebrow: "Design Language",
    title: "Gold. Crimson. Deep Black.",
    body: "Die Ästhetik der V2 setzt auf maximale Tiefe und kaiserlichen Glanz. Ein Interface, das nicht nur funktioniert, sondern herrscht.",
    stat: "Luxury UI",
    icon: Gem,
  },
  {
    id: "05",
    eyebrow: "ACP System",
    title: "Gemini-Agent-Control.",
    body: "Hinter der Fassade arbeitet die ACP-Logik: Ein System, das Satire und High-End-Performance nahtlos miteinander verwebt.",
    bullets: ["Automatisierte Eleganz", "Kaiserliche Algorithmen", "Agent-Driven Layouts"],
    icon: Cpu,
  },
  {
    id: "06",
    eyebrow: "Motion Concept",
    title: "Majestätische Dynamik.",
    body: "Keine hektischen Bewegungen. Jede Transition hat Gewicht und Rhythmus, um die kaiserliche Ruhe der Seite zu bewahren.",
    stat: "Sovereign Motion",
    icon: Zap,
  },
  {
    id: "07",
    eyebrow: "Tonalität",
    title: "Satire mit Anspruch.",
    body: "Der Humor ist trocken, die Übersteigerung bewusst gewählt. Ein digitales Denkmal mit einem Augenzwinkern.",
    icon: Star,
  },
  {
    id: "08",
    eyebrow: "Responsive Macht",
    title: "Imperial auf jedem Screen.",
    body: "Egal ob Desktop oder Mobile: Die Präsenz des Imperiums bleibt konsistent und unerschütterlich.",
    bullets: ["Mobile First Luxury", "Adaptive Hierarchie", "Touch-Optimierter Glanz"],
    icon: Layers3,
  },
  {
    id: "09",
    eyebrow: "Technologie",
    title: "Next-Gen Foundation.",
    body: "Gebaut auf Next.js 16, Tailwind 4 und Framer Motion. Modernste Technik im Dienste der imperialen Ästhetik.",
    stat: "V8 Engine",
    icon: Terminal,
  },
  {
    id: "10",
    eyebrow: "Launch Status",
    title: "Das Imperium ist bereit.",
    body: "Die V2-Plattform ist live. Das Briefing endet hier — der Aufstieg beginnt jetzt. Felix gibt den Befehl.",
    bullets: ["ACP Online", "Leo Ready", "V2 Live"],
    icon: BadgeCheck,
  },
];

// Removed fallback; using BadgeCheck from lucide-react

export default function SlidesPage() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, slides.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(slides.length - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(139,0,0,0.15),transparent_40%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-12">
        <header className="mb-8 flex items-center justify-between gap-6 rounded-3xl border border-white/5 bg-white/[0.03] px-8 py-5 backdrop-blur-3xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[var(--gold)]/50">
              <ArrowLeft className="h-5 w-5 text-[var(--gold)]" />
            </Link>
            <div>
              <div className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">Imperial Briefing</div>
              <div className="font-serif text-lg text-white">Gemini ACP // V2</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/40">
            <span className="text-white/60">{slide.id}</span>
            <div className="h-4 w-[1px] bg-white/10" />
            <span>{slides.length}</span>
          </div>
        </header>

        <div className="mb-8 h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          />
        </div>

        <div className="relative flex-1 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.section
              key={slide.id}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="panel-glow relative flex min-h-[65vh] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-8 lg:p-16"
            >
              <div className="absolute -top-24 -right-24 h-64 w-64 gold-aura opacity-20" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 crimson-aura opacity-20" />

              <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--gold-soft)]">
                    <Sparkles className="h-4 w-4" />
                    {slide.eyebrow}
                  </div>
                  <h1 className="mt-10 font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-8xl">
                    {slide.title}
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
                    {slide.body}
                  </p>

                  {slide.bullets ? (
                    <div className="mt-12 grid gap-4 sm:grid-cols-2">
                      {slide.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 text-sm text-white/70">
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                          {bullet}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.8),rgba(40,10,12,0.7))] p-10 backdrop-blur-3xl">
                    <div className="mb-8 flex items-center justify-between">
                      {slide.icon && <slide.icon className="h-8 w-8 text-[var(--gold)]" />}
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/30">System Status</span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                        <div className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-2">Matrix Value</div>
                        <div className="font-serif text-3xl text-white">{slide.stat ?? "Imperial Core"}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
                          <Zap className="mx-auto h-5 w-5 text-[var(--gold)] mb-3" />
                          <div className="text-[0.5rem] uppercase tracking-widest text-white/40">Power</div>
                          <div className="text-xs font-bold text-white">MAX</div>
                        </div>
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
                          <Shield className="mx-auto h-5 w-5 text-[var(--crimson)] mb-3" />
                          <div className="text-[0.5rem] uppercase tracking-widest text-white/40">Security</div>
                          <div className="text-xs font-bold text-white">ULTRA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/30">
                  <Terminal className="h-4 w-4 text-[var(--gold)]" />
                  Gemini Agent Control Platform // Protocol V2
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIndex((value) => Math.max(value - 1, 0))}
                    disabled={index === 0}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--gold)]/50 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIndex((value) => Math.min(value + 1, slides.length - 1))}
                    disabled={index === slides.length - 1}
                    className="group flex items-center gap-4 rounded-full bg-white px-8 h-14 text-sm font-bold uppercase tracking-widest text-black transition hover:scale-105 hover:bg-[var(--gold-soft)] disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Weiter
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
