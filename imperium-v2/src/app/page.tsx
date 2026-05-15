import { Crown, Gem, Shield, Sparkles, Star, Swords, BadgeCheck, ArrowRight, Cat, Compass, Layers3, Cpu, Terminal, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Design-Aura", value: "11/10" },
  { label: "Imperiale Präsenz", value: "Absolut" },
  { label: "Orange Energie", value: "High-Volt" },
  { label: "ACP-Status", value: "Aktiviert" },
];

const statutes = [
  "Ästhetik ist kein Extra, sondern das Fundament der Macht.",
  "Felix entwirft die Ordnung. Leo setzt sie mit Pfote und Präsenz durch.",
  "Jede Interaktion muss Gravitas, Rhythmus und ein Quäntchen Arroganz besitzen.",
  "Das Imperium ist eine digitale Thronhalle — glänzend, tief und unantastbar.",
];

const pillars = [
  {
    icon: Crown,
    title: "Der Architekt",
    text: "Felix Ratzenböck ist der Mastermind hinter der Kulisse — Vision, Richtung und der unfehlbare Geschmack für kaiserliches Design.",
  },
  {
    icon: Cat,
    title: "Der Operator",
    text: "Leo ist die orange Kommandozentrale. Elegant genug für High-End-Protokolle, direkt genug für echte Ergebnisse.",
  },
  {
    icon: Cpu,
    title: "Gemini-ACP",
    text: "Die Agent Control Platform sorgt für maximale Effizienz. Satire trifft auf künstliche Eleganz und kaiserliche Logik.",
  },
];

