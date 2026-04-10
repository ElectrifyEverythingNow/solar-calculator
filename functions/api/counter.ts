interface Env {
  COUNTER_KV: KVNamespace;
}

const KEY = "calc-uses";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const count = await context.env.COUNTER_KV.get(KEY);
  return Response.json(
    { count: Number(count) || 0 },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const current = Number(await context.env.COUNTER_KV.get(KEY)) || 0;
  const next = current + 1;
  await context.env.COUNTER_KV.put(KEY, String(next));
  return Response.json(
    { count: next },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
};
