async function maybeVerifyWithHuggingFace({ email, config }) {
  if (!config.apiKey) {
    return null;
  }

  const response = await fetch(
    `https://router.huggingface.co/hf-inference/models/${config.verifierModel}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `${email.subject}\n${email.body}`,
        parameters: {
          candidate_labels: [
            "real opportunity",
            "promotional spam",
            "administrative notice",
            "mixed admin plus opportunity",
          ],
          multi_label: true,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face verifier failed with ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || !Array.isArray(payload.labels) || !Array.isArray(payload.scores)) {
    return null;
  }

  const labels = payload.labels.map((label, index) => ({
    label,
    score: Number(payload.scores[index] || 0),
  }));
  const topLabel = labels.slice().sort((a, b) => b.score - a.score)[0];

  return {
    topLabel: topLabel ? topLabel.label : "promotional spam",
    confidence: topLabel ? topLabel.score : 0.5,
    labels,
  };
}

module.exports = { maybeVerifyWithHuggingFace };
