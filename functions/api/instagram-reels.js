const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
const INSTAGRAM_ORIGIN = "https://graph.instagram.com";

function jsonResponse(body, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, "Cache-Control": cacheControl },
  });
}

export async function onRequestGet({ env }) {
  const accessToken = env.INSTAGRAM_ACCESS_TOKEN;
  const instagramUserId = env.INSTAGRAM_USER_ID;
  const apiVersion = env.INSTAGRAM_GRAPH_API_VERSION;

  if (!accessToken || !instagramUserId || !apiVersion) {
    return jsonResponse({ message: "Instagram feed is not configured.", reels: [] }, 503);
  }

  if (!/^v\d+\.\d+$/.test(apiVersion)) {
    return jsonResponse({ message: "Instagram feed is unavailable.", reels: [] }, 503);
  }

  const mediaUrl = new URL(`${apiVersion}/${encodeURIComponent(instagramUserId)}/media`, `${INSTAGRAM_ORIGIN}/`);
  mediaUrl.searchParams.set("fields", "media_type,media_product_type,permalink,timestamp");
  mediaUrl.searchParams.set("limit", "25");

  try {
    const reels = [];
    let nextUrl = mediaUrl;

    // Scan a few pages so frequent photo posts do not hide the latest Reels.
    for (let page = 0; page < 5 && nextUrl && reels.length < 3; page += 1) {
      const response = await fetch(nextUrl, {
        headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
        cf: { cacheTtl: 1800, cacheEverything: true },
      });

      if (!response.ok) {
        return jsonResponse({ message: "Instagram feed is temporarily unavailable.", reels: [] }, 502);
      }

      const payload = await response.json();
      for (const media of Array.isArray(payload.data) ? payload.data : []) {
        if (media.media_product_type === "REELS" && typeof media.permalink === "string") {
          reels.push({ permalink: media.permalink, timestamp: media.timestamp });
        }
      }

      const candidate = payload.paging?.next;
      try {
        const parsedNext = new URL(candidate);
        nextUrl = parsedNext.origin === INSTAGRAM_ORIGIN ? parsedNext : null;
      } catch {
        nextUrl = null;
      }
    }

    reels.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

    return jsonResponse({ reels: reels.slice(0, 3) }, 200, "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600");
  } catch {
    return jsonResponse({ message: "Instagram feed is temporarily unavailable.", reels: [] }, 502);
  }
}

export function onRequestPost() {
  return jsonResponse({ message: "Method not allowed." }, 405);
}
