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
  // Header와 Footer를 로드합니다.
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");
  
  // Header 로드 후, 현재 페이지 활성화 클래스를 적용합니다.
  setActiveNav();

  /* Mobile hamburger toggle - 하나의 리스너만 등록 */
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }
});
