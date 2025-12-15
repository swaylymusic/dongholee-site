async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url);
  const html = await res.text();
  el.innerHTML = html;
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  const link = document.querySelector(
    `.main-nav a[data-nav="${page}"]`
  );
  if (link) link.classList.add("active");
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Header / Footer 로드
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");

  // 2. active 메뉴 표시
  setActiveNav();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");

  // 3. 햄버거 토글
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }

  // ✅ 4. 메뉴 클릭 시 닫기 (이게 핵심)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
    });
  });
});
