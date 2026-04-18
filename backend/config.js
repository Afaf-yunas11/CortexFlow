const fs = require("fs");
const path = require("path");

function hasPackage(name) {
  try {
    require.resolve(name, { paths: [process.cwd()] });
    return true;
  } catch (error) {
    return false;
  }
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const values = {};

  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    values[key] = value;
  }

  return values;
}

function loadConfig() {
  const envPath = path.join(process.cwd(), ".env");
  const fileEnv = parseEnvFile(envPath);
  const env = { ...fileEnv, ...process.env };

  return {
    port: Number(env.PORT || 3000),
    gemini: {
      apiKey: env.GEMINI_API_KEY || "",
      agentModel: env.GEMINI_AGENT_MODEL || "gemini-2.5-flash",
    },
    huggingFace: {
      apiKey: env.HUGGINGFACE_API_KEY || "",
      verifierModel: env.HUGGINGFACE_VERIFIER_MODEL || "facebook/bart-large-mnli",
    },
    langchain: {
      enabled: String(env.LANGCHAIN_ENABLED || "true").toLowerCase() === "true",
      packagesInstalled:
        hasPackage("@langchain/core") && hasPackage("@langchain/google-genai"),
    },
  };
}

module.exports = { loadConfig };
