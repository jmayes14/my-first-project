#!/usr/bin/env node
// Minimal read-only Sayari MCP server (stdio, no dependencies).
// Credentials come from SAYARI_CLIENT_ID / SAYARI_CLIENT_SECRET env vars.
import readline from "node:readline";

const API = "https://api.sayari.com";
const MAX_CHARS = 20000;
let token = null;
let tokenExpires = 0;

async function getToken() {
  if (token && Date.now() < tokenExpires) return token;
  const res = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.SAYARI_CLIENT_ID,
      client_secret: process.env.SAYARI_CLIENT_SECRET,
      audience: "sayari.com",
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`Sayari auth failed: HTTP ${res.status}`);
  const body = await res.json();
  token = body.access_token;
  tokenExpires = Date.now() + ((body.expires_in ?? 3600) - 60) * 1000;
  return token;
}

async function call(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${await getToken()}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Sayari API HTTP ${res.status}: ${text.slice(0, 500)}`);
  return text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) + "\n…[truncated]" : text;
}

const tools = {
  search_entity: {
    description: "Search Sayari entities (companies, people, vessels...) by name/keyword. Optional filter e.g. {\"country\":[\"CHN\"],\"entity_type\":[\"company\"]}.",
    schema: {
      type: "object",
      properties: {
        q: { type: "string" },
        filter: { type: "object" },
        limit: { type: "integer", maximum: 50 },
      },
      required: ["q"],
    },
    run: ({ q, filter, limit = 10 }) =>
      call("POST", "/v1/search/entity", { q, filter, limit }),
  },
  get_entity: {
    description: "Get a Sayari entity profile by entity id.",
    schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
    run: ({ id }) => call("GET", `/v1/entity/${encodeURIComponent(id)}`),
  },
  search_suppliers: {
    description: "Trade search: suppliers (exporters). filter keys include hs_code, departure_country, arrival_country, arrival_date (ISO 3166 alpha-3 countries).",
    schema: {
      type: "object",
      properties: { q: { type: "string" }, filter: { type: "object" }, limit: { type: "integer", maximum: 50 } },
    },
    run: ({ q, filter, limit = 10 }) =>
      call("POST", "/v1/trade/search/suppliers", { q, filter, limit }),
  },
  search_shipments: {
    description: "Trade search: individual shipments. Same filters as search_suppliers.",
    schema: {
      type: "object",
      properties: { q: { type: "string" }, filter: { type: "object" }, limit: { type: "integer", maximum: 50 } },
    },
    run: ({ q, filter, limit = 10 }) =>
      call("POST", "/v1/trade/search/shipments", { q, filter, limit }),
  },
};

const send = (msg) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");

async function handle(msg) {
  const { id, method, params } = msg;
  if (id === undefined) return; // notifications
  try {
    if (method === "initialize") {
      return send({
        id,
        result: {
          protocolVersion: params?.protocolVersion ?? "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "sayari", version: "0.1.0" },
        },
      });
    }
    if (method === "tools/list") {
      return send({
        id,
        result: {
          tools: Object.entries(tools).map(([name, t]) => ({
            name,
            description: t.description,
            inputSchema: t.schema,
          })),
        },
      });
    }
    if (method === "tools/call") {
      const tool = tools[params.name];
      if (!tool) return send({ id, error: { code: -32602, message: "Unknown tool" } });
      try {
        const text = await tool.run(params.arguments ?? {});
        return send({ id, result: { content: [{ type: "text", text }] } });
      } catch (e) {
        return send({ id, result: { isError: true, content: [{ type: "text", text: String(e.message) }] } });
      }
    }
    if (method === "ping") return send({ id, result: {} });
    send({ id, error: { code: -32601, message: "Method not found" } });
  } catch (e) {
    send({ id, error: { code: -32603, message: String(e.message) } });
  }
}

readline.createInterface({ input: process.stdin }).on("line", (line) => {
  try {
    handle(JSON.parse(line));
  } catch {
    /* ignore malformed input */
  }
});
