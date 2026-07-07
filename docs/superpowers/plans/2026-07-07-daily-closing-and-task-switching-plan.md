# Daily Closing and Daily Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete daily closing review, dated closing history, reusable daily task generation, and secure demo account switching.

**Architecture:** Extend the existing Supabase schema with closing review and daily template records protected by Manager-focused RLS. Keep the vanilla JavaScript application structure and add focused rendering, validation, and persistence functions to the existing files.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Supabase Postgres and Auth.

---

### Task 1: Database model and access rules

**Files:**
- Modify: `supabase-schema.sql`

- [ ] Add `closing_task_reviews` with business date, task snapshot, Staff snapshot, original status, `Issue`/`No Issue`, note, and Manager fields.
- [ ] Add `daily_task_templates` with reusable task defaults, assignment, due-date offset, active state, and creator.
- [ ] Add `source_template_id` to tasks and a unique business-date/template index to prevent duplicate daily generation.
- [ ] Enable RLS and add Manager policies for template management and closing-history access.
- [ ] Apply the SQL in Supabase SQL Editor and query the new tables to verify access.

### Task 2: Dashboard interface

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] Add a compact account switch control to the Active User area.
- [ ] Replace the current Close Today confirmation with a task-by-task review interface.
- [ ] Add Manager-only Daily Tasks controls for selecting, adding, editing, deleting, and generating templates.
- [ ] Add expandable closing-history details grouped into Completed, Issue, and No Issue sections.
- [ ] Keep the layout responsive and consistent with the current SaaS workspace style.

### Task 3: Account switching

**Files:**
- Modify: `app.js`

- [ ] Load all visible profiles into the account switch control.
- [ ] On selection, sign out, return to Login, prefill the selected username, and focus the password field.
- [ ] Keep passwords and sessions out of custom storage and continue using Supabase Auth.

### Task 4: Daily Tasks workflow

**Files:**
- Modify: `app.js`

- [ ] Load and render Manager-owned Daily Task templates.
- [ ] Validate template title, Staff assignment, priority, category, and due-date offset.
- [ ] Generate selected templates for the current business date with `source_template_id`.
- [ ] Report skipped duplicates and refresh tasks, analytics, workload, Board, and activity data.

### Task 5: Complete closing workflow

**Files:**
- Modify: `app.js`

- [ ] Render every active task in the closing review dialog.
- [ ] Require `Issue`/`No Issue` for unfinished tasks and require a note for every `Issue`.
- [ ] Insert task snapshots and one daily closing summary, then archive every active task.
- [ ] Do not carry unfinished tasks forward; refresh the workspace to an empty active day.
- [ ] Load historical review rows and display them by date and classification.

### Task 6: Demo scenario and verification

**Files:**
- Modify: `supabase-schema.sql` only if verification exposes a schema defect.

- [ ] Insert idempotent Daily Task templates for opening safety, kitchen preparation, service setup, cleaning, and closing checks.
- [ ] Insert one historical `Issue` refrigerator scenario and one `No Issue` supplier-delay scenario.
- [ ] Run `node --check app.js` and `git diff --check`.
- [ ] Query counts and sample rows in Supabase to verify templates, reviews, and history.
- [ ] Review `git status --short` and commit only project source and plan files; do not push.
