// =============================================
// SCRIPT.JS — All JavaScript interactions
// =============================================


// ── 1. HAMBURGER MENU TOGGLE ──────────────────
// When user clicks ☰ on mobile, show/hide nav links

var hamburger = document.getElementById('hamburger');
var navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
  // toggle means: if open → close, if closed → open
  navLinks.classList.toggle('open');
});

// close menu when a nav link is clicked
var links = document.querySelectorAll('.nav-links a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
}


// ── 2. NAVBAR BACKGROUND CHANGE ON SCROLL ────
// When user scrolls down, navbar gets a shadow

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// ── 3. SCROLL ANIMATION ───────────────────────
// Cards and sections fade in when they come into view

// get all elements we want to animate
var cards = document.querySelectorAll('.card, .testimonial-card, .stat');

// IntersectionObserver watches if element is visible on screen
var observer = new IntersectionObserver(function(entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      // add visible class when element enters screen
      entries[i].target.classList.add('visible');
    }
  }
}, { threshold: 0.1 });  // trigger when 10% of element is visible

// observe each card
for (var j = 0; j < cards.length; j++) {
  cards[j].style.opacity = '0';             // hide at start
  cards[j].style.transform = 'translateY(30px)';  // move down
  cards[j].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(cards[j]);
}

// when .visible class is added, show the element
var style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);


// ── 4. CONTACT FORM VALIDATION ───────────────
// Check if fields are filled before submitting

function submitForm() {
  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var formMsg = document.getElementById('form-msg');

  // check if any field is empty
  if (name === '') {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please enter your name.';
    return;
  }

  if (email === '') {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please enter your email.';
    return;
  }

  // simple email format check — must have @ and .
  if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please enter a valid email address.';
    return;
  }

  if (message === '') {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please enter your message.';
    return;
  }

  // all good — show success message
  formMsg.style.color = 'green';
  formMsg.textContent = 'Message sent! We will get back to you within 24 hours.';

  // clear the form
  document.getElementById('name').value    = '';
  document.getElementById('email').value   = '';
  document.getElementById('message').value = '';
}
