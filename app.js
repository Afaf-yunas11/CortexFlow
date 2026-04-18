const demoEmails = [
  {
    subject: "Google Summer Research Fellowship applications close April 25",
    from: "research-programs@google.edu",
    body:
      "Students in CS, AI, or related programs are invited to apply for a paid summer research fellowship. Eligibility: undergraduate students with CGPA 3.2 or above and strong interest in machine learning or HCI. Submit CV, transcript, statement of purpose, and one recommendation letter by April 25, 2026. Remote collaboration available. Apply at https://example.org/google-research-fellowship.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "FAST internal reminder: parking sticker renewal window",
    from: "campus-admin@nu.edu.pk",
    body:
      "Please renew your parking sticker before the end of the month. This notice is for students using on-campus parking lots and is unrelated to academic opportunities.",
    expectedLabel: "admin",
    expectedOpportunity: false,
  },
  {
    subject: "MITACS Globalink internship for Pakistani undergrads",
    from: "globalink@mitacs.ca",
    body:
      "Applications are open for international summer internships in research labs across Canada. Students from partner universities in Pakistan may apply. Minimum CGPA 3.3. Deadline: May 3, 2026. Required documents: CV, transcript, passport, and ranked project choices. Preference for students with prior technical project experience.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Scholarship Alert: Need-based Women in AI grant",
    from: "scholarships@womeninai.org",
    body:
      "The Women in AI grant supports undergraduate students with demonstrated financial need pursuing AI-related degrees. Award includes tuition support and mentorship. Deadline 22 April 2026. Eligibility: CGPA 3.0+, personal statement, proof of need, transcript. Virtual info session link enclosed.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Win cash prizes at the National Civic Tech Challenge",
    from: "hello@civictechchallenge.org",
    body:
      "Teams are invited to submit prototypes addressing public service problems. Opportunity type: competition. Benefits include PKR 300,000 prizes, incubation, and press coverage. Deadline: April 28, 2026. Open to undergraduate teams in Pakistan. Submit pitch deck, demo video, and team roster.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Become a campus ambassador and sell study bundles",
    from: "growth@skillblast.io",
    body:
      "Earn commissions by promoting premium study bundles. Limited seats, referral codes, and urgent sign-up bonuses. This is promotional outreach rather than an academic or career opportunity.",
    expectedLabel: "spam",
    expectedOpportunity: false,
  },
  {
    subject: "Fwd: Summer School in AI Ethics at TUM maybe relevant?",
    from: "intl-office@partneruni.de",
    body:
      "Hi students, forwarding this because a few of you asked about European summer programs. Technical University of Munich is accepting applications for its AI Ethics summer school. Eligibility includes undergraduates in computing, philosophy of tech, data science, or related fields. Deadline: April 30, 2026. Submit transcript, CV, and short motivation statement. Some partial travel scholarships may be available. Please ignore this if already applied.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Reminder reminder reminder: hostel form + scholarship FAQ attached",
    from: "student.affairs@nu.edu.pk",
    body:
      "Hostel renewal forms are due Monday. Also, for students asking about external aid, a frequently asked questions sheet mentions the Punjab Merit Support scholarship portal opens next week, but this email itself is only an administrative reminder and does not contain an application link.",
    expectedLabel: "admin",
    expectedOpportunity: false,
  },
  {
    subject: "Apply now: Data for Social Good micro-internship cohort",
    from: "programs@datasocialgood.org",
    body:
      "Applications are open for a six-week remote micro-internship focused on civic data, dashboards, and public-interest machine learning. Open to students with Python or data visualization experience. Deadline May 1, 2026. Required: CV, short project portfolio, and 150-word statement. Selected students receive stipend support and mentorship.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "You have been selected for a premium AI career accelerator package",
    from: "offers@futureedge-careers.net",
    body:
      "Congratulations. Unlock your premium accelerator package today. Refer three classmates, share your code, and start earning commissions instantly. Bonus expires tonight. This is a marketing campaign and not a formal internship or scholarship.",
    expectedLabel: "spam",
    expectedOpportunity: false,
  },
  {
    subject: "National Undergraduate Research Grant 2026 - call for proposals",
    from: "grants@nrcp.pk",
    body:
      "The National Research Collaboration Program invites undergraduate teams to submit proposals in AI for health, agriculture, and education. Opportunity type grant. Deadline 24 April 2026. Minimum CGPA 3.1. Required documents: proposal abstract, transcript, faculty endorsement, budget note, and CV. Shortlisted teams receive research funding and access to national lab mentors.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Last chance to register for exam prep webinar",
    from: "academy@topgradeprep.com",
    body:
      "Join our webinar, buy discounted prep bundles, and receive a friend referral discount. Seats are limited. Register now for marketing offers, premium resources, and surprise vouchers.",
    expectedLabel: "spam",
    expectedOpportunity: false,
  },
  {
    subject: "UNDP Youth Innovation Challenge - climate x AI track",
    from: "challenge@undp-youth.org",
    body:
      "Student founders and interdisciplinary teams are invited to submit solutions for climate resilience using AI or digital tools. Deadline: 27 April 2026. Eligibility: undergraduates or recent graduates from South Asia. Required documents include pitch deck, prototype summary, and team member profiles. Winners receive seed grants, incubation, and regional showcase opportunities.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Department notice: lab closure, server downtime, and conference poster support",
    from: "cs-dept@nu.edu.pk",
    body:
      "The systems lab will remain closed on Saturday. During this maintenance window, students planning poster submissions for the Undergraduate Computing Conference can still apply for departmental poster-print support before April 23, 2026 by emailing a poster PDF and supervisor note. This is a small support opportunity hidden inside a general department notice.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Scholarship-ish info maybe useful - alumni fund",
    from: "alumni.office@nu.edu.pk",
    body:
      "A small alumni emergency support fund is accepting requests from currently enrolled students facing short-term financial hardship. Rolling review through April 29, 2026. Students must submit proof of need, transcript, and a short explanation. Awards are limited and meant for tuition or essential living costs.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Invitation: paid ML annotation internship? read carefully",
    from: "ops@visionbridge.ai",
    body:
      "We are hiring student interns for a remote annotation and data quality role supporting computer vision pipelines. Paid part-time internship for eight weeks. Requirements: attention to detail, spreadsheet confidence, and availability 15 hours weekly. Deadline 26 April 2026. Send CV and a brief note. Not glamorous, but legitimate.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Campus ambassador fellowship for education startup",
    from: "community@learnloop.app",
    body:
      "Become a campus ambassador fellow and grow our student community. Fellows get certificates, networking, and top performers unlock sales commissions plus product coupons. Applications reviewed weekly. This sounds like a fellowship, but the core activity is student marketing.",
    expectedLabel: "spam",
    expectedOpportunity: false,
  },
  {
    subject: "Research assistant opening in HCI lab - professor referral",
    from: "faculty-office@nu.edu.pk",
    body:
      "Professor Sana is looking for one undergraduate research assistant for an HCI and accessibility project this summer. Preferred skills: Figma, UI UX, interviews, or lightweight prototyping. CGPA preferred 3.0+. Deadline April 21, 2026. Please send CV, transcript, and a short note on why the project interests you.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Admissions open for MS by research with stipend",
    from: "gradschool@techinstitute.edu",
    body:
      "Applications are now open for the MS by Research intake in applied AI and robotics. Final-year undergraduates may apply. Deadline May 5, 2026. Required documents: statement of purpose, transcript, CV, and recommendation letters. Selected applicants may receive stipend support. International applicants welcome.",
    expectedLabel: "opportunity",
    expectedOpportunity: true,
  },
  {
    subject: "Re: FW: URGENT OPPORTUNITY $$$",
    from: "promo@dealstreamz.co",
    body:
      "Exclusive access for students only. Buy one coding bootcamp package, get one free, then promote our offer on campus for cash rewards. Limited-time signup bonus and referral dashboard included.",
    expectedLabel: "spam",
    expectedOpportunity: false,
  },
];

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
  "grant",
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
  research: ["research", "lab"],
};

