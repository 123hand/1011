# Zero-cost Public Source Lookup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give an unlisted company a zero-cost official-public-source lookup workspace instead of a database-missing notice.

**Architecture:** When local, backend, and bundled public records do not match a query, the frontend renders a provisional client profile and a source panel. The panel opens official public-information portals in new tabs and provides a structured, browser-local evidence form; its saved entries are used as transparent manual-review evidence in the generated KYC report.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, browser `localStorage`, Node-based static checks.

---

### Task 1: Lock in the unlisted-company UX with a failing static test

**Files:**
- Modify: `tests/test_search_frontend.js`
- Test: `tests/test_search_frontend.js`

**Step 1: Write the failing test**

Assert that the source page contains the official-source lookup container and does not contain the legacy database-missing wording.

**Step 2: Run test to verify it fails**

Run: `node tests/test_search_frontend.js`
Expected: FAIL because the lookup UI is not implemented.

**Step 3: Write minimal implementation**

Add a hidden official-source lookup section and replace the unlisted-company hint with a neutral public-record search state.

**Step 4: Run test to verify it passes**

Run: `node tests/test_search_frontend.js`
Expected: PASS.

### Task 2: Add official-source links and locally saved manual evidence

**Files:**
- Modify: `kyc_platform.html`
- Test: `tests/test_search_frontend.js`

**Step 1: Write the failing test**

Assert that the page includes the six official source keys, `buildPublicSourceLinks`, and `savePublicEvidence`.

**Step 2: Run test to verify it fails**

Run: `node tests/test_search_frontend.js`
Expected: FAIL because these helpers do not exist.

**Step 3: Write minimal implementation**

Render source links using the entered company name, allow the manager to enter verified findings and source URLs, and store only these user-entered public findings locally under a query-specific key.

**Step 4: Run test to verify it passes**

Run: `node tests/test_search_frontend.js`
Expected: PASS.

### Task 3: Carry manual evidence into the provisional KYC report

**Files:**
- Modify: `kyc_platform.html`
- Test: `tests/test_search_frontend.js`

**Step 1: Write the failing test**

Assert that unlisted profiles expose public-source evidence to the report path and retain explicit manual-review markers.

**Step 2: Run test to verify it fails**

Run: `node tests/test_search_frontend.js`
Expected: FAIL until the report data is wired.

**Step 3: Write minimal implementation**

Merge saved evidence into the unlisted client source list and retain a manual-review item so the report never implies automated verification.

**Step 4: Run test to verify it passes**

Run: `node tests/test_search_frontend.js`
Expected: PASS.

### Task 4: Build, verify, and publish

**Files:**
- Modify: `dist/index.html`
- Modify: `github_publish_1011/kyc_platform.html`
- Modify: `github_publish_1011/tests/test_search_frontend.js`
- Modify: `github_publish_1011/docs/plans/2026-07-14-free-public-source-lookup-design.md`
- Modify: `github_publish_1011/dist/index.html`

**Step 1: Run focused frontend checks**

Run: `node tests/test_search_frontend.js` and `node tests/test_frontend_static.js`

**Step 2: Run the static build**

Run: `npm run build`

**Step 3: Verify the built artifact and full regression suite**

Run: `node tests/test_search_frontend.js`, `node tests/test_frontend_static.js`, and the Python unit tests using the configured Python 3.8 executable.

**Step 4: Sync and publish**

Copy only the changed source, test, plan, and built artifacts into `github_publish_1011/`; rerun verification there; commit and push `main`.
