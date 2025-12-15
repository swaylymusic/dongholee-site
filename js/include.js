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
  // 1️⃣ header / footer 로드
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");

  // 2️⃣ active 메뉴 처리
  setActiveNav();

  // 3️⃣ 햄버거 버튼
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }

  // 4️⃣ ✅ 메뉴 클릭 시 자동 닫힘 (여기가 핵심)
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
    });
  });
});
