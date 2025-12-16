// Navigation toggling and active link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('open');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
      });
    });
  }

  // Highlight active nav based on body data-page attribute
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(`.main-nav a[data-nav="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
});