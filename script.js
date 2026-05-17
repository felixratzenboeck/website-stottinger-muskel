// script.js – theme & language toggle

// Theme toggle
const themeBtn=document.getElementById('themeToggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme);themeBtn.textContent=theme==='dark'?'☀️ Light Mode':'🌙 Dark Mode';}
const savedTheme=localStorage.getItem('theme')||'light';setTheme(savedTheme);
themeBtn.addEventListener('click',()=>{setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');});

// Language toggle (EN/DE)
const langBtn=document.getElementById('langToggle');
const texts=document.querySelectorAll('[data-en]');
function setLang(lang){localStorage.setItem('lang',lang);texts.forEach(el=>{el.textContent=el.getAttribute(`data-${lang}`)||'';});langBtn.textContent=lang==='en'?'DE':'EN';}
const savedLang=localStorage.getItem('lang')||'de';setLang(savedLang);
langBtn.addEventListener('click',()=>{setLang(localStorage.getItem('lang')==='en'?'de':'en');});