const agentDefinitions = [
  {
    id: "triage",
    name: "Inbox Triage Agent",
    summary: "Checking whether each email is a real opportunity or inbox noise.",
  },
  {
    id: "extractor",
    name: "Extraction Agent",
    summary: "Pulling deadline, CGPA, documents, location, and benefits.",
  },
  {
    id: "verifier",
    name: "BART Verifier Agent",
    summary: "Assigning zero-shot style labels for real opportunity vs spam.",
  },
  {
    id: "ranker",
    name: "Ranking Agent",
    summary: "Scoring fit, urgency, support, and evidence completeness.",
  },
];

const emailInput = document.querySelector("#emailInput");
const analyzeButton = document.querySelector("#analyzeButton");
const demoButton = document.querySelector("#demoButton");
const sampleInboxButton = document.querySelector("#sampleInboxButton");
const clearInboxButton = document.querySelector("#clearInboxButton");
const fileInput = document.querySelector("#fileInput");
const resultsList = document.querySelector("#resultsList");
const insightPanel = document.querySelector("#insightPanel");
const resultsSummary = document.querySelector("#resultsSummary");
const evaluationBadge = document.querySelector("#evaluationBadge");
const evalOverall = document.querySelector("#evalOverall");
const evalSpam = document.querySelector("#evalSpam");
const evalOpportunity = document.querySelector("#evalOpportunity");
const evaluationList = document.querySelector("#evaluationList");
const cardTemplate = document.querySelector("#resultCardTemplate");
const statEmails = document.querySelector("#statEmails");
const statReal = document.querySelector("#statReal");
const statNonSpam = document.querySelector("#statNonSpam");
const statSpam = document.querySelector("#statSpam");
const statUrgent = document.querySelector("#statUrgent");
const urgencyWeight = document.querySelector("#urgencyWeight");
const fitWeight = document.querySelector("#fitWeight");
const supportWeight = document.querySelector("#supportWeight");
const workflowPill = document.querySelector("#workflowPill");
const agentRunStatus = document.querySelector("#agentRunStatus");
const agentQueueMeta = document.querySelector("#agentQueueMeta");
const agentFeed = document.querySelector("#agentFeed");
const runtimeMode = document.querySelector("#runtimeMode");
const runtimeGemini = document.querySelector("#runtimeGemini");
const runtimeHuggingFace = document.querySelector("#runtimeHuggingFace");
const runtimeLangChain = document.querySelector("#runtimeLangChain");
const backendHint = document.querySelector("#backendHint");

