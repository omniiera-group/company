// Slider
// ======= Robust slider that sizes slides in pixels (desktop + mobile) =======
(function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slidesEl = slider.querySelector('.slides');
  const imgs = Array.from(slidesEl.querySelectorAll('img'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  let index = 0;
  let slideWidth = 0;
  let autoPlayInterval = null;
  const AUTO_DELAY = 5000;

  // set sizes: make slides container & each image width equal to slider.clientWidth (px)
  function setSizes() {
    slideWidth = Math.max(1, slider.clientWidth); // avoid 0
    // set slides container width to total
    slidesEl.style.width = `${slideWidth * imgs.length}px`;
    // set each image width explicitly
    imgs.forEach(img => {
      img.style.width = `${slideWidth}px`;
      img.style.height = 'auto';
    });
    // ensure the transform stays on the current slide
    updatePosition();
  }

  function updatePosition(animate = true) {
    if (!animate) slidesEl.style.transition = 'none';
    else slidesEl.style.transition = 'transform 0.55s ease';

    slidesEl.style.transform = `translateX(${-index * slideWidth}px)`;

    // restore transition if we turned it off
    if (!animate) {
      // small timeout to re-enable transition for next moves
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slidesEl.style.transition = 'transform 0.55s ease';
        });
      });
    }
  }

  function prevSlide() {
    index = (index - 1 + imgs.length) % imgs.length;
    updatePosition();
  }
  function nextSlide() {
    index = (index + 1) % imgs.length;
    updatePosition();
  }

  // autoplay with pause on hover/focus
  function startAuto() {
    stopAuto();
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // event bindings
  if (prev) prev.addEventListener('click', prevSlide);
  if (next) next.addEventListener('click', nextSlide);

  // pause while hovering the slider
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  // handle resize — recalc widths
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    // debounce resize
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setSizes, 120);
  });

  // wait for images to load then init sizes
  let imagesLoaded = 0;
  imgs.forEach(img => {
    if (img.complete) imagesLoaded++;
    else img.addEventListener('load', () => {
      imagesLoaded++;
      if (imagesLoaded === imgs.length) setSizes();
    });
  });
  // If they were already loaded
  if (imagesLoaded === imgs.length) setSizes();

  // fallback: if images take too long, still set sizes after load event
  window.addEventListener('load', () => {
    setSizes();
    startAuto();
  });

  // init
  setSizes();
  startAuto();

})();


// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
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
