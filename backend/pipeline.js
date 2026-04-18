const { maybeExtractWithGemini } = require("./providers/gemini");
const { maybeVerifyWithHuggingFace } = require("./providers/huggingface");
const { maybeExtractWithLangChain } = require("./orchestrators/langchain");

const opportunityKeywords = [
  "scholarship",
  "internship",
  "fellowship",
  "competition",
  "grant",
  "admission",
  "research",
  "program",
  "challenge",
  "apply",
  "stipend",
  "assistant",
  "opening",
  "summer school",
  "support fund",
  "funding",
  "call for proposals",
  "cohort",
];

const spamKeywords = [
  "commission",
  "referral",
  "sell",
  "promoting",
  "premium study bundles",
  "sign-up bonus",
  "marketing",
  "discount",
  "coupon",
  "promo",
  "cash rewards",
  "buy one",
  "premium accelerator",
  "voucher",
];

const typeKeywords = {
  scholarship: ["scholarship", "grant", "tuition"],
  internship: ["internship", "summer internship"],
  fellowship: ["fellowship", "research fellowship"],
  competition: ["competition", "challenge", "prize"],
  admission: ["admission", "admissions"],
  research: ["research", "lab", "assistant"],
};

function createProviders(config) {
  return {
    gemini: {
      config: config.gemini,
      extract: maybeExtractWithGemini,
    },
    huggingFace: {
      config: config.huggingFace,
      verify: maybeVerifyWithHuggingFace,
    },
    langchain: config.langchain,
  };
}

function parseEmailBlocks(raw) {
  return String(raw || "")
    .split(/\n===\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const subjectMatch = chunk.match(/Subject:\s*(.*)/i);
      const fromMatch = chunk.match(/From:\s*(.*)/i);
      const bodyMatch = chunk.match(/Body:\s*([\s\S]*)/i);

      return {
        subject: subjectMatch ? subjectMatch[1].trim() : "Untitled email",
        from: fromMatch ? fromMatch[1].trim() : "unknown sender",
        body: bodyMatch ? bodyMatch[1].trim() : chunk,
      };
    });
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeProfile(profile) {
  return {
    program: String(profile.program || "").toLowerCase(),
    semester: Number(profile.semester || 0),
    cgpa: Number(profile.cgpa || 0),
    skills: Array.isArray(profile.skills) ? profile.skills : splitList(profile.skills),
    types: Array.isArray(profile.types) ? profile.types : splitList(profile.types),
    location: String(profile.location || "").toLowerCase(),
    financialNeed: String(profile.financialNeed || "").toLowerCase(),
    experience: String(profile.experience || "").toLowerCase(),
  };
}

function normalizeWeights(weights) {
  return {
    urgency: Number(weights.urgency || 1.2),
    fit: Number(weights.fit || 1.3),
    support: Number(weights.support || 1.1),
  };
}

function detectOpportunity(email) {
  const combined = `${email.subject} ${email.body}`.toLowerCase();
  const opportunityHits = opportunityKeywords.filter((keyword) =>
    combined.includes(keyword)
  );
  const spamHits = spamKeywords.filter((keyword) => combined.includes(keyword));
  const confidence = Math.max(
    0.05,
    Math.min(0.98, 0.35 + opportunityHits.length * 0.13 - spamHits.length * 0.18)
  );

  return {
    isOpportunity: opportunityHits.length > spamHits.length && opportunityHits.length > 0,
    confidence,
    opportunityHits,
    spamHits,
  };
}

function inferType(text) {
  const lowered = text.toLowerCase();
  for (const [type, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some((keyword) => lowered.includes(keyword))) {
      return type;
    }
  }
  return "opportunity";
}

function normalizeDate(rawDate) {
  const cleaned = rawDate.replace(/\s+/g, " ").trim();
  const parsed = new Date(cleaned);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const flipped = cleaned.replace(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/, "$2 $1, $3");
  const parsedFlipped = new Date(flipped);
  if (Number.isNaN(parsedFlipped.getTime())) {
    return cleaned;
  }

  return parsedFlipped.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function extractDeadline(text) {
  const patterns = [
    /\b(?:deadline|closes?|submit by|apply by)\s*[:\-]?\s*([A-Za-z]+\s+\d{1,2},\s*\d{4})/i,
    /\b(?:deadline|closes?|submit by|apply by)\s*[:\-]?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i,
    /\b([A-Za-z]+\s+\d{1,2},\s*\d{4})\b/,
    /\b(\d{1,2}\s+[A-Za-z]+\s+\d{4})\b/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return normalizeDate(match[1]);
    }
  }
  return null;
}

