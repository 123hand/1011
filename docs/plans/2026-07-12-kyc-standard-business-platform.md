# KYC Standard Business Platform Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a usable KYC company-query workbench backed by structured service APIs and a real-data-ready provider layer.

**Architecture:** Keep the current single-page HTML as the first UI, add a small Python backend package that exposes search, profile, report, and export-ready data structures. Use provider adapters so mock/manual data can be replaced by Tianyancha, Qichacha, or bank-internal sources later.

**Tech Stack:** Python standard library, optional FastAPI server wrapper, existing `kyc_platform.html`, local media asset for CMB logo.

---

### Task 1: Core KYC Service

**Files:**
- Create: `kyc_app/__init__.py`
- Create: `kyc_app/models.py`
- Create: `kyc_app/providers.py`
- Create: `kyc_app/services.py`
- Test: `tests/test_kyc_services.py`

**Steps:**
1. Write failing tests for company search, profile generation, report generation, and KPI calculation.
2. Run `python -m unittest tests.test_kyc_services -v` and confirm failures.
3. Implement dataclass models, a mock provider, and KYC service functions.
4. Run the tests and confirm they pass.

### Task 2: HTTP API Wrapper

**Files:**
- Create: `kyc_server.py`
- Test: `tests/test_kyc_api.py`

**Steps:**
1. Write failing tests against the app factory without requiring network startup.
2. Implement optional FastAPI routes if FastAPI is installed, with a fallback CLI-friendly error message.
3. Run service and API tests.

### Task 3: Frontend Integration and CMB Logo

**Files:**
- Modify: `kyc_platform.html`

**Steps:**
1. Add CMB logo image from `media/99e02213b7164e169296c19529cbbdf5_image.png` into the top navigation.
2. Add API-first search flow with fallback to existing mock data.
3. Add source and pending-review fields from backend payloads to the rendered client object.
4. Keep current charts and report tabs functional.

### Task 4: Verification

**Files:**
- All changed files

**Steps:**
1. Run `python -m unittest discover -v`.
2. Run `python -m py_compile kyc_server.py kyc_app\\models.py kyc_app\\providers.py kyc_app\\services.py`.
3. Provide run command for local server.
