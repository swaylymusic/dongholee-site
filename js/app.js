const GA_MEASUREMENT_ID = 'G-H1TPFXTMXJ';
const CROSS_DOMAIN_SITES = ['dongholee.ca', 'donghotheagent.com'];

initializeAnalytics();

function initializeAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    linker: {
      domains: CROSS_DOMAIN_SITES,
    },
  });

  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(analyticsScript);
}

// Navigation toggling and active link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(header.classList.contains('open')));
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        header.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Highlight active nav based on body data-page attribute
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(`.main-nav a[data-nav="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  loadLatestRealEstatePosts();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const targetUrl = new URL(link.href, window.location.href);
    const isCrossSiteLink = CROSS_DOMAIN_SITES.includes(targetUrl.hostname)
      && targetUrl.hostname !== window.location.hostname;

    if (isCrossSiteLink) {
      window.gtag?.('event', 'cross_site_navigation', {
        link_url: targetUrl.href,
        link_text: link.textContent?.trim().replace(/\s+/g, ' ') || '',
        destination_domain: targetUrl.hostname,
      });
    }
  });
});

const LATEST_POSTS_URL = 'https://donghotheagent.com/latest-posts.json';
const REAL_ESTATE_ORIGIN = 'https://donghotheagent.com';

async function loadLatestRealEstatePosts() {
  const container = document.querySelector('[data-latest-posts]');
  if (!container) return;

  try {
    const response = await fetch(LATEST_POSTS_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`Latest posts request failed: ${response.status}`);

    const payload = await response.json();
    const posts = Array.isArray(payload.posts) ? payload.posts.slice(0, 3) : [];
    if (posts.length === 0) throw new Error('No published posts returned');

    const fragment = document.createDocumentFragment();
    posts.forEach((post) => fragment.append(createInsightCard(post)));
    container.replaceChildren(fragment);
  } catch (error) {
    console.warn('Could not load the latest real estate posts.', error);
    const fallback = document.createElement('p');
    fallback.className = 'insights-fallback';
    fallback.append('최신 글을 불러오지 못했습니다. ');

    const link = document.createElement('a');
    link.href = `${REAL_ESTATE_ORIGIN}/blog/`;
    link.textContent = '부동산 블로그에서 확인하기 →';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    fallback.append(link);
    container.replaceChildren(fallback);
  } finally {
    container.setAttribute('aria-busy', 'false');
  }
}

function createInsightCard(post) {
  const postUrl = new URL(post.url, REAL_ESTATE_ORIGIN);
  if (postUrl.origin !== REAL_ESTATE_ORIGIN) {
    throw new Error('Unexpected post origin');
  }

  const article = document.createElement('article');
  article.className = 'insight-card';

  if (post.featuredImage) {
    const imageUrl = new URL(post.featuredImage, REAL_ESTATE_ORIGIN);
    if (imageUrl.origin === REAL_ESTATE_ORIGIN) {
      const imageLink = document.createElement('a');
      imageLink.className = 'insight-card-image';
      imageLink.href = postUrl.href;
      imageLink.target = '_blank';
      imageLink.rel = 'noopener noreferrer';

      const image = document.createElement('img');
      image.src = imageUrl.href;
      image.alt = post.imageAlt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      imageLink.append(image);
      article.append(imageLink);
    }
  }

  const body = document.createElement('div');
  body.className = 'insight-card-body';

  const meta = document.createElement('p');
  meta.className = 'insight-meta';
  const date = new Date(post.pubDate);
  const dateText = Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('ko-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      }).format(date);
  meta.textContent = [dateText, post.category].filter(Boolean).join(' · ');

  const heading = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = postUrl.href;
  titleLink.textContent = post.title || 'Real estate insight';
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  heading.append(titleLink);

  const description = document.createElement('p');
  description.className = 'insight-description';
  description.textContent = post.description || '';

  const readMore = document.createElement('a');
  readMore.className = 'text-link';
  readMore.href = postUrl.href;
  readMore.textContent = 'Read article →';
  readMore.target = '_blank';
  readMore.rel = 'noopener noreferrer';

  body.append(meta, heading, description, readMore);
  article.append(body);
  return article;
}
