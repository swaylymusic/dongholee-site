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
  // 1. Header와 Footer를 먼저 로드합니다.
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");
  
  // 2. 로드가 끝난 후 현재 페이지 표시(밑줄)를 합니다.
  setActiveNav();

  // 3. Header가 로딩된 후에 햄버거 버튼 이벤트를 등록합니다.
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      // open 클래스를 넣었다 뺐다(토글) 합니다.
      header.classList.toggle("open");
    });
  }
});
