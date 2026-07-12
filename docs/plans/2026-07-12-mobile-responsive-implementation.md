# KYC Platform Mobile Responsive Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the complete KYC platform usable on 375px to 430px mobile screens without changing its data or business logic.

**Architecture:** Keep the existing single-file frontend and add scoped responsive CSS at 768px and 480px breakpoints. Protect the behavior with a static structure regression test, rebuild the deployment output, and synchronize the verified files into the GitHub publishing repository.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js static tests and build scripts.

---

### Task 1: Add the mobile regression test

**Files:**
- Create: `tests/test_mobile_frontend.js`

1. Add assertions for the 768px and 480px breakpoints, mobile navigation, search stacking, horizontal tab scrolling, single-column grids and report actions.
2. Run `node tests/test_mobile_frontend.js` and confirm it fails because the mobile rules are absent.

### Task 2: Implement responsive layout

**Files:**
- Modify: `kyc_platform.html`
- Test: `tests/test_mobile_frontend.js`

1. Add the minimal responsive CSS required by the test.
2. Run `node tests/test_mobile_frontend.js` and confirm it passes.
3. Run all existing JavaScript frontend tests.

### Task 3: Build and verify deployment assets

**Files:**
- Regenerate: `dist/index.html`
- Regenerate: `kyc_platform_static.zip`

1. Run `node scripts/build_static.js`.
2. Verify `dist/index.html` contains the mobile breakpoints.
3. Rebuild the static ZIP from `dist`.

### Task 4: Publish to GitHub

**Files:**
- Synchronize changed source, tests, docs and deployment package into `github_publish_1011/`.

1. Review the publishing repository diff.
2. Run the complete verification suite from the publishing repository.
3. Commit with a mobile adaptation message.
4. Push `main` to `https://github.com/123hand/1011.git` and verify the remote commit.