function parseMinimumCgpa(text) {
  const match = text.match(/cgpa\s*(?:of|:|preferred)?\s*(\d\.\d{1,2}|\d)/i);
  return match ? Number(match[1]) : null;
}

function extractDocuments(text) {
  const docKeywords = [
    "cv",
    "resume",
    "transcript",
    "statement of purpose",
    "personal statement",
    "recommendation letter",
    "passport",
    "pitch deck",
    "demo video",
    "team roster",
    "proof of need",
    "faculty endorsement",
    "budget note",
    "proposal abstract",
    "supervisor note",
  ];

  return docKeywords.filter((keyword) => text.toLowerCase().includes(keyword));
}

function extractLocation(text) {
  const lowered = text.toLowerCase();
  if (lowered.includes("remote")) return "remote";
  if (lowered.includes("pakistan")) return "pakistan";
  if (lowered.includes("canada")) return "canada";
  if (lowered.includes("international") || lowered.includes("global")) return "global";
  return "not specified";
}

function extractBenefits(text) {
  const lowered = text.toLowerCase();
  const benefits = [];
  if (lowered.includes("paid")) benefits.push("Paid opportunity");
  if (lowered.includes("tuition")) benefits.push("Tuition support");
  if (lowered.includes("mentorship")) benefits.push("Mentorship");
  if (lowered.includes("prize")) benefits.push("Cash prize");
  if (lowered.includes("incubation")) benefits.push("Incubation");
  if (lowered.includes("press")) benefits.push("Visibility");
  if (lowered.includes("funding")) benefits.push("Funding");
  if (lowered.includes("stipend")) benefits.push("Stipend support");
  return benefits;
}

