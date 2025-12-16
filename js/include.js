// include.js (FIXED)
// Header / Footer include + Mobile nav control
// Cloudflare Pages compatible

async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  const link = document.querySelector(`.main-nav a[data-nav="${page}"]`);
  if (link) link.classList.add("active");
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (!header || !toggle) return;

  // ✅ CSS와 동일하게 'open'을 토글해야 메뉴가 보임
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    header.classList.toggle("open");
  });

  // 메뉴 링크 클릭 시 닫기
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
    });
  });

  // 모바일→데스크탑 전환 시 상태 초기화
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) header.classList.remove("open");
  });
}

// Initialise navigation and mobile menu on page load.  The header and footer
// are now embedded directly into each HTML file, so we don't fetch them
// dynamically.  We still call setActiveNav() to highlight the current page
// and setupMobileNav() to control the mobile hamburger menu.
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupMobileNav();
});