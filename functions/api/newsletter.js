const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
const SUBSCRIPTION_ENDPOINT = "https://donghotheagent.com/api/subscribe";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

async function parsePayload(request) {
  if ((request.headers.get("content-type") || "").includes("application/json")) return request.json();
  return Object.fromEntries((await request.formData()).entries());
}

export async function onRequestPost({ request }) {
  let payload;
  try {
    payload = await parsePayload(request);
  } catch {
    return jsonResponse({ message: "올바르지 않은 요청입니다." }, 400);
  }

  const response = await fetch(SUBSCRIPTION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://dongholee.ca",
    },
    body: JSON.stringify({
      ...payload,
      source: payload.source || "dongholee_ca",
    }),
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: JSON_HEADERS,
  });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export function onRequestGet() {
  return jsonResponse({ message: "Method not allowed." }, 405);
}
