export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const list = await env.SUBSCRIBERS.list();
    const subscribers = [];
    for (const key of list.keys) {
      const val = await env.SUBSCRIBERS.get(key.name);
      if (val) {
        try { subscribers.push(JSON.parse(val)); }
        catch { subscribers.push({ email: key.name, subscribedAt: "unknown" }); }
      }
    }
    subscribers.sort((a, b) => (b.subscribedAt || "").localeCompare(a.subscribedAt || ""));
    return new Response(JSON.stringify({ count: subscribers.length, subscribers }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
