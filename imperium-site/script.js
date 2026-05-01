// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Scroll Reveal Observer
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Parallax Effect for Hero Content
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrollValue = window.scrollY;
    
    if (scrollValue < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollValue / 700);
    }
});

// Easter Egg: Leo's Meow
let clickCount = 0;
document.querySelector('.orange-glow').addEventListener('click', () => {
    clickCount++;
    if (clickCount % 3 === 0) {
        alert("Leo sagt: 'Miau! Wo ist mein Thunfisch? Das Imperium wartet!'");
    }
});

// Smooth reveal for nav on scroll
let lastScroll = 0;
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = 'none';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    }
    lastScroll = currentScroll;
});
