# Opportunity Orbit

Opportunity Orbit is a hackathon prototype that scans student inbox messages, separates real opportunities from noise, extracts application details, and ranks what a student should act on first.

## Current stack

- Front end: static `index.html` + `styles.css` + `app.js`
- Local API: `server.js`
- Gemini role: orchestration and extraction hook
- Hugging Face role: spam and opportunity verification hook
- LangChain role: planned next layer on top of the provider hooks in `backend/`

## Run locally

1. Copy `.env.example` to `.env`
2. Add keys if you want live model calls
3. Start the app:

```powershell
npm start
```

4. Open [http://localhost:3000](http://localhost:3000)

If you do not set API keys, the app still works in heuristic mode.

## API routes

- `GET /api/runtime`
- `POST /api/analyze`

Example payload:

```json
{
  "rawEmails": "Subject: Example\nFrom: demo@example.com\nBody: Internship deadline April 29, 2026\n===\nSubject: Promo\nFrom: offers@example.com\nBody: Sign-up bonus and referral cash",
  "profile": {
    "program": "BS Computer Science",
    "semester": 6,
    "cgpa": 3.42,
    "skills": ["python", "machine learning", "ui ux"],
    "types": ["internship", "scholarship", "competition"],
    "location": "remote",
    "financialNeed": "medium"
  },
  "weights": {
    "urgency": 1.2,
    "fit": 1.3,
    "support": 1.1
  }
}
```

## Architecture

### Today

- `backend/pipeline.js` runs the same four logical agents already shown in the UI
- `backend/providers/gemini.js` is the extraction and orchestration hook for Gemini
- `backend/providers/huggingface.js` is the verifier hook for `facebook/bart-large-mnli`
- `backend/orchestrators/langchain.js` activates real LangChain orchestration when packages are installed and `LANGCHAIN_ENABLED=true`

### Next step: LangChain

Recommended LangChain layout:

1. Supervisor agent on Gemini
2. Extraction chain on Gemini
3. Verifier tool calling Hugging Face BART
4. Ranking chain combining model output with deterministic scoring

This repo can use LangChain once the packages are installed and `LANGCHAIN_ENABLED=true` is set in `.env`.
