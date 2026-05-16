const translations = {
    en: {
        site_title: "Fascia & Muscle Connective Tissue",
        header_title: "Fascia Explorer",
        hero_h2: "Understanding Fascia",
        hero_p: "The biological fabric that holds us together. Explore the complex network of muscle connective tissue.",
        intro_h3: "What is Fascia?",
        intro_p1: "Fascia is a body-wide network of fibrous tissue that provides structural integrity, force transmission, and protection. It was once thought to be just 'packing material,' but modern research reveals it as a sensory organ and critical component of human movement.",
        graphic_fascia: "Fascia Network Model",
        hierarchy_h3: "Structural Hierarchy",
        epi_h4: "Epimysium",
        epi_p: "Dense sheath surrounding the entire muscle, reducing friction against bone and other muscles.",
        peri_h4: "Perimysium",
        peri_p: "Connective tissue grouping muscle fibers into fascicles. Houses blood vessels and nerves.",
        endo_h4: "Endomysium",
        endo_p: "A fine layer of loose tissue surrounding each individual muscle fiber.",
        facts_h3: "Key Functions",
        fact1_title: "Force Transmission:",
        fact1_desc: "Transmits mechanical tension across joints and myofascial chains.",
        fact2_title: "Proprioception:",
        fact2_desc: "Highly innervated with sensory receptors for body awareness.",
        fact3_title: "Tensegrity:",
        fact3_desc: "Balances tension and compression for stability without rigidity.",
        footer_text: "© 2026 Fascia Insights Project. Developed for educational purposes."
    },
    de: {
        site_title: "Faszien & Muskelbindegewebe",
        header_title: "Faszien-Explorer",
        hero_h2: "Faszien Verstehen",
        hero_p: "Das biologische Gewebe, das uns zusammenhält. Entdecken Sie das komplexe Netzwerk des Muskelbindegewebes.",
        intro_h3: "Was sind Faszien?",
        intro_p1: "Faszien sind ein körperweites Netzwerk aus faserigem Gewebe, das strukturelle Integrität, Kraftübertragung und Schutz bietet. Früher als bloßes 'Verpackungsmaterial' abgetan, zeigt die moderne Forschung sie als Sinnesorgan und entscheidende Komponente der menschlichen Bewegung.",
        graphic_fascia: "Faszien-Netzwerkmodell",
        hierarchy_h3: "Strukturelle Hierarchie",
        epi_h4: "Epimysium",
        epi_p: "Dichte Hülle, die den gesamten Muskel umgibt und die Reibung an Knochen und anderen Muskeln verringert.",
        peri_h4: "Perimysium",
        peri_p: "Bindegewebe, das Muskelfasern zu Bündeln (Faszikeln) zusammenfasst. Beherbergt Blutgefäße und Nerven.",
        endo_h4: "Endomysium",
        endo_p: "Eine feine Schicht aus lockerem Gewebe, die jede einzelne Muskelfaser umgibt.",
        facts_h3: "Schlüsselfunktionen",
        fact1_title: "Kraftübertragung:",
        fact1_desc: "Überträgt mechanische Spannung über Gelenke und myofasziale Ketten.",
        fact2_title: "Propriozeption:",
        fact2_desc: "Stark innerviert mit Sinnesrezeptoren für die Körperwahrnehmung.",
        fact3_title: "Tensegrity:",
        fact3_desc: "Gleichgewicht zwischen Zug und Druck für Stabilität ohne Starrheit.",
        footer_text: "© 2026 Faszien-Einblicke Projekt. Zu Bildungszwecken entwickelt."
    }
};

let currentLang = 'en';

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    updateLanguage();
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeIcon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}
