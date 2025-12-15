const toggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  header.classList.toggle('open');
  nav.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