let isAnalyzing = false;
let backendRuntime = null;
let activeDemoTruth = new Map();

function isServedApp() {
  return window.location.protocol.startsWith("http");
}

function setRuntimeBadges(runtime) {
  backendRuntime = runtime;

  if (!runtime) {
    runtimeMode.textContent = "Frontend demo mode";
    runtimeGemini.textContent = "Gemini offline";
    runtimeHuggingFace.textContent = "Hugging Face offline";
    runtimeLangChain.textContent = "LangChain planned";
    backendHint.textContent =
      "Open the app through the local server to activate the backend pipeline.";
    workflowPill.textContent = "Agent demo mode";
    return;
  }

  runtimeMode.textContent =
    runtime.mode === "backend-ready" ? "Backend pipeline live" : "Local heuristics mode";
  runtimeGemini.textContent = runtime.stack.orchestration.enabled
    ? `Gemini ${runtime.stack.orchestration.model || "connected"}`
    : "Gemini hook ready";
  runtimeHuggingFace.textContent = runtime.stack.verifier.enabled
    ? `HF ${runtime.stack.verifier.model}`
    : `HF hook ${runtime.stack.verifier.model}`;
  runtimeLangChain.textContent = runtime.stack.langchain.enabled
    ? "LangChain active"
    : "LangChain scaffolded";
  backendHint.textContent = runtime.stack.langchain.status;
  workflowPill.textContent =
    runtime.mode === "backend-ready" ? "Backend-ready pipeline" : "Hybrid local mode";
}

async function loadRuntime() {
  if (!isServedApp()) {
    setRuntimeBadges(null);
    return null;
  }

  try {
    const response = await fetch("/api/runtime");
    if (!response.ok) {
      throw new Error("Runtime request failed");
    }
    const runtime = await response.json();
    setRuntimeBadges(runtime);
    return runtime;
  } catch (error) {
    setRuntimeBadges(null);
    return null;
  }
}

function renderDemoEmails() {
  activeDemoTruth = new Map(
    demoEmails.map((email) => [
      email.subject,
      {
        expectedLabel: email.expectedLabel,
        expectedOpportunity: email.expectedOpportunity,
      },
    ])
  );
  emailInput.value = demoEmails
    .map(
      (email) =>
        `Subject: ${email.subject}\nFrom: ${email.from}\nBody: ${email.body}`
    )
    .join("\n===\n");
  updateEmailStatCount();
}

function clearEvaluation() {
  evaluationBadge.textContent = "Waiting for demo inbox";
  evalOverall.textContent = "0%";
  evalSpam.textContent = "0%";
  evalOpportunity.textContent = "0%";
  evaluationList.innerHTML = "";
}

function updateEmailStatCount() {
  const count = parseEmails(emailInput.value).length;
  statEmails.textContent = String(count);
}

