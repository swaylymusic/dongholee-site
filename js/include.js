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
  // 1. Header 및 Footer 불러오기
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");
  
  // Header 로드 후, .site-header가 DOM에 추가되므로 이제 setActiveNav를 호출합니다.
  setActiveNav(); 

  // 2. 모바일 햄버거 토글 기능 (Header 로드 후 실행)
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      // 햄버거 메뉴를 열고 닫는 핵심 로직입니다.
      header.classList.toggle("open");
    });
  }
});
