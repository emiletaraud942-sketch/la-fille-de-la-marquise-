export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    const url  = "https://api.github.com/gists/" + env.GIST_ID;
    const body = request.method === "PATCH" ? await request.text() : undefined;
    const resp = await fetch(url, {
      method:  request.method,
      headers: {
        "Authorization": "Bearer " + env.GITHUB_TOKEN,
        "Accept":        "application/vnd.github+json",
        "Content-Type":  "application/json",
        "User-Agent":    "Marquise-Worker",
      },
      body,
    });
    return new Response(await resp.text(), {
      status:  resp.status,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
};
