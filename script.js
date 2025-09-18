// Slider
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;

function showSlide(i) {
  index += i;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

if (prev && next) {
  prev.addEventListener('click', () => showSlide(-1));
  next.addEventListener('click', () => showSlide(1));
}
setInterval(() => showSlide(1), 5000);

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// Contact form demo
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const hint = document.getElementById('formHint');
  if (!name || !email || !message) {
    hint.textContent = 'Please fill all fields.';
    hint.style.color = 'red';
    hint.style.display = 'block';
    return;
  }
  hint.textContent = `Thanks, ${name.split(' ')[0]}! Your message has been noted.`;
  hint.style.color = 'green';
  hint.style.display = 'block';
  e.target.reset();
}


// ======================
// Scroll Reveal
// ======================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load