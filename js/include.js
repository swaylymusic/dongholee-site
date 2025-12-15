async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (res.ok) {
      el.innerHTML = await res.text();
    }
  } catch (err) {
    console.error(`Error loading ${url}:`, err);
  }
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  const link = document.querySelector(`.main-nav a[data-nav="${page}"]`);
  if (link) link.classList.add("active");
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1. 헤더/푸터 불러오기
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");

  // 2. 현재 페이지 활성화
  setActiveNav();
});

// 🔥 핵심 수정: 이벤트 위임 (Event Delegation)
// 헤더가 늦게 로딩되어도 클릭 이벤트를 확실하게 잡습니다.
document.addEventListener("click", (e) => {
  // 클릭한 요소가 .nav-toggle 버튼이거나 그 안의 span이면
  const toggleBtn = e.target.closest(".nav-toggle");
  
  if (toggleBtn) {
    const header = document.querySelector(".site-header");
    if (header) {
      header.classList.toggle("open");
    }
  }
});