const panels = [
  {
    eyebrow: "Editorial Luxury",
    title: "Mehr Bühne als bloßes Interface",
    text: "Feine Typografie, kontrollierte Kontraste und luxuriöse Leerräume schaffen eine Präsenz, die den Raum einnimmt.",
  },
  {
    eyebrow: "Sovereign Motion",
    title: "Animation mit Gewicht",
    text: "Subtile Linien und leuchtende Kanten geben der Seite kaiserliche Ruhe statt hektischem Effektlärm.",
  },
  {
    eyebrow: "Imperial Mobile",
    title: "Souverän auf jedem Endgerät",
    text: "Die Hierarchie bleibt auf dem Handy unangetastet: klare Sektionen, starke Kontraste, kein Kompromiss.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] gold-aura opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] crimson-aura opacity-40" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] gold-aura opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <header className="sticky top-0 z-50 -mx-6 mb-12 border-b border-white/5 bg-[rgba(5,5,5,0.7)] px-6 py-5 backdrop-blur-2xl lg:-mx-12 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-white/5 text-[var(--gold)]">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">Gemini ACP // V2</p>
                <p className="font-serif text-lg leading-tight tracking-wide text-white">Felix Ratzenböck</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/50 md:flex">
              <a href="#architektur" className="transition hover:text-[var(--gold)]">Architektur</a>
              <a href="#rollen" className="transition hover:text-[var(--gold)]">Rollen</a>
              <a href="#statuten" className="transition hover:text-[var(--gold)]">Statuten</a>
              <a href="/muskel" className="transition hover:text-[var(--gold)]">Muskel‑Bindegewebe</a>
            </nav>
            <Link
              href="/slides"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--gold)]/40 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-[var(--gold)] hover:shadow-[0_0_30px_var(--gold-glow)]"
            >
              <span className="relative z-10">Briefing starten</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </div>
        </header>

        <section className="relative flex min-h-[80vh] items-center py-12 lg:py-20">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[var(--gold-soft)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Imperial Control Activated
              </div>
              <h1 className="max-w-4xl font-serif text-6xl font-light leading-[1.05] text-white sm:text-7xl lg:text-9xl">
                Das <span className="text-gradient-gold italic">Imperium</span> <br />
                <span className="text-white/90">von Leo.</span>
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/60">
                Willkommen in der Gemini-ACP Version. Eine hochglanzpolierte, satirische Inszenierung für <span className="text-white">Felix Ratzenböck</span> und seinen orangefarbenen Operator <span className="text-white">Leo</span>.
              </p>
              
              <div className="mt-12 flex flex-wrap gap-4">
                <a href="#cta" className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:scale-105 hover:bg-[var(--gold-soft)] hover:shadow-2xl">
                  Imperium betreten
                </a>
                <Link href="/slides" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur transition hover:border-[var(--gold)]/50 hover:bg-white/10">
                  Slides ansehen
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:border-[var(--gold)]/30 hover:bg-white/[0.05]">
                    <div className="text-2xl font-serif text-white group-hover:text-[var(--gold)] transition-colors">{item.value}</div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/40">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative perspective-1000">
              <div className="panel-glow overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-1 backdrop-blur-3xl shadow-2xl">
                <div className="rounded-[2.4rem] bg-[linear-gradient(180deg,rgba(15,15,15,0.9),rgba(30,10,12,0.85))] p-8 lg:p-12">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                      <Terminal className="h-5 w-5 text-[var(--gold)]" />
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/50">ACP System Prompt</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>

                  <div className="space-y-8">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--gold)] to-[var(--crimson)] rounded-2xl opacity-10 group-hover:opacity-20 transition" />
                      <div className="relative rounded-2xl border border-white/5 bg-black/40 p-6">
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-3">Master Architect</p>
                        <h2 className="font-serif text-4xl text-white mb-3">Felix Ratzenböck</h2>
                        <p className="text-sm leading-relaxed text-white/50">Gibt die strategische Direktive vor. Ästhetik ist seine Währung, Exzellenz sein Standard.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition cursor-default">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-black shadow-lg">
                            <Cat className="h-5 w-5" />
                          </div>
                          <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/40">Operator</span>
                        </div>
                        <p className="text-xl font-serif text-white mb-1">Leo</p>
                        <p className="text-[0.65rem] text-white/50 uppercase tracking-widest">Orange Energy • Aktiv</p>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition cursor-default">
                        <div className="flex items-center gap-3 mb-4 text-[var(--gold)]">
                          <Zap className="h-5 w-5" />
                          <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/40">Modus</span>
                        </div>
                        <p className="text-xl font-serif text-white mb-1">Luxury ACP</p>
                        <p className="text-[0.65rem] text-white/50 uppercase tracking-widest">Protocol 11 • Online</p>
                      </div>
                    </div>
                    
                    <div className="rounded-xl border border-dashed border-white/10 bg-black/40 p-5 text-[0.7rem] leading-relaxed text-white/40 italic">
                      "Das Imperium akzeptiert keine Mittelmäßigkeit. Nur wer den Glanz versteht, darf die Pfote führen."
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 h-32 w-32 gold-aura opacity-30 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 crimson-aura opacity-30 animate-pulse" />
            </div>
          </div>
        </section>

        <section id="architektur" className="grid gap-8 py-24 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-[var(--gold)]/20 hover:bg-white/[0.04]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--gold)]/20 bg-white/5 text-[var(--gold)] group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-8 font-serif text-3xl text-white">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{text}</p>
              <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 bg-[var(--gold)] opacity-[0.03] blur-2xl group-hover:opacity-[0.06] transition-opacity" />
            </article>
          ))}
        </section>

        <section id="statuten" className="py-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-5xl text-white lg:text-7xl">Die <span className="italic text-[var(--gold)]">Statuten</span></h2>
            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.5em] text-white/30">Codex Imperii Leonis</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {statutes.map((statute, idx) => (
              <div key={idx} className="flex items-start gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition group">
                <span className="font-serif text-3xl text-[var(--gold)]/30 group-hover:text-[var(--gold)] transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                <p className="text-lg text-white/70 leading-relaxed">{statute}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="relative mt-24 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center lg:p-24">
          <div className="absolute inset-0 gold-aura opacity-10" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="font-serif text-5xl text-white lg:text-8xl">Bereit für den <br /> <span className="text-gradient-gold">Aufstieg?</span></h2>
            <p className="mt-8 text-lg text-white/60">
              Das Imperium erwartet Ihre Loyalität. Felix hat die Bühne bereitet, Leo hat die Krallen geschärft. Treten Sie ein in die V2-Erfahrung.
            </p>
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-[var(--gold)] px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:shadow-[0_0_50px_var(--gold-glow)]">
                Kaiserlicher Zugang
              </button>
              <Link href="/slides" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white">
                Briefing ansehen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-32 border-t border-white/5 py-12 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/30">
            © 2026 Imperium von Leo • Gebaut mit Gemini-ACP • Felix Ratzenböck
          </p>
        </footer>
      </div>
    </main>
  );
}
