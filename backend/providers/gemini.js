async function maybeExtractWithGemini({ email, profile, config }) {
  if (!config.apiKey || !config.agentModel) {
    return null;
  }

  const prompt = [
    "You are an extraction agent for student opportunity emails.",
    "Return strict JSON only with the keys:",
    "type, deadline, minimumCgpa, documents, location, benefits, summary.",
    `Student profile: ${JSON.stringify(profile)}`,
    `Email: ${JSON.stringify(email)}`,
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${config.agentModel}:generateContent?key=${config.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini extraction failed with ${response.status}`);
  }

  const payload = await response.json();
  const textOutput =
    payload.candidates &&
    payload.candidates[0] &&
    payload.candidates[0].content &&
    Array.isArray(payload.candidates[0].content.parts)
      ? payload.candidates[0].content.parts
          .map((part) => part.text || "")
          .join("")
          .trim()
      : "";

  if (!textOutput) {
    return null;
  }

  try {
    return JSON.parse(textOutput);
  } catch (error) {
    return null;
  }
}

module.exports = { maybeExtractWithGemini };
