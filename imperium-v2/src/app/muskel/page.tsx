"use client";
import { ArrowLeft, ArrowRight, Heart, Activity, Bone, Brain, Clock, TrendingUp, TrendingDown, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// ---- Translation data (German / English) ----
const i18n = {
  de: {
    toggleLang: "DE/EN",
    themeLight: "Light",
    themeDark: "Dark",
    sections: {
      einordnung: {
        title: "🧩 Einteilung des Muskel‑Bindegewebes",
        text: "Das Muskel‑Bindegewebe (MCT, muscle connective tissue) umfasst alle Bindegewebsstrukturen, die mit Muskelzellen (Myofibrillen) assoziiert sind. Es wird häufig nach Form (perimysial, epimysial, endomysial) und nach Entstehung (mesenchymale Herkunft, fibrillärer vs. lockerer Typ) unterschieden.",
        items: [
          "Endomysium: dünne Kollagen‑II‑Fasern um jede einzelne Muskelzelle.",
          "Perimysium: Bündelt mehrere Muskelfasern zu Faszikel, besteht aus dichtem Kollagen‑I‑Gefüge.",
          "Epimysium: umschließt den gesamten Muskel, enthält elastisches Kollagen, Blut‑ und Nerven‑Vasculatur."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/8/86/Muscle_histology.png",
        imgAlt: "Muskelhistologie"
      },
      entwicklung: {
        title: "🧬 Entwicklung & Entstehung",
        text: "Während der embryonalen Phase differenzieren mesenchymale Stammzellen zu Myoblasten. Parallel dazu entstehen mesenchymale Vorläufer‑Fibroblasten, die das Bindegewebe ausbilden. Das Endomysium entsteht bereits während der Myoblastfusion, das Perimysium und Epimysium lagern sich später an, wenn das Muskelgewebe von Gefäßen versorgt wird.",
        items: [
          "Woche 5‑6: Myotube‑Bildung und erstes Endomysium.",
          "Woche 7‑9: Kapillarisierung, Perimysium‑Entwicklung.",
          "Geburt & postnatale Phase: Remodeling des Epimysiums in Reaktion auf Belastung."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/5/55/Embryonic_muscle_development.png",
        imgAlt: "Embryonale Muskelentwicklung"
      },
      histologie: {
        title: "🔬 Histologie (Zelltypen)",
        text: "Das MCT besteht aus einer heterogenen Zellpopulation, die zentrale Funktionen übernimmt.",
        items: [
          "Fibroblasten – produzieren Kollagen‑I/III, regulieren ECM‑Umstrukturierung.",
          "Myofibroblasten – besitzen kontraktile Aktin‑Filamente, wichtig für Wundheilung.",
          "Perizyten & perivaskuläre Zellen – unterstützen Blut‑ und Lymphgefäße.",
          "Makrophagen & Mast‑Zellen – modulieren Entzündungs‑ und Regenerationsprozesse.",
          "Satellite‑Zellen – liegen im Endomysium, aktivieren bei Muskelreparatur."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Fibroblast.png",
        imgAlt: "Fibroblast"
      },
      biochemie: {
        title: "⚗️ Biochemie (Zusammensetzung)",
        text: "Das extrazelluläre Matrix‑Gerüst des MCT besteht aus:",
        items: [
          "~80 % Kollagen‑Typ I (tensile Stärke).",
          "~15 % Kollagen‑Typ III (flexibel, unterstützt Type I).",
          "Elastin – vor allem im Epimysium, ermöglicht Dehnung.",
          "Proteoglykane (z. B. decorin, biglycan) – regulieren Fibrillorganisation.",
          "Glycosaminoglykane (Hyaluronsäure) – tragen zur Hydratation und Gleiteigenschaften bei."
        ],
        extra: "30‑40 % der Trockenmasse des gesamten Muskels ist Bindegewebe, wobei das Endomysium nur ca. 3 % ausmacht, Perimysium ~ 10 % und Epimysium ~ 25 %.",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Collagen_structure.png",
        imgAlt: "Kollagenstruktur"
      },
      physiologie: {
        title: "⚙️ Physiologie (Funktionen)",
        text: "Das Muskel‑Bindegewebe übernimmt mehrere zentrale Rollen:",
        items: [
          "Mechanische Force Transmission von Myofibrillen zu Sehnen (Endo → Peri → Epimysium).",
          "Stabilisierende Shear‑Kräfte zwischen benachbarten Fasern.",
          "Versorgung mit Blut‑ und Nährstoffen (Kapillaren im Perimysium).",
          "Propriozeption (Richtungs‑ und Druckrezeptoren im Perimysium).",
          "Speicher für Wachstums‑ und Reparatur‑Faktoren (TGF‑β, IGF‑1, VEGF)."
        ],
        icons: [
          { icon: Zap, label: "Kraftübertragung" },
          { icon: Heart, label: "Durchblutung" }
        ]
      },
      klinik: {
        title: "🏥 Typische Klinik",
        text: "Erkrankungen des MCT manifestieren sich häufig als:",
        items: [
          "Myofaszialer Schmerz‑Trigger‑Point – Hyperempfindlichkeit im Endo‑/Perimysium.",
          "Fasziitis/Tendinopathie – degenerative Veränderungen im Perimysium/Epimysium.",
          "Strukturelle Fibrose – übermäßige Kollagen‑III‑Ablagerungen nach Trauma/Immobilisation.",
          "Kompartmentsyndrom – erhöhter Druck im epimysialen Raum."
        ],
        extra: "Diagnostik: Ultraschall, elastische MRI‑Sequenzen, Biopsie.",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/96/Ultrasound_of_muscle_fascia.jpg",
        imgAlt: "Ultraschall‑Bild"
      },
      anpassung: {
        title: "📈 Belastbarkeit & Anpassungsfähigkeit",
        text: "Das MCT ist hochdynamisch und reagiert auf mechanische Stimuli:",
        items: [
          "Training: Hypertrophie erhöht Perimysium‑Dichte, stärkt kollagene Vernetzung (bis zu 30 % mehr Kollagen‑I).",
          "Inaktivität: Schnellere Kollagen‑III‑Aufstockung, Verlust von Elastin, reduziert mechanische Leitfähigkeit.",
          "Alterung: Ab ≈ 60 J steigt Kollagen‑III‑zu‑I‑Verhältnis, Gelatin‑Quervernetzung erhöht, sodass Steifigkeit (~ 15 % mehr) entsteht.",
          "Ernährung: Vitamin C, Pro‑Collagen‑Peptide und Omega‑3‑Fettsäuren unterstützen Synthese und Remodelling."
        ],
        trend: [
          { icon: TrendingUp, text: "Training → ↑ Kollagen‑I, ↑ Querschnitt‑Festigkeit" },
          { icon: TrendingDown, text: "Inaktivität → ↑ Kollagen‑III, ↓ Elastizität" }
        ],
        extra: "Praktische Implikation für die Physiotherapie: Exzentrische Belastungen fördern fibroblastales Remodeling, myofasziale Mobilisation reduziert Verklebungen und verbessert Kraftübertragung."
      }
    }
  },
  en: {
    toggleLang: "DE/EN",
    themeLight: "Light",
    themeDark: "Dark",
    sections: {
      einordnung: {
        title: "🧩 Classification of Muscle Connective Tissue",
        text: "Muscle connective tissue (MCT) comprises all connective structures associated with muscle fibers (myofibrils). It is commonly classified by form (perimysial, epimysial, endomysial) and by origin (mesenchymal, fibrillar vs. loose).",
        items: [
          "Endomysium: thin collagen‑II fibers surrounding each individual muscle cell.",
          "Perimysium: bundles several muscle fibers into fascicles, composed of dense collagen‑I matrix.",
          "Epimysium: encloses the whole muscle, contains elastic collagen, blood and nerve vasculature."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/8/86/Muscle_histology.png",
        imgAlt: "Muscle histology"
      },
      entwicklung: {
        title: "🧬 Development & Origin",
        text: "During embryonic development mesenchymal stem cells differentiate into myoblasts. Simultaneously, mesenchymal precursor fibroblasts form the connective tissue. Endomysium appears during myoblast fusion; perimysium and epimysium develop later as vascularisation occurs.",
        items: [
          "Week 5‑6: Myotube formation and first endomysium.",
          "Week 7‑9: Capillarisation, perimysium development.",
          "Birth & post‑natal phase: epimysium remodelling in response to loading."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/5/55/Embryonic_muscle_development.png",
        imgAlt: "Embryonic muscle development"
      },
      histologie: {
        title: "🔬 Histology (Cell types)",
        text: "MCT contains a heterogeneous cell population performing key functions.",
        items: [
          "Fibroblasts – produce collagen‑I/III, regulate ECM remodeling.",
          "Myofibroblasts – contain contractile actin filaments, important for wound healing.",
          "Pericytes & perivascular cells – support blood and lymph vessels.",
          "Macrophages & mast cells – modulate inflammation and regeneration.",
          "Satellite cells – reside in endomysium, activate during muscle repair."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Fibroblast.png",
        imgAlt: "Fibroblast"
      },
      biochemie: {
        title: "⚗️ Biochemistry (Composition)",
        text: "The extracellular matrix of MCT consists of:",
        items: [
          "~80 % type‑I collagen (tensile strength).",
          "~15 % type‑III collagen (flexible, supports type‑I).",
          "Elastin – mainly in epimysium, enables stretch.",
          "Proteoglycans (e.g., decorin, biglycan) – regulate fibril organisation.",
          "Glycosaminoglycans (hyaluronic acid) – provide hydration and glide.",
          "30‑40 % of the dry weight of the whole muscle is connective tissue; endomysium ≈ 3 %, perimysium ≈ 10 %, epimysium ≈ 25 %."
        ],
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Collagen_structure.png",
        imgAlt: "Collagen structure"
      },
      physiologie: {
        title: "⚙️ Physiology (Functions)",
        text: "Muscle connective tissue fulfils several central roles:",
        items: [
          "Mechanical force transmission from myofibrils to tendons (endo → peri → epimysium).",
          "Shear‑force stabilisation between neighbouring fibers.",
          "Blood and nutrient supply (capillaries in perimysium).",
          "Proprioception (direction and pressure receptors in perimysium).",
          "Reservoir for growth and repair factors (TGF‑β, IGF‑1, VEGF)."
        ],
        icons: [
          { icon: Zap, label: "Force transmission" },
          { icon: Heart, label: "Perfusion" }
        ]
      },
      klinik: {
        title: "🏥 Typical clinical picture",
        text: "Pathologies of MCT commonly present as:",
        items: [
          "Myofascial trigger points – localized hyper‑sensitivity in endo‑/perimysium.",
          "Fasciitis/Tendinopathy – degenerative changes in perimysium/epimysium.",
          "Structural fibrosis – excess collagen‑III after trauma or immobilisation.",
          "Compartment syndrome – increased pressure in the epimysial compartment."
        ],
        extra: "Diagnostic tools: ultrasound, elastography‑MRI, biopsy.",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/96/Ultrasound_of_muscle_fascia.jpg",
        imgAlt: "Ultrasound"
      },
      anpassung: {
        title: "📈 Loadability & Adaptability",
        text: "MCT is highly dynamic and reacts to mechanical stimuli:",
        items: [
          "Training: hypertrophy raises perimysium density and collagen‑I content (up to 30 %).",
          "Inactivity: rapid collagen‑III increase, loss of elastin, reduced mechanical conductivity.",
          "Aging: from ≈ 60 yr onward collagen‑III/I ratio rises, gelatin cross‑linking increases, stiffness ↑ ≈ 15 %.",
          "Nutrition: vitamin C, collagen peptides and omega‑3 support synthesis and remodelling."
        ],
        trend: [
          { icon: TrendingUp, text: "Training → ↑ Collagen‑I, ↑ cross‑sectional strength" },
          { icon: TrendingDown, text: "Inactivity → ↑ Collagen‑III, ↓ elasticity" }
        ],
        extra: "Therapeutic implication: eccentric loading promotes fibroblast remodelling, myofascial mobilisation reduces adhesions and improves force transmission."
      }
    }
  }
};

export default function MuskelPage() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const t = i18n[lang as keyof typeof i18n];

  // Theme handling – dark is default, light toggles a CSS class on <html>
  const [isLight, setIsLight] = useState(false);
  const toggleTheme = () => {
    document.documentElement.classList.toggle("light-mode");
    setIsLight(!isLight);
  };

  // Language toggle handler
  const toggleLang = () => setLang(lang === "de" ? "en" : "de");

  // Ensure the correct class is set on first render (SSR hydration safety)
  useEffect(() => {
    if (isLight) document.documentElement.classList.add("light-mode");
    else document.documentElement.classList.remove("light-mode");
  }, [isLight]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Header with toggles */}
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[rgba(5,5,5,0.7)] backdrop-blur-2xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--gold)] transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>Zurück</span>
        </Link>
        <div className="flex gap-4 items-center">
          <button onClick={toggleTheme} className="px-2 py-1 text-sm bg-white/10 rounded text-white hover:bg-white/20">
            {isLight ? t.themeDark : t.themeLight}
          </button>
          <button onClick={toggleLang} className="px-2 py-1 text-sm bg-white/10 rounded text-white hover:bg-white/20">
            {t.toggleLang}
          </button>
        </div>
      </header>
      {/* Hero Section – prominent intro */}
      <section className="hero-bg flex flex-col items-center text-center px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--gold)] mb-4">{t.sections.einordnung.title}</h1>
        <p className="text-lg md:text-xl max-w-2xl text-[var(--text)]/80 mb-6">{t.sections.einordnung.text}</p>
        <a href="#entwicklung" className="inline-block px-6 py-3 bg-[var(--gold)] text-black font-bold rounded hover:bg-[var(--gold-soft)] transition">Mehr erfahren</a>
      </section>

      {/* Helper to render a section as a card */}
      {Object.entries(t.sections).filter(([k]) => k !== 'einordnung').map(([key, sec]) => (
        <section key={key} className="max-w-4xl mx-auto py-12 px-6" id={key}>
          <div className="card">
            <h2 className="text-3xl font-bold mb-4 text-[var(--text)]">{sec.title}</h2>
            <p className="text-lg mb-4 text-[var(--text)]/80">{sec.text}</p>
            {sec.items && (
              <ul className="list-disc ml-6 space-y-2 text-[var(--text)]/80 mb-4">
                {sec.items.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            )}
            {/* Images – optional */}
            {('img' in sec && sec.img) && (
              <div className="mt-4 flex justify-center">
                <img src={sec.img} alt={sec.imgAlt} className="max-w-full rounded-lg shadow-lg" />
              </div>
            )}
            {/* Extra paragraphs */}
            {'extra' in sec && sec.extra && <p className="mt-4 text-[var(--text)]/80">{sec.extra}</p>}
            {/* Icons grid for physiology */}
            {'icons' in sec && sec.icons && (
              <div className="mt-4 flex gap-6">
                {sec.icons.map((ic, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <ic.icon className="h-8 w-8 text-[var(--gold)]" />
                    <span className="text-sm text-[var(--text)]/70 mt-1">{ic.label}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Trend icons for adaptability */}
            {'trend' in sec && sec.trend && (
              <div className="mt-4 space-y-2">
                {sec.trend.map((tr, i) => (
                  <div key={i} className="flex items-center space-x-3 text-[var(--text)]/80">
                    <tr.icon className="h-6 w-6 text-[var(--gold)]" />
                    <span>{tr.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <footer className="border-t border-white/5 py-8 text-center mt-12">
        <p className="text-sm text-[var(--text)]/50">© 2026 Muskel‑Bindegewebe‑Portal – erzeugt mit Gemini‑ACP – Felix Ratzenböck & Leo 🐈</p>
        <Link href="/" className="text-[var(--gold)] hover:underline">← Zurück zur Startseite</Link>
      </footer>
    </main>
  );
}
