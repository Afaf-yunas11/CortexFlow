
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve static frontend
app.use(express.static(path.join(__dirname)));

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// Catch-all (for frontend routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




const http = require("http");
const fs = require("fs");
const path = require("path");
const { loadConfig } = require("./backend/config");
const {
  createProviders,
  analyzeInboxPayload,
  parseEmailBlocks,
} = require("./backend/pipeline");

const config = loadConfig();
const providers = createProviders(config);
const rootDir = __dirname;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { error: "File not found." });
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function getRuntimePayload() {
  return {
    mode: config.gemini.apiKey ? "backend-ready" : "local-heuristics",
    stack: {
      orchestration: {
        provider: "Gemini",
        enabled: Boolean(config.gemini.apiKey),
        model: config.gemini.agentModel || null,
      },
      verifier: {
        provider: "Hugging Face",
        enabled: Boolean(config.huggingFace.apiKey),
        model: config.huggingFace.verifierModel,
      },
      langchain: {
        enabled: config.langchain.enabled && config.langchain.packagesInstalled,
        status:
          config.langchain.enabled && config.langchain.packagesInstalled
            ? "LangChain is active on top of Gemini extraction."
            : config.langchain.packagesInstalled
              ? "LangChain packages are installed. Set LANGCHAIN_ENABLED=true to activate."
              : "LangChain packages are not installed yet.",
      },
    },
  };
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, 400, { error: "Missing URL." });
    return;
  }

  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && req.url === "/api/runtime") {
    sendJson(res, 200, getRuntimePayload());
    return;
  }

  if (req.method === "POST" && req.url === "/api/analyze") {
    try {
      const rawBody = await readBody(req);
      const parsedBody = JSON.parse(rawBody || "{}");
      const emails = Array.isArray(parsedBody.emails)
        ? parsedBody.emails
        : parseEmailBlocks(String(parsedBody.rawEmails || ""));

      const analysis = await analyzeInboxPayload({
        emails,
        profile: parsedBody.profile || {},
        weights: parsedBody.weights || {},
        providers,
      });

      sendJson(res, 200, analysis);
      return;
    } catch (error) {
      sendJson(res, 500, {
        error: "Analysis failed.",
        detail: error instanceof Error ? error.message : String(error),
      });
      return;
    }
  }

  const safePath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(rootDir, safePath.replace(/^\/+/, ""));

  if (!filePath.startsWith(rootDir)) {
    sendJson(res, 403, { error: "Forbidden path." });
    return;
  }

  sendFile(res, filePath);
});

server.listen(config.port, () => {
  console.log(`Opportunity Orbit server running on http://localhost:${config.port}`);
});
