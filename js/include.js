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
  await loadPartial("#header", "partials/header.html");
  await loadPartial("#footer", "partials/footer.html");
  setActiveNav();

});
<script>
document.querySelector(".nav-toggle")
  .addEventListener("click", () => {
    document.querySelector(".site-header")
      .classList.toggle("open");
  });
</script>
