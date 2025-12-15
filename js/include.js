// include.js
// Header / Footer include + Mobile nav control
// Compatible with GitHub Pages + Cloudflare

async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  const link = document.querySelector(
    `.main-nav a[data-nav="${page}"]`
  );
  if (link) link.classList.add("active");
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (!header || !toggle) return;

  // 햄버거 버튼: 열기 / 닫기
  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  // 메뉴 클릭 시 자동 닫힘 (모바일 UX 핵심)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
    });
  });

  // 화면 리사이즈 시 (모바일 → 데스크톱) 상태 초기화
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      header.classList.remove("nav-open");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // header / footer 로드
  await loadPartial("#header", "/partials/header.html");
  await loadPartial("#footer", "/partials/footer.html");

  // header가 DOM에 들어온 뒤 실행해야 함
  setActiveNav();
  setupMobileNav();
});
