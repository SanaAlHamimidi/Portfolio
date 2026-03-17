/* ============================================================
   SANA AL HAMIMIDI — PORTFOLIO JAVASCRIPT
   File: js/main.js

   What this file does:
   1. Navbar — adds shadow on scroll, highlights active section link
   2. Mobile menu — toggles the hamburger nav open/closed
   3. Scroll animations — fades in elements as you scroll down
   4. Skill bars — animates the bar widths when they come into view
   5. Contact form — handles the submit button feedback
   ============================================================ */


/* ── 1. NAVBAR: shadow on scroll + active link highlight ── */

const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

  // Add shadow to navbar once user scrolls past 10px
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Figure out which section is currently in view
  // and highlight the matching nav link
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // 80px offset for fixed navbar
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});


/* ── 2. MOBILE MENU: open/close on hamburger click ── */

const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  // Toggle the .open class which makes the menu visible (see CSS)
  navLinksMenu.classList.toggle('open');
});

// Close the menu when any nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
  });
});


/* ── 3. SCROLL ANIMATIONS: fade in elements as they enter the viewport ── */

// IntersectionObserver watches elements and fires a callback
// when they become visible on screen. Much better than scroll events
// because it's built into the browser and very efficient.

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop watching once it's visible (no need to re-animate)
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,   // trigger when 15% of the element is visible
    rootMargin: '0px'
  }
);

// Watch all project cards and about highlights
document.querySelectorAll('.project-card, .highlight').forEach(el => {
  fadeObserver.observe(el);
});

// Stagger project cards slightly so they animate one after another
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger highlight items too
document.querySelectorAll('.highlight').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
});


/* ── 4. SKILL BARS: animate bar widths when skills section scrolls into view ── */

const skillBars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Read the target width from the data-width attribute in HTML
        // e.g. <div class="bar-fill" data-width="85"> → sets width to 85%
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => barObserver.observe(bar));


/* ── 5. CONTACT FORM: show success feedback on submit ── */

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  // Prevent the default browser form submission (which would reload the page)
  e.preventDefault();

  // Simple validation — check all required fields are filled
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Show success state on the button
  submitBtn.textContent = 'Message Sent ✓';
  submitBtn.classList.add('sent');
  submitBtn.disabled = true;

  // Reset everything after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.classList.remove('sent');
    submitBtn.disabled = false;
    contactForm.reset();
  }, 3000);

  // NOTE: This form doesn't actually send an email — it's just UI feedback.
  // To make it send real emails, you can integrate a free service like
  // Formspree (https://formspree.io) by setting the form's action attribute.
  // Example: <form action="https://formspree.io/f/YOUR_ID" method="POST">
});
