# Real Data Client Development Platform Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the current KYC demo into a real-data-ready workbench for corporate relationship managers, covering company lookup, existing-client deepening, new-client acquisition, and entry due diligence.

**Architecture:** Keep `kyc_platform.html` as the first user-facing screen and extend the current Python standard-library backend. Add a provider layer that can load real normalized company records from local JSON, while preserving the current mock provider as a fallback. Add a client development service that converts company profiles into actionable relationship-manager workflows.

**Tech Stack:** Python standard library, `http.server`, dataclasses, JSON files, existing single-page HTML/CSS/JS.

---

### Task 1: Data Provider Contract

**Files:**
- Modify: `kyc_app/models.py`
- Modify: `kyc_app/providers.py`
- Test: `tests/test_kyc_services.py`

**Steps:**
1. Add tests that prove the service exposes provider metadata and can load a company from a file-backed provider.
2. Verify the tests fail because provider metadata and file provider support do not exist yet.
3. Add `provider_meta()` to provider classes and implement `JsonCompanyProvider`.
4. Run service tests.

### Task 2: Client Development Workflow

**Files:**
- Create: `kyc_app/client_development.py`
- Modify: `kyc_app/services.py`
- Test: `tests/test_kyc_services.py`

**Steps:**
1. Add tests for existing-client deepening, new-client acquisition, and entry due diligence outputs.
2. Verify tests fail because workflow generation does not exist.
3. Implement deterministic workflow generation from `CompanyRecord` profile data.
4. Run service tests.

### Task 3: HTTP API Expansion

**Files:**
- Modify: `kyc_server.py`
- Test: `tests/test_kyc_api.py`

**Steps:**
1. Add tests for `/api/status` and `/api/company/{id}/development-plan`.
2. Verify tests fail because routes do not exist.
3. Implement routes using `KycService`.
4. Run API tests.

### Task 4: Frontend Workflow Integration

**Files:**
- Modify: `kyc_platform.html`

**Steps:**
1. Add a "客户开发策略" tab after "客户智能分析".
2. Render existing-client deepening, new-client acquisition, entry due diligence, and next actions from the backend profile payload.
3. Keep local fallback clients functional by generating a compatible frontend-only workflow if backend data is unavailable.
4. Open the page via local server and visually inspect the added tab.

### Task 5: Verification Notes

**Files:**
- Modify: `docs/plans/2026-07-12-real-data-client-development-platform.md`

**Steps:**
1. Run `python -m unittest discover -v`.
2. Run `python -m py_compile kyc_server.py kyc_app\\models.py kyc_app\\providers.py kyc_app\\services.py kyc_app\\client_development.py`.
3. If local Python is broken, record the exact environment failure in the final response and keep tests committed as executable verification assets.