function parseEmails(raw) {
  return raw
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

function getProfile() {
  const form = document.querySelector("#profileForm");
  const data = new FormData(form);

  return {
    program: String(data.get("program") || "").toLowerCase(),
    semester: Number(data.get("semester") || 0),
    cgpa: Number(data.get("cgpa") || 0),
    skills: splitList(data.get("skills")),
    types: splitList(data.get("types")),
    location: String(data.get("location") || "").toLowerCase(),
    financialNeed: String(data.get("financialNeed") || "").toLowerCase(),
    experience: String(data.get("experience") || "").toLowerCase(),
  };
}

function getWeights() {
  return {
    urgency: Number(urgencyWeight.value),
    fit: Number(fitWeight.value),
    support: Number(supportWeight.value),
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

  if (Number.isNaN(parsed.getTime())) {
    const flipped = cleaned.replace(
      /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/,
      "$2 $1, $3"
    );
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

  return parsed.toLocaleDateString("en-US", {
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
  const match = text.match(/cgpa\s*(?:of|:)?\s*(\d\.\d{1,2}|\d)/i);
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
  ];
  return docKeywords.filter((keyword) => text.toLowerCase().includes(keyword));
}

function extractLocation(text) {
  const lowered = text.toLowerCase();
  if (lowered.includes("remote")) {
    return "remote";
  }
  if (lowered.includes("pakistan")) {
    return "pakistan";
  }
  if (lowered.includes("canada")) {
    return "canada";
  }
  if (lowered.includes("global") || lowered.includes("international")) {
    return "global";
  }
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

  return benefits;
}

function daysUntil(dateLabel) {
  if (!dateLabel) {
    return null;
  }

  const parsed = new Date(dateLabel);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const today = new Date("2026-04-18T00:00:00");
  const diff = parsed.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function buildChecklist(type, documents, urgencyDays) {
  const checklist = [];

  if (urgencyDays !== null && urgencyDays <= 4) {
    checklist.push("Prioritize this application today because the deadline is close.");
  }
  checklist.push(`Confirm the ${type} eligibility criteria line by line.`);
  if (documents.length > 0) {
    checklist.push(`Prepare the required documents: ${documents.join(", ")}.`);
  } else {
    checklist.push("Verify missing requirements from the original email before applying.");
  }
  checklist.push("Open the official link or contact address and draft the submission plan.");

  return checklist;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function summarizeSubject(subject) {
  return subject.length > 58 ? `${subject.slice(0, 55)}...` : subject;
}

function addFeedItem(title, body) {
  const item = document.createElement("article");
  item.className = "feed-item";
  item.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
  agentFeed.prepend(item);
}

function setAgentState(agentId, state, label) {
  const agentCard = document.querySelector(`[data-agent-card="${agentId}"]`);
  const orbitNode = document.querySelector(`[data-agent-node="${agentId}"]`);

  [agentCard, orbitNode].forEach((element) => {
    if (!element) {
      return;
    }
    element.classList.remove("is-running", "is-done");
    if (state === "running") {
      element.classList.add("is-running");
    }
    if (state === "done") {
      element.classList.add("is-done");
    }
  });

  if (agentCard) {
    const stateNode = agentCard.querySelector(".agent-state");
    stateNode.textContent = label;
  }
}

function resetAgentBoard() {
  agentDefinitions.forEach((agent) => setAgentState(agent.id, "idle", "Idle"));
  agentFeed.innerHTML = "";
  agentRunStatus.textContent = "Idle";
  agentQueueMeta.textContent = "0 emails queued";
  setRuntimeBadges(backendRuntime);
}

function runTriageAgent(email) {
  const detection = detectOpportunity(email);
  return {
    detection,
    explanation: detection.isOpportunity
      ? `Opportunity signals beat spam signals (${detection.opportunityHits.length} vs ${detection.spamHits.length}).`
      : `The email looks closer to admin/promotional noise than a real opportunity.`,
  };
}

function runExtractionAgent(email) {
  const combined = `${email.subject} ${email.body}`;
  const type = inferType(combined);
  const deadline = extractDeadline(combined);
  const minimumCgpa = parseMinimumCgpa(combined);
  const documents = extractDocuments(combined);
  const location = extractLocation(combined);
  const benefits = extractBenefits(combined);
  const urgencyDays = daysUntil(deadline);

  return {
    type,
    deadline,
    minimumCgpa,
    documents,
    location,
    benefits,
    urgencyDays,
  };
}

function runVerifierAgent(email, triageResult, extractionResult) {
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
  const deadlineHeavy =
    extractionResult.deadline && extractionResult.documents.length >= 2;
  let topLabel = "promotional spam";

  if (triageResult.detection.isOpportunity || hiddenOpportunitySignals > 0) {
    topLabel = adminHits > 0 && hiddenOpportunitySignals > 0
      ? "mixed admin plus opportunity"
      : "real opportunity";
  } else if (adminHits > 0 && spamHits === 0) {
    topLabel = "administrative notice";
  }

  const confidence = Math.max(
    0.2,
    Math.min(
      0.99,
      triageResult.detection.confidence +
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
      {
        label: topLabel,
        score: confidence,
      },
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

function runRankingAgent(email, profile, weights, triageResult, extractionResult, verifierResult) {
  const combined = `${email.subject} ${email.body}`;
  let score = 20;
  const evidence = [];
  const reasons = [];

  if (triageResult.detection.isOpportunity) {
    score += 25;
    evidence.push("Detected as a genuine opportunity");
  } else {
    score -= 30;
    evidence.push("Looks more promotional than opportunity-focused");
  }

  if (profile.types.includes(extractionResult.type)) {
    score += Math.round(14 * weights.fit);
    reasons.push(`Matches preferred type: ${extractionResult.type}`);
  }

  if (extractionResult.minimumCgpa !== null) {
    if (profile.cgpa >= extractionResult.minimumCgpa) {
      score += Math.round(12 * weights.fit);
      reasons.push(`CGPA requirement met (${extractionResult.minimumCgpa}+ needed)`);
    } else {
      score -= 18;
      reasons.push(`CGPA below requirement (${extractionResult.minimumCgpa}+ needed)`);
    }
  } else {
    score += 4;
    reasons.push("No CGPA barrier detected");
  }

  const combinedLower = combined.toLowerCase();
  const skillMatches = profile.skills.filter((skill) => combinedLower.includes(skill));
  if (skillMatches.length > 0) {
    score += Math.round(Math.min(16, skillMatches.length * 5) * weights.fit);
    reasons.push(`Skill overlap: ${skillMatches.join(", ")}`);
  }

  if (
    profile.financialNeed === "high" &&
    /scholarship|grant|tuition|stipend|paid/i.test(combined)
  ) {
    score += Math.round(12 * weights.support);
    reasons.push("Strong financial support potential");
  }

  if (profile.location === "remote" && extractionResult.location === "remote") {
    score += Math.round(8 * weights.fit);
    reasons.push("Remote-friendly opportunity");
  } else if (profile.location === "pakistan" && extractionResult.location === "pakistan") {
    score += Math.round(8 * weights.fit);
    reasons.push("Fits Pakistan-only preference");
  } else if (
    profile.location === "global" &&
    ["canada", "global"].includes(extractionResult.location)
  ) {
    score += Math.round(8 * weights.fit);
    reasons.push("Aligned with global opportunity preference");
  }

  if (extractionResult.urgencyDays !== null) {
    if (extractionResult.urgencyDays <= 4) {
      score += Math.round(16 * weights.urgency);
      reasons.push(`Very urgent: deadline in ${extractionResult.urgencyDays} days`);
    } else if (extractionResult.urgencyDays <= 10) {
      score += Math.round(10 * weights.urgency);
      reasons.push(`Upcoming deadline in ${extractionResult.urgencyDays} days`);
    } else {
      score += Math.round(5 * weights.urgency);
      reasons.push("Deadline leaves some preparation time");
    }
  }

  if (extractionResult.documents.length > 0) {
    score += 6;
    reasons.push(
      `Requirements extracted: ${extractionResult.documents.length} document signals`
    );
  } else {
    score -= 4;
    reasons.push("Incomplete application details");
  }

  if (verifierResult.topLabel === "real opportunity") {
    score += Math.round(verifierResult.confidence * 10);
    reasons.push(
      `Verifier favors real opportunity (${Math.round(verifierResult.confidence * 100)}%)`
    );
  } else {
    score -= Math.round((1 - verifierResult.confidence) * 8);
    reasons.push(`Verifier leaned ${verifierResult.topLabel}`);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    ...email,
    type: extractionResult.type,
    deadline: extractionResult.deadline,
    location: extractionResult.location,
    minimumCgpa: extractionResult.minimumCgpa,
    documents: extractionResult.documents,
    benefits: extractionResult.benefits,
    urgencyDays: extractionResult.urgencyDays,
    score,
    evidence: [...evidence, ...reasons].slice(0, 5),
    detection: triageResult.detection,
    verifier: verifierResult,
    nextSteps: buildChecklist(
      extractionResult.type,
      extractionResult.documents,
      extractionResult.urgencyDays
    ),
  };
}

async function processEmailWithAgents(email, profile, weights, index) {
  setAgentState("triage", "running", "Running");
  addFeedItem(
    "Inbox Triage Agent",
    `Inspecting email ${index + 1}: ${summarizeSubject(email.subject)}`
  );
  await sleep(180);
  const triageResult = runTriageAgent(email);
  setAgentState("triage", "done", "Done");
  addFeedItem("Triage Decision", triageResult.explanation);

  setAgentState("extractor", "running", "Running");
  await sleep(180);
  const extractionResult = runExtractionAgent(email);
  setAgentState("extractor", "done", "Done");
  addFeedItem(
    "Extraction Agent",
    `Pulled ${extractionResult.type}, ${extractionResult.deadline || "no deadline"}, and ${extractionResult.documents.length} document clues.`
  );

  setAgentState("verifier", "running", "Running");
  await sleep(180);
  const verifierResult = runVerifierAgent(email, triageResult, extractionResult);
  setAgentState("verifier", "done", "Done");
  addFeedItem(
    "BART Verifier Agent",
    `Top label: ${verifierResult.topLabel} at ${Math.round(verifierResult.confidence * 100)}% confidence.`
  );

  setAgentState("ranker", "running", "Running");
  await sleep(180);
  const ranked = runRankingAgent(
    email,
    profile,
    weights,
    triageResult,
    extractionResult,
    verifierResult
  );
  setAgentState("ranker", "done", "Done");
  addFeedItem(
    "Ranking Agent",
    `Assigned score ${ranked.score}/100 for ${summarizeSubject(email.subject)}.`
  );

  return ranked;
}

function buildInsightPanel(result) {
  const deadlineLabel = result.deadline || "Not found";
  const minCgpaLabel =
    result.minimumCgpa !== null ? result.minimumCgpa.toFixed(1) : "Not specified";
  const extractionSource = result.extractionMeta?.source || "heuristic";
  const extractionModel = result.extractionMeta?.model || "";
  const extractionSummary = result.extractionMeta?.summary || "";
  const verifierSource = result.verifierMeta?.source || "heuristic";
  const benefitsMarkup =
    result.benefits.length > 0
      ? result.benefits.map((item) => `<span class="detail-chip">${item}</span>`).join("")
      : `<span class="detail-chip">Benefits not clearly stated</span>`;
  const documentsMarkup =
    result.documents.length > 0
      ? result.documents.map((doc) => `<li>${doc}</li>`).join("")
      : "<li>No explicit documents extracted</li>";
  const checklistMarkup = result.nextSteps.map((step) => `<li>${step}</li>`).join("");
  const reasonsMarkup = result.evidence.map((item) => `<li>${item}</li>`).join("");
  const verifierMarkup = (result.verifier?.labels || [])
    .map(
      (item) =>
        `<span class="detail-chip">${item.label} ${Math.round(item.score * 100)}%</span>`
    )
    .join("");

  insightPanel.innerHTML = `
    <h3>${result.subject}</h3>
    <p>${result.body}</p>
    <div class="badge-row">
      <span class="detail-chip">${capitalize(result.type)}</span>
      <span class="detail-chip">Verifier ${Math.round(result.verifier.confidence * 100)}%</span>
      <span class="detail-chip">Priority ${result.score}/100</span>
    </div>
    <div class="badge-row">
      <span class="detail-chip">Extraction ${formatProviderSource(extractionSource)}</span>
      <span class="detail-chip">Verifier ${formatProviderSource(verifierSource)}</span>
      ${
        extractionModel
          ? `<span class="detail-chip">${extractionModel}</span>`
          : ""
      }
    </div>
    <div class="badge-row">${verifierMarkup}</div>
    <div class="detail-grid">
      <div class="detail-block">
        <strong>Deadline</strong>
        <span>${deadlineLabel}</span>
      </div>
      <div class="detail-block">
        <strong>Location</strong>
        <span>${capitalize(result.location)}</span>
      </div>
      <div class="detail-block">
        <strong>Minimum CGPA</strong>
        <span>${minCgpaLabel}</span>
      </div>
      <div class="detail-block">
        <strong>Sender</strong>
        <span>${result.from}</span>
      </div>
    </div>
    <div class="badge-row">${benefitsMarkup}</div>
    ${
      extractionSummary
        ? `<h3 style="margin-top: 20px;">Gemini Summary</h3><p>${extractionSummary}</p>`
        : ""
    }
    <h3 style="margin-top: 20px;">Why it ranked here</h3>
    <ul class="detail-list">${reasonsMarkup}</ul>
    <h3 style="margin-top: 20px;">Required documents</h3>
    <ul class="detail-list">${documentsMarkup}</ul>
    <h3 style="margin-top: 20px;">Action checklist</h3>
    <ul class="detail-list">${checklistMarkup}</ul>
  `;
}

function renderResults(results) {
  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsSummary.textContent =
      "No valid emails were found yet. Load the demo inbox or paste a few emails first.";
    insightPanel.innerHTML =
      "<h3>Opportunity Brief</h3><p>Add some emails and run the analysis.</p>";
    statReal.textContent = "0";
    statNonSpam.textContent = "0";
    statSpam.textContent = "0";
    statUrgent.textContent = "0";
    clearEvaluation();
    return;
  }

  const opportunities = results.filter((item) => item.detection.isOpportunity);
  const spamCount = results.filter(
    (item) => item.verifier?.topLabel === "promotional spam"
  ).length;
  const nonSpamCount = results.length - spamCount;
  const urgentCount = opportunities.filter(
    (item) => item.urgencyDays !== null && item.urgencyDays <= 7
  ).length;
  const geminiExtractions = results.filter(
    (item) => item.extractionMeta?.source === "gemini"
  ).length;

  statReal.textContent = String(opportunities.length);
  statNonSpam.textContent = String(nonSpamCount);
  statSpam.textContent = String(spamCount);
  statUrgent.textContent = String(urgentCount);

  resultsSummary.textContent = `${opportunities.length} real opportunities detected from ${results.length} emails. ${nonSpamCount} were treated as non-spam and ${spamCount} were flagged as spam or promo. Gemini produced live extraction output for ${geminiExtractions} emails in this run.`;
  renderEvaluation(results);

  results.forEach((result, index) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".result-rank").textContent = `#${index + 1}`;
    card.querySelector(".result-tag").textContent = capitalize(result.type);
    card.querySelector(".result-title").textContent = result.subject;
    card.querySelector(".result-subtitle").textContent = [
      result.from,
      result.deadline || "No deadline detected",
    ].join(" - ");
    card.querySelector(".score-label").textContent = `${result.score}/100`;
    card.querySelector(".score-bar span").style.width = `${result.score}%`;
    card.querySelector(".evidence-list").innerHTML = result.evidence
      .slice(0, 3)
      .map((item) => `<li>${item}</li>`)
      .join("");

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".result-card")
        .forEach((element) => element.classList.remove("selected"));
      card.classList.add("selected");
      buildInsightPanel(result);
    });

    if (index === 0) {
      card.classList.add("selected");
      buildInsightPanel(result);
    }

    resultsList.appendChild(card);
  });
}

function renderEvaluation(results) {
  if (activeDemoTruth.size === 0) {
    clearEvaluation();
    return;
  }

  const rows = results
    .map((result) => {
      const truth = activeDemoTruth.get(result.subject);
      if (!truth) {
        return null;
      }

      const predictedSpam = result.verifier?.topLabel === "promotional spam";
      const expectedSpam = truth.expectedLabel === "spam";
      const predictedOpportunity = Boolean(result.detection?.isOpportunity);
      const spamCorrect = predictedSpam === expectedSpam;
      const opportunityCorrect = predictedOpportunity === truth.expectedOpportunity;
      const overallCorrect = spamCorrect && opportunityCorrect;

      return {
        subject: result.subject,
        spamCorrect,
        opportunityCorrect,
        overallCorrect,
        predictedLabel: result.verifier?.topLabel || "unknown",
        expectedLabel: truth.expectedLabel,
      };
    })
    .filter(Boolean);

  if (rows.length === 0) {
    clearEvaluation();
    return;
  }

  const overallAccuracy = Math.round(
    (rows.filter((row) => row.overallCorrect).length / rows.length) * 100
  );
  const spamAccuracy = Math.round(
    (rows.filter((row) => row.spamCorrect).length / rows.length) * 100
  );
  const opportunityAccuracy = Math.round(
    (rows.filter((row) => row.opportunityCorrect).length / rows.length) * 100
  );

  evaluationBadge.textContent =
    overallAccuracy >= 85 ? "Strong demo accuracy" : "Needs more tuning";
  evalOverall.textContent = `${overallAccuracy}%`;
  evalSpam.textContent = `${spamAccuracy}%`;
  evalOpportunity.textContent = `${opportunityAccuracy}%`;
  evaluationList.innerHTML = rows
    .map(
      (row) => `
        <article class="evaluation-item">
          <div>
            <strong>${row.subject}</strong>
            <span>Expected ${row.expectedLabel}, predicted ${row.predictedLabel}</span>
          </div>
          <span class="evaluation-pill ${row.overallCorrect ? "good" : "bad"}">${
            row.overallCorrect ? "Overall OK" : "Overall miss"
          }</span>
          <span class="evaluation-pill ${row.spamCorrect ? "good" : "bad"}">${
            row.spamCorrect ? "Spam OK" : "Spam miss"
          }</span>
          <span class="evaluation-pill ${
            row.opportunityCorrect ? "good" : "bad"
          }">${row.opportunityCorrect ? "Opportunity OK" : "Opportunity miss"}</span>
        </article>
      `
    )
    .join("");
}

function capitalize(value) {
  return String(value || "")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatProviderSource(source) {
  if (source === "langchain-gemini") return "LangChain + Gemini";
  if (source === "huggingface") return "Hugging Face";
  if (source === "gemini") return "Gemini";
  return "Heuristic";
}

function getAgentDisplayName(agent) {
  if (agent === "triage") return "Inbox Triage Agent";
  if (agent === "extractor") return "Extraction Agent";
  if (agent === "verifier") return "BART Verifier Agent";
  return "Ranking Agent";
}

async function animateBackendTrace(traces) {
  agentFeed.innerHTML = "";

  for (const trace of traces) {
    const agentId =
      trace.agent === "triage"
        ? "triage"
        : trace.agent === "extractor"
          ? "extractor"
          : trace.agent === "verifier"
            ? "verifier"
            : "ranker";
    setAgentState(agentId, "running", "Running");
    addFeedItem(
      getAgentDisplayName(trace.agent),
      `${summarizeSubject(trace.subject)}: ${trace.message}`
    );
    await sleep(60);
    setAgentState(agentId, "done", "Done");
  }
}

async function analyzeViaBackend(emails, profile, weights) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emails,
      profile,
      weights,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend analysis failed.");
  }

  return response.json();
}

async function analyzeInbox() {
  if (isAnalyzing) {
    return;
  }

  isAnalyzing = true;
  analyzeButton.disabled = true;
  analyzeButton.textContent = "Agents Running...";

  const emails = parseEmails(emailInput.value);
  const profile = getProfile();
  const weights = getWeights();
  const results = [];

  resetAgentBoard();
  statEmails.textContent = String(emails.length);
  agentQueueMeta.textContent = `${emails.length} emails queued`;
  agentRunStatus.textContent = "Running";
  workflowPill.textContent = "Agents in motion";

  if (emails.length === 0) {
    renderResults([]);
    agentRunStatus.textContent = "Idle";
    setRuntimeBadges(backendRuntime);
    analyzeButton.disabled = false;
    analyzeButton.textContent = "Analyze Opportunities";
    isAnalyzing = false;
    return;
  }

  try {
    if (isServedApp()) {
      const payload = await analyzeViaBackend(emails, profile, weights);
      await animateBackendTrace(payload.traces || []);
      payload.results.forEach((item) => results.push(item));
      renderResults(results);
      agentQueueMeta.textContent = "0 emails remaining";
      agentRunStatus.textContent = "Completed";
      workflowPill.textContent =
        payload.runtime?.geminiEnabled || payload.runtime?.huggingFaceEnabled
          ? "Backend analysis complete"
          : "Heuristic backend complete";
      addFeedItem(
        "Run Summary",
        `Processed ${payload.stats.total} emails with ${payload.stats.opportunities} opportunities, ${payload.stats.nonSpam} non-spam, and ${payload.stats.spam} spam or promo.`
      );
    } else {
      for (const [index, email] of emails.entries()) {
        const result = await processEmailWithAgents(email, profile, weights, index);
        results.push(result);
        agentQueueMeta.textContent = `${emails.length - index - 1} emails remaining`;
      }

      results.sort((a, b) => b.score - a.score);
      renderResults(results);
      agentRunStatus.textContent = "Completed";
      workflowPill.textContent = "Agent run complete";
      addFeedItem(
        "Run Summary",
        `Processed ${emails.length} emails and ranked ${results.filter((item) => item.detection.isOpportunity).length} opportunities.`
      );
    }
  } catch (error) {
    agentRunStatus.textContent = "Fallback";
    workflowPill.textContent = "Local agent fallback";
    addFeedItem(
      "Backend Status",
      "Backend request failed, so the app can still run in local heuristic mode."
    );

    for (const [index, email] of emails.entries()) {
      const result = await processEmailWithAgents(email, profile, weights, index);
      results.push(result);
      agentQueueMeta.textContent = `${emails.length - index - 1} emails remaining`;
    }

    results.sort((a, b) => b.score - a.score);
    renderResults(results);
    addFeedItem(
      "Run Summary",
      `Processed ${emails.length} emails locally after backend fallback.`
    );
  } finally {
    analyzeButton.disabled = false;
    analyzeButton.textContent = "Analyze Opportunities";
    isAnalyzing = false;
  }
}

demoButton.addEventListener("click", async () => {
  renderDemoEmails();
  await analyzeInbox();
});

sampleInboxButton.addEventListener("click", renderDemoEmails);

clearInboxButton.addEventListener("click", () => {
  activeDemoTruth = new Map();
  emailInput.value = "";
  updateEmailStatCount();
  resetAgentBoard();
  renderResults([]);
});

analyzeButton.addEventListener("click", analyzeInbox);
emailInput.addEventListener("input", updateEmailStatCount);

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  activeDemoTruth = new Map();
  const content = await file.text();
  emailInput.value = content;
  updateEmailStatCount();
  await analyzeInbox();
});

[urgencyWeight, fitWeight, supportWeight].forEach((slider) =>
  slider.addEventListener("input", () => {
    if (!isAnalyzing) {
      analyzeInbox();
    }
  })
);

async function bootApp() {
  await loadRuntime();
  renderDemoEmails();
  resetAgentBoard();
  await analyzeInbox();
}

bootApp();
