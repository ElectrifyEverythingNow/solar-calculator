// Vote tracking API — uses Cloudflare KV namespace "VOTES"
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { tool } = await request.json();
    if (!tool || typeof tool !== "string" || tool.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid tool ID" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const current = parseInt(await env.VOTES.get(tool) || "0", 10);
    await env.VOTES.put(tool, String(current + 1));
    return new Response(JSON.stringify({ success: true, tool, votes: current + 1 }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const list = await env.VOTES.list();
    const votes = {};
    for (const key of list.keys) {
      const val = await env.VOTES.get(key.name);
      votes[key.name] = parseInt(val || "0", 10);
    }
    return new Response(JSON.stringify({ votes }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
