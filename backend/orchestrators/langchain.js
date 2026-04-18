function extractTextFromMessage(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (part && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("")
      .trim();
  }

  return "";
}

function stripCodeFence(text) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

async function maybeExtractWithLangChain({ email, profile, config, langchain }) {
  if (!config.apiKey || !config.agentModel || !langchain.enabled || !langchain.packagesInstalled) {
    return null;
  }

  const [{ ChatGoogleGenerativeAI }, { HumanMessage }] = await Promise.all([
    import("@langchain/google-genai"),
    import("@langchain/core/messages"),
  ]);

  const model = new ChatGoogleGenerativeAI({
    apiKey: config.apiKey,
    model: config.agentModel,
    temperature: 0.1,
  });

  const prompt = [
    "You are a LangChain-powered extraction agent for student opportunity emails.",
    "Return strict JSON only with the keys:",
    "type, deadline, minimumCgpa, documents, location, benefits, summary.",
    `Student profile: ${JSON.stringify(profile)}`,
    `Email: ${JSON.stringify(email)}`,
  ].join("\n");

  const response = await model.invoke([new HumanMessage(prompt)]);
  const textOutput = stripCodeFence(extractTextFromMessage(response.content));

  if (!textOutput) {
    return null;
  }

  try {
    return JSON.parse(textOutput);
  } catch (error) {
    return null;
  }
}

module.exports = { maybeExtractWithLangChain };
