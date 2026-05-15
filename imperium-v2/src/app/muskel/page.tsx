import { ArrowLeft, ArrowRight, Heart, Activity, Bone, Brain, Clock, TrendingUp, TrendingDown, Zap, Shield, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MuskelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[rgba(5,5,5,0.7)] backdrop-blur-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-white/5 text-[var(--gold)]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-serif text-white">Muskel‑Bindegewebe</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-white/70">
          <a href="#einordnung" className="hover:text-[var(--gold)]">Einteilung</a>
          <a href="#entwicklung" className="hover:text-[var(--gold)]">Entwicklung</a>
          <a href="#histologie" className="hover:text-[var(--gold)]">Histologie</a>
          <a href="#biochemie" className="hover:text-[var(--gold)]">Biochemie</a>
          <a href="#physiologie" className="hover:text-[var(--gold)]">Physiologie</a>
          <a href="#klinik" className="hover:text-[var(--gold)]">Klinik</a>
          <a href="#anpassung" className="hover:text-[var(--gold)]">Anpassung</a>
        </nav>
      </header>

      {/* Sections */}
      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="einordnung">
        <h2 className="text-3xl font-bold text-white mb-4">🧩 Einteilung des Muskel‑Bindegewebes</h2>
        <p className="text-lg text-white/80">
          Das Muskel‑Bindegewebe (MCT, <em>muscle connective tissue</em>) umfasst alle Bindegewebsstrukturen, die mit Muskelzellen (Myofibrillen) assoziiert sind. Es wird häufig nach <strong>Form</strong> (perimysial, epimysial, endomysial) und nach <strong>Entstehung</strong> (mesenchymale Herkunft, fibrillärer vs. lockerer Typ) unterschieden.
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li><strong>Endomysium:</strong> dünne Kollagen‑II‑Fasern um jede einzelne Muskelzelle.</li>
          <li><strong>Perimysium:</strong> Bündelt mehrere Muskelfasern zu Faszikel, besteht aus dichtem Kollagen‑I‑Gefüge.</li>
          <li><strong>Epidymium (Epimysium):</strong> umschließt den gesamten Muskel, enthält elastisches Kollagen, Blut‑ und Nerven‑Vasculatur.</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Muscle_histology.png" alt="Muskelhistologie" className="max-w-full rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="entwicklung">
        <h2 className="text-3xl font-bold text-white mb-4">🧬 Entwicklung & Entstehung</h2>
        <p className="text-lg text-white/80">
          Während der Embryonalphase differenzieren mesenchymale Stammzellen zu Myoblasten. Parallel dazu entstehen mesenchymale Vorläufer‑Fibroblasten, die das Bindegewebe ausbilden. Das Endomysium entsteht bereits während der Myoblastfusion, das Perimysium und Epimysium lagern sich später an, wenn das Muskelgewebe von Gefäßen versorgt wird.
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li>Woche 5‑6: Myotube‑Bildung und erstes Endomysium.</li>
          <li>Woche 7‑9: Kapillarisierung, Perimysium‑Entwicklung.</li>
          <li>Geburt & postnatale Phase: Remodeling des Epimysiums in Reaktion auf Belastung.</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Embryonic_muscle_development.png" alt="Embryonale Muskelentwicklung" className="max-w-full rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="histologie">
        <h2 className="text-3xl font-bold text-white mb-4">🔬 Histologie (Zelltypen)</h2>
        <p className="text-lg text-white/80">
          Das MCT besteht aus einer heterogenen Zellpopulation:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li><strong>Fibroblasten:</strong> produzieren Kollagen‑I/III, regulieren ECM‑Umstrukturierung.</li>
          <li><strong>Myofibroblasten:</strong> besitzen kontraktile Aktin‑Filamente, wichtig für Wundheilung und mechanische Spannungsübertragung.</li>
          <li><strong>Perizyten & Perivaskuläre Zellen:</strong> unterstützen Blut‑ und Lymphgefäße.</li>
          <li><strong>Immunspezialisten (Makrophagen, Mast‑Zellen):</strong> modulieren Entzündungs‑ und Regenerationsprozesse.</li>
          <li><strong>Satellite‑Zellen (bei Myofibrillen):</strong> liegen im Endomysium, aktivieren bei Muskelreparatur.</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Fibroblast.png" alt="Fibroblast" className="max-w-full rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="biochemie">
        <h2 className="text-3xl font-bold text-white mb-4">⚗️ Biochemie (Zusammensetzung)</h2>
        <p className="text-lg text-white/80">
          Das extrazelluläre Matrix‑Gerüst des MCT besteht aus:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li>~80 % Kollagen‑Typ I (tensile Stärke).</li>
          <li>~15 % Kollagen‑Typ III (flexibel, unterstützt Type I).</li>
          <li>Elastin (vor allem im Epimysium, ermöglicht Dehnung).</li>
          <li>Proteoglykane (z. B. decorin, biglycan) – regulieren Fibrillorganisation.</li>
          <li>Glycosaminoglykane (Hyaluronsäure) – tragen zur Hydratation und Gleiteigenschaften bei.</li>
        </ul>
        <p className="text-lg text-white/80 mt-4">
          30‑40 % der Trockenmasse des gesamten Muskels ist Bindegewebe, wobei das Endomysium nur ca. 3 % ausmacht, Perimysium ~ 10 % und Epimysium ~ 25 %.
        </p>
        <div className="mt-6 flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Collagen_structure.png" alt="Kollagenstruktur" className="max-w-full rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="physiologie">
        <h2 className="text-3xl font-bold text-white mb-4">⚙️ Physiologie (Funktionen)</h2>
        <p className="text-lg text-white/80">
          Das Muskel‑Bindegewebe übernimmt mehrere zentrale Rollen:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li>Mechanische <strong>Force Transmission</strong> von Myofibrillen zu Sehnen (via Endo‑ → Peri‑ → Epimysium).</li>
          <li>Stabilisierende <strong>Shear‑Kräfte</strong> zwischen benachbarten Fasern.</li>
          <li>Versorgt das Muskelgewebe mit <strong>Blut‑ und Nährstoffversorgung</strong> (Kapillaren im Perimysium).</li>
          <li>Wird zur <strong>Propriozeption</strong> genutzt (Richter‑ und Pacini‑Körper in Perimysium).</li>
          <li>Wirkt als <strong>Speicher für Wachstums‑ und Reparatur‑Faktoren</strong> (TGF‑β, IGF‑1, VEGF).</li>
        </ul>
        <div className="mt-6 flex gap-4 justify-center">
          <div className="flex flex-col items-center">
            <Zap className="h-8 w-8 text-[var(--gold)]" />
            <span className="text-sm text-white/70 mt-1">Kraftübertragung</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-8 w-8 text-[var(--gold)]" />
            <span className="text-sm text-white/70 mt-1">Durchblutung</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="klinik">
        <h2 className="text-3xl font-bold text-white mb-4">🏥 Typische Klinik</h2>
        <p className="text-lg text-white/80">
          Erkrankungen des MCT manifestieren sich häufig als:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li><strong>Myofaszialer Schmerz‑Trigger‑Point</strong> – lokal begrenzte Hyperempfindlichkeit im Endo‑/Perimysium.</li>
          <li><strong>Fasziitis/Tendinopathie</strong> – degenerative Veränderungen im Perimysium/Epimysium.</li>
          <li><strong>Strukturelle Fibrose</strong> – übermäßige Kollagen‑III‑Ablagerungen (z. B. nach Trauma, Immobilisation).</li>
          <li><strong>Kompartmentsyndrom</strong> – erhöhter Druck im epimysialen Raum.</li>
        </ul>
        <p className="text-lg text-white/80 mt-4">
          Diagnostisch kommen Ultraschall, elastische MRI‑Sequenzen und Biopsie zum Einsatz.
        </p>
        <div className="mt-6 flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Ultrasound_of_muscle_fascia.jpg" alt="Ultraschall‑Bild" className="max-w-full rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-6 space-y-16" id="anpassung">
        <h2 className="text-3xl font-bold text-white mb-4">📈 Belastbarkeit & Anpassungsfähigkeit</h2>
        <p className="text-lg text-white/80">
          Das MCT ist hochdynamisch und reagiert auf mechanische Stimuli:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-2">
          <li><strong>Training:</strong> Hypertrophie erhöht Perimysium‑Dichte, stärkt kollagene Vernetzung (bis zu 30 % mehr Kollagen‑I).</li>
          <li><strong>Inaktivität:</strong> Schnellere Kollagen‑III‑Aufstockung, Verlust von Elastin, reduziert mechanische Leitfähigkeit.</li>
          <li><strong>Alterung:</strong> Ab ≈ 60 Jahren steigt Kollagen‑III‑zu‑I‑Verhältnis, Gelatin‑Quervernetzung erhöht, wodurch Steifigkeit (~ 15 % mehr) entsteht.</li>
          <li><strong>Ernährung:</strong> Vitamin C, Pro‑Collagen‑Peptide und Omega‑3‑Fettsäuren unterstützen Synthese und Remodelling.</li>
        </ul>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-[var(--gold)]" />
            <span className="text-white/80">Training → ↑ Kollagen‑I, ↑ Querschnitts‑Festigkeit</span>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingDown className="h-6 w-6 text-[var(--gold)]" />
            <span className="text-white/80">Inaktivität → ↑ Kollagen‑III, ↓ Elastizität</span>
          </div>
        </div>
        <p className="text-lg text-white/80 mt-4">
          Praktische Implikation für die Physiotherapie: Regelmäßige **exzentrische Belastungen** fördern fibroblastales Remodeling, **myofasziale Mobilisation** reduziert Verklebungen und verbessert Kraftübertragung.
        </p>
      </section>

      <footer className="border-t border-white/5 py-8 text-center mt-12">
        <p className="text-sm text-white/50">© 2026 Muskel‑Bindegewebe‑Portal – erzeugt mit Gemini‑ACP – Felix Ratzenböck & Leo 🐈</p>
        <Link href="/" className="text-[var(--gold)] hover:underline">← Zurück zur Startseite</Link>
      </footer>
    </main>
  );
}
