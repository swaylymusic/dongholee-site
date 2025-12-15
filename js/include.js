// include.js (수정된 최종 버전)

async function loadPartial(selector, url, setupToggle = false) { // setupToggle 인자 추가
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url);
  const html = await res.text();
  el.innerHTML = html;

  // Header 로드가 완료된 직후에 토글 기능을 등록합니다.
  if (setupToggle && selector === "#header") {
    const toggle = document.querySelector(".nav-toggle");
    const header = document.querySelector(".site-header");

    if (toggle && header) {
      toggle.addEventListener("click", () => {
        header.classList.toggle("open");
      });
    }
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

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Header 불러오기 (토글 기능 설정을 true로 전달)
  await loadPartial("#header", "partials/header.html", true); 
  
  // 2. Footer 불러오기
  await loadPartial("#footer", "partials/footer.html"); 

  // 3. 현재 페이지 활성화 (Header 로드 후 호출)
  setActiveNav(); 
});