function daysUntil(dateLabel) {
  if (!dateLabel) return null;
  const parsed = new Date(dateLabel);
  if (Number.isNaN(parsed.getTime())) return null;
  const today = new Date("2026-04-18T00:00:00");
  return Math.ceil((parsed.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function runHeuristicExtraction(email) {
  const combined = `${email.subject} ${email.body}`;
  const deadline = extractDeadline(combined);
  return {
    type: inferType(combined),
    deadline,
    minimumCgpa: parseMinimumCgpa(combined),
    documents: extractDocuments(combined),
    location: extractLocation(combined),
    benefits: extractBenefits(combined),
    urgencyDays: daysUntil(deadline),
  };
}

function runHeuristicVerifier(email, triageResult, extractionResult) {
  const combined = `${email.subject} ${email.body}`.toLowerCase();
  const adminSignals = ["reminder", "parking", "sticker", "notice", "renew"];
  const adminHits = adminSignals.filter((keyword) => combined.includes(keyword)).length;
  const spamHits = spamKeywords.filter((keyword) => combined.includes(keyword)).length;
  const hiddenOpportunitySignals = [
    "poster-print support",
    "support fund",
    "faculty endorsement",
    "research assistant",
    "stipend support",
    "travel scholarships",
  ].filter((keyword) => combined.includes(keyword)).length;
  const deadlineHeavy = extractionResult.deadline && extractionResult.documents.length >= 2;

  let topLabel = "promotional spam";
  if (triageResult.isOpportunity || hiddenOpportunitySignals > 0) {
    topLabel =
      adminHits > 0 && hiddenOpportunitySignals > 0
        ? "mixed admin plus opportunity"
        : "real opportunity";
  } else if (adminHits > 0 && spamHits === 0) {
    topLabel = "administrative notice";
  }

  const confidence = Math.max(
    0.2,
    Math.min(
      0.99,
      triageResult.confidence +
        (deadlineHeavy ? 0.08 : 0) +
        (adminHits > 0 ? 0.04 : 0) +
        (hiddenOpportunitySignals > 0 ? 0.08 : 0) -
        Math.min(0.18, spamHits * 0.04)
    )
  );

  return {
    topLabel,
    confidence,
    labels: [
      { label: topLabel, score: confidence },
      {
        label: deadlineHeavy ? "deadline-heavy" : "general notice",
        score: Math.max(0.18, confidence - 0.16),
      },
      {
        label: topLabel === "promotional spam" ? "real opportunity" : "promotional spam",
        score: Math.max(0.05, 1 - confidence - 0.08),
      },
    ],
  };
}

function buildChecklist(type, documents, urgencyDays) {
  const checklist = [];
  if (urgencyDays !== null && urgencyDays <= 4) {
    checklist.push("Prioritize this application today because the deadline is close.");
  }
  checklist.push(`Confirm the ${type} eligibility criteria line by line.`);
  checklist.push(
    documents.length > 0
      ? `Prepare the required documents: ${documents.join(", ")}.`
      : "Verify missing requirements from the original email before applying."
  );
  checklist.push("Open the official link or contact address and draft the submission plan.");
  return checklist;
}

function runRanking(email, profile, weights, triageResult, extractionResult, verifierResult) {
  const combined = `${email.subject} ${email.body}`.toLowerCase();
  let score = 20;
  const evidence = [];

  if (triageResult.isOpportunity) {
    score += 25;
    evidence.push("Detected as a genuine opportunity");
  } else {
    score -= 30;
    evidence.push("Looks more promotional than opportunity-focused");
  }

  if (profile.types.includes(extractionResult.type)) {
    score += Math.round(14 * weights.fit);
    evidence.push(`Matches preferred type: ${extractionResult.type}`);
  }

  if (extractionResult.minimumCgpa !== null) {
    if (profile.cgpa >= extractionResult.minimumCgpa) {
      score += Math.round(12 * weights.fit);
      evidence.push(`CGPA requirement met (${extractionResult.minimumCgpa}+ needed)`);
    } else {
      score -= 18;
      evidence.push(`CGPA below requirement (${extractionResult.minimumCgpa}+ needed)`);
    }
  } else {
    score += 4;
  }

  const skillMatches = profile.skills.filter((skill) => combined.includes(skill));
  if (skillMatches.length > 0) {
    score += Math.round(Math.min(16, skillMatches.length * 5) * weights.fit);
    evidence.push(`Skill overlap: ${skillMatches.join(", ")}`);
  }

  if (
    profile.financialNeed === "high" &&
    /scholarship|grant|tuition|stipend|paid/i.test(combined)
  ) {
    score += Math.round(12 * weights.support);
    evidence.push("Strong financial support potential");
  }

  if (profile.location === "remote" && extractionResult.location === "remote") {
    score += Math.round(8 * weights.fit);
  } else if (profile.location === "pakistan" && extractionResult.location === "pakistan") {
    score += Math.round(8 * weights.fit);
  } else if (
    profile.location === "global" &&
    ["canada", "global"].includes(extractionResult.location)
  ) {
    score += Math.round(8 * weights.fit);
  }

  if (extractionResult.urgencyDays !== null) {
    if (extractionResult.urgencyDays <= 4) score += Math.round(16 * weights.urgency);
    else if (extractionResult.urgencyDays <= 10) score += Math.round(10 * weights.urgency);
    else score += Math.round(5 * weights.urgency);
  }

  if (extractionResult.documents.length > 0) {
    score += 6;
  } else {
    score -= 4;
  }

  if (verifierResult.topLabel === "real opportunity") {
    score += Math.round(verifierResult.confidence * 10);
  } else {
    score -= Math.round((1 - verifierResult.confidence) * 8);
  }

  return {
    ...email,
    type: extractionResult.type,
    deadline: extractionResult.deadline,
    location: extractionResult.location,
    minimumCgpa: extractionResult.minimumCgpa,
    documents: extractionResult.documents,
    benefits: extractionResult.benefits,
    urgencyDays: extractionResult.urgencyDays,
    score: Math.max(0, Math.min(100, score)),
    evidence: evidence.slice(0, 5),
    detection: triageResult,
    verifier: verifierResult,
    extractionMeta: extractionResult.meta || {
      source: "heuristic",
      model: null,
      summary: "",
    },
    verifierMeta: verifierResult.meta || {
      source: "heuristic",
      model: null,
    },
    nextSteps: buildChecklist(
      extractionResult.type,
      extractionResult.documents,
      extractionResult.urgencyDays
    ),
  };
}

async function analyzeInboxPayload({ emails, profile, weights, providers }) {
  const safeProfile = normalizeProfile(profile);
  const safeWeights = normalizeWeights(weights);
  const traces = [];
  const results = [];

  for (const email of emails) {
    const triageResult = detectOpportunity(email);
    traces.push({
      agent: "triage",
      subject: email.subject,
      message: triageResult.isOpportunity
        ? "Opportunity signals were stronger than spam signals."
        : "This looks like admin or promotional noise.",
    });

    const heuristicExtraction = runHeuristicExtraction(email);
    const langchainExtraction = await maybeExtractWithLangChain({
      email,
      profile: safeProfile,
      config: providers.gemini.config,
      langchain: providers.langchain,
    });
    const providerExtraction =
      langchainExtraction ||
      (await providers.gemini.extract({
      email,
      profile: safeProfile,
      config: providers.gemini.config,
    }));
    const extractionResult = {
      ...heuristicExtraction,
      ...(providerExtraction || {}),
      meta: {
        source: langchainExtraction
          ? "langchain-gemini"
          : providerExtraction
            ? "gemini"
            : "heuristic",
        model: providerExtraction ? providers.gemini.config.agentModel || null : null,
        summary:
          providerExtraction && typeof providerExtraction.summary === "string"
            ? providerExtraction.summary
            : "",
      },
      urgencyDays: daysUntil(
        providerExtraction && providerExtraction.deadline
          ? providerExtraction.deadline
          : heuristicExtraction.deadline
      ),
    };

    traces.push({
      agent: "extractor",
      subject: email.subject,
      message: `Extracted ${extractionResult.type} with ${
        extractionResult.documents.length
      } document clues via ${
        langchainExtraction ? "LangChain + Gemini" : providerExtraction ? "Gemini" : "heuristics"
      }.`,
    });

    const providerVerifier = await providers.huggingFace.verify({
        email,
        config: providers.huggingFace.config,
      });
    const verifierResult = providerVerifier || runHeuristicVerifier(email, triageResult, extractionResult);
    verifierResult.meta = {
      source: providerVerifier ? "huggingface" : "heuristic",
      model: providerVerifier ? providers.huggingFace.config.verifierModel : null,
    };

    traces.push({
      agent: "verifier",
      subject: email.subject,
      message: `Top label ${verifierResult.topLabel} at ${Math.round(
        verifierResult.confidence * 100
      )}% via ${providerVerifier ? "Hugging Face" : "heuristics"}.`,
    });

    const ranked = runRanking(
      email,
      safeProfile,
      safeWeights,
      triageResult,
      extractionResult,
      verifierResult
    );

    traces.push({
      agent: "ranker",
      subject: email.subject,
      message: `Assigned score ${ranked.score}/100.`,
    });

    results.push(ranked);
  }

  results.sort((a, b) => b.score - a.score);
  const spamCount = results.filter(
    (item) => item.verifier.topLabel === "promotional spam"
  ).length;

  return {
    results,
    traces,
    stats: {
      total: results.length,
      opportunities: results.filter((item) => item.detection.isOpportunity).length,
      spam: spamCount,
      nonSpam: results.length - spamCount,
      urgent: results.filter(
        (item) => item.urgencyDays !== null && item.urgencyDays <= 7
      ).length,
    },
    runtime: {
      geminiEnabled: Boolean(providers.gemini.config.apiKey),
      huggingFaceEnabled: Boolean(providers.huggingFace.config.apiKey),
      geminiModel: providers.gemini.config.agentModel || null,
      verifierModel: providers.huggingFace.config.verifierModel,
      langchainEnabled: providers.langchain.enabled && providers.langchain.packagesInstalled,
      langchainPackagesInstalled: providers.langchain.packagesInstalled,
    },
  };
}

module.exports = {
  createProviders,
  analyzeInboxPayload,
  parseEmailBlocks,
};
