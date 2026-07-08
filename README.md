# 🍽️ Restaurant Operations Task Tracker

A collaborative web application for managing daily internal restaurant operations — kitchen preparation, cleaning, inventory checks, service setup, staff assignment, and task-progress monitoring — with a full open/close operating cycle.

Developed for the **BAI21113 Software Engineering Project (May 2026 Semester)**. It extends a previous Task Tracker through **three Scrum iterations** adding authentication, role identification, advanced task organisation, collaboration features, and reporting.

**Repository:** https://github.com/Noyolos/Restaurant-Operations-Task-Tracker-Project

---

## 📋 Table of Contents

- [Team Members and Roles](#-team-members-and-roles)
- [Problem Statement](#-problem-statement)
- [Product Vision and Scope](#-product-vision-and-scope)
- [System Overview](#-system-overview)
- [Technology Stack](#-technology-stack)
- [Product Backlog and User Stories](#-product-backlog-and-user-stories)
- [Iterations and Sprint Records](#-iterations-and-sprint-records)
- [How to Run the System](#-how-to-run-the-system)
- [GitHub Usage](#-github-usage)
- [Individual Contributions](#-individual-contributions)
- [Documentation](#-documentation)
- [Project Status](#-project-status)

---

## 👥 Team Members and Roles

| Name | Student ID | Scrum Role | Responsibility |
|---|---|---|---|
| TAN LE PIN | BAI_B2009F-2505001 | Scrum Master / Developer | GitHub workflow, branches and release tags; authentication, roles, task management and reporting features; system integration and final submission. |
| DHINESH | BAI_A2009F-2509008 | Product Owner / Developer | User stories and acceptance criteria; requirement clarification; schema fix; testing; Agile process documentation; pull request reviews. |

---

## 🎯 Problem Statement

Small restaurants often manage daily operational tasks through verbal instructions, paper notes, or messaging apps. These methods break down when service is busy or several staff work at once: duties are forgotten, responsibility is unclear, urgent work is not prioritised, staff are unsure what is assigned to them, and managers lack a clear view of workload and completion.

The restaurant needs a collaborative task-tracking system that lets managers and staff create, assign, update, organise and monitor operational work reliably.

---

## 🌟 Product Vision and Scope

### Vision

A simple, collaborative, easy-to-use restaurant operations task tracker that helps managers and staff organise daily work, clarify responsibilities, monitor progress, and improve operational efficiency.

### In Scope

Registration, login/logout and authentication; Manager and Staff roles with role-based access; task create/view/edit/delete; assignment to registered staff; per-user task views; status updates; priority, categories and due dates; multi-condition filtering and validation; Kanban board; dashboard analytics; staff workload monitoring; activity log; reusable Daily Tasks; a Manager-controlled restaurant open/close operating cycle with end-of-day closing review and history.

### Out of Scope

Customer reservations, online ordering, payment processing, email/SMS notifications, payroll, and production-grade security hardening. The system is an academic prototype.

---

## 📱 System Overview

The application is built with HTML, CSS and vanilla JavaScript, and uses **Supabase** for authentication, a **PostgreSQL** database, and **row-level security**. Data persists in Supabase, so it remains available across sessions and devices.

### Main Workflow

1. A Manager opens restaurant operations for the day (a new operating cycle begins).
2. The Manager creates tasks or generates them from reusable Daily Task templates, setting details, priority, category, due date and assigned staff.
3. Tasks appear in the list and on the Kanban board.
4. Staff sign in, see only their own tasks, and update their status (To Do → In Progress → Done).
5. The dashboard analytics, workload monitoring and activity log update automatically.
6. At the end of the day the Manager closes operations, classifying any unfinished task as Issue or No Issue; all tasks are archived and recorded in the closing history.
7. Reopening starts a fresh cycle, and the process repeats.

### Roles

**Manager** — create, edit, delete, assign and reassign tasks; manage Daily Tasks; open and close operations; view analytics, workload, activity and closing history.

**Staff** — view only assigned tasks; update the status of their own tasks while operations are open.

---

## 🛠 Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Structure | HTML5 | Page structure, forms, dialogs, task cards |
| Styling | CSS3 | Responsive restaurant-themed interface, dashboard, Kanban board |
| Logic | Vanilla JavaScript | Authentication flow, validation, task workflows, analytics |
| Authentication | Supabase Auth | User registration, login, and sessions |
| Database | Supabase PostgreSQL + Row-Level Security | Persistent storage for profiles, tasks, activity, closings |
| Version Control | Git and GitHub | Branches, commits, pull requests, reviews, releases |
| Work Tracking | GitHub Issues, Projects, Pull Requests, Tags | Backlog, sprint work and iteration evidence |
| Documentation | Markdown and Word | README, backlog, and the Agile & reflective report |

**Why vanilla JavaScript?** Lightweight, no build step, appropriate for an academic prototype, and it keeps the focus on Agile development and collaboration evidence rather than framework configuration.

---

## 📖 Product Backlog and User Stories

The backlog holds fifteen prioritised user stories across the three iterations. All are implemented. The full acceptance criteria are maintained in [`user-stories.md`](user-stories.md).

| ID | User Story | Priority | Iteration | Status |
|---|---|---|---|---|
| US01 | As a new user, I want to register an account so that I can access the tracker. | High | 1 | ✅ Done |
| US02 | As a user, I want to log in and log out so that I can access the system securely. | High | 1 | ✅ Done |
| US03 | As a user, I want the system to identify my role so that I receive the correct permissions. | High | 1 | ✅ Done |
| US04 | As a staff member, I want to view tasks assigned to me so that I can focus on my work. | High | 1 | ✅ Done |
| US05 | As a manager, I want to assign tasks to registered staff so that responsibility is clear. | High | 1 | ✅ Done |
| US06 | As a manager, I want to set task priority so that urgent duties come first. | Medium | 2 | ✅ Done |
| US07 | As a manager, I want to categorise tasks so that duties are organised clearly. | Medium | 2 | ✅ Done |
| US08 | As a manager, I want due dates so that staff know when tasks are due. | Medium | 2 | ✅ Done |
| US09 | As a user, I want to filter tasks by multiple conditions so that I find work quickly. | Medium | 2 | ✅ Done |
| US10 | As a user, I want clear validation messages so that bad input is corrected. | Medium | 2 | ✅ Done |
| US11 | As a user, I want a Kanban board so that progress is easy to read. | Medium | 3 | ✅ Done |
| US12 | As a manager, I want dashboard analytics so that I can monitor completion. | Medium | 3 | ✅ Done |
| US13 | As a manager, I want staff workload monitoring so that work is balanced. | Medium | 3 | ✅ Done |
| US14 | As a manager, I want an activity log so that key changes can be reviewed. | Medium | 3 | ✅ Done |
| US15 | As a user, I want a responsive interface so that the system works on any screen. | Low | 3 | ✅ Done |

### Acceptance Criteria (examples)

**US01 — Register:** valid details create an account; duplicate usernames are rejected case-insensitively; empty required fields show a validation message.

**US06 — Priority:** the Manager selects High/Medium/Low; the priority shows on the task and is saved after refresh.

**US11 — Kanban:** tasks appear under To Do, In Progress or Done, and move column when their status changes.

**US12 — Analytics:** the dashboard shows Total, To Do, In Progress, Done, Overdue and High-priority counts for the tasks visible to the user.

---

## 🏃 Iterations and Sprint Records

The project was delivered in three sprints. Each maps to one iteration, a feature branch, a merged pull request, and a release tag. Dates and pull request numbers reflect the real GitHub history.

### Sprint 1 — Iteration 1: Authentication and User Access

**Dates:** 3–5 July 2026 · **Branches:** `feature/authentication`, `feature/iteration1-complete` · **Release:** `v1.0-iteration1`
**Sprint goal:** build the authentication and role foundation. **Stories:** US01–US05.

| Work item | Issue | Owner |
|---|---|---|
| US01 Registration, US02 Login/Logout | #2, #4 | TAN LE PIN |
| US03 Roles and permissions | #3 | TAN LE PIN |
| US04 View assigned, US05 Assign to staff | #5 | TAN LE PIN |
| Acceptance criteria and test scenarios | — | DHINESH |

**Stand-ups:** set up branches and Supabase auth; added role gating so Staff see only their tasks; fixed session persistence and passed manual testing.
**Review:** delivered registration, login/logout, roles, assignment and My Tasks; merged via PR #18 then #19; tagged `v1.0-iteration1`.
**Retrospective:** feature-branch workflow worked well; pull request authorship was concentrated on one member; action — distribute authorship in later sprints.

### Sprint 2 — Iteration 2: Advanced Task Organisation

**Dates:** 5 July 2026 · **Branch:** `feature/iteration2-task-organisation` · **Release:** `v1.1-iteration2`
**Sprint goal:** improve organisation, prioritisation, filtering and validation. **Stories:** US06–US10.

| Work item | Issue | Owner |
|---|---|---|
| US06 Priority, US07 Categories | #7 | TAN LE PIN |
| US08 Due dates and overdue indicator | #8 | TAN LE PIN |
| US09 Filtering, US10 Validation | #9 | DHINESH / TAN LE PIN |
| Iteration 2 testing and review prep | #10 | DHINESH |

**Stand-ups:** added priority/category fields; added due dates with overdue detection; combined filters and tightened validation.
**Review:** delivered priority, categories, due dates, combined filtering and validation; merged via PR #20; tagged `v1.1-iteration2`.
**Retrospective:** small increment was easy to test; review comments were still light; action — add explicit PR review comments.

### Sprint 3 — Iteration 3: Collaboration and Reporting

**Dates:** 7–8 July 2026 · **Branch:** `feature/iteration3-collaboration-reporting` · **Release:** `v1.2-iteration3`
**Sprint goal:** add visual workflow, analytics, workload, activity tracking and quality refinement. **Stories:** US11–US15.

| Work item | Issue | Owner |
|---|---|---|
| US11 Kanban board | #12 | TAN LE PIN |
| US12 Analytics, US13 Workload | #13 | TAN LE PIN |
| US14 Activity log | #14 | TAN LE PIN |
| US15 Responsive UI and redesign | #15 | DHINESH |
| Final integration and release prep | #16 | TAN LE PIN |
| Backlog acceptance criteria | #22 | DHINESH |
| Fix: Close Today archive permission | #24 | DHINESH |

**Stand-ups:** built the Kanban board, analytics, workload and activity log, plus Daily Tasks and the open/close cycle; redesigned the UI into a restaurant theme; found and fixed the closing-permission trigger; expanded the backlog with acceptance criteria.
**Review:** delivered the board, analytics, workload, activity log, responsive redesign, Daily Tasks, the operating cycle and closing review/history. Iteration 3 merged to `main` via PR #21 (closing #12–#16); documentation and the fix merged via PR #23 and #25. Tagged `v1.2-iteration3`.
**Retrospective:** a real defect was caught and fixed through its own issue and PR; tags and review comments were added late; action — create the iteration tags and record review comments before submission (completed).

---

## 🚀 How to Run the System

**Prerequisites:** a modern web browser (Chrome, Edge, Firefox, Safari) and an internet connection (the app connects to Supabase). Git is optional for cloning.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Noyolos/Restaurant-Operations-Task-Tracker-Project.git
   cd Restaurant-Operations-Task-Tracker-Project
   ```
2. Open `index.html` in a web browser.
3. Register a Manager account (create the first Manager), then register Staff accounts, and sign in.

> To run against your own backend, create a Supabase project and apply `supabase-schema.sql`, then update the Supabase URL and anon key at the top of `app.js`.

**Suggested tests:** register and reject a duplicate username; test Manager vs Staff permissions; open operations, generate Daily Tasks, update status as Staff, and close the day classifying unfinished work; refresh to confirm data persists; check analytics, workload and the activity log.

---

## 🔧 GitHub Usage

**Workflow:** `User Story → Issue → Feature Branch → Commit → Pull Request → Review → Merge → Release Tag`.

### Branches

| Branch | Purpose |
|---|---|
| `main` | Stable, reviewed, released version |
| `feature/authentication` | Registration, login, logout, sessions |
| `feature/iteration1-complete` | Iteration 1 auth, roles, assignment, My Tasks |
| `feature/iteration2-task-organisation` | Priority, categories, due dates, filtering, validation |
| `feature/iteration3-collaboration-reporting` | Kanban, analytics, workload, activity log, responsive UI |
| `docs/backlog-acceptance-criteria` | Product backlog acceptance criteria |
| `fix/manager-closing-archive-permission` | Close Today archive-permission trigger fix |
| `docs/agile-process-records` | Agile process records in the README |

### Release Tags

| Tag | Commit | Marks |
|---|---|---|
| `v1.0-iteration1` | 6a02681 | Iteration 1 — authentication and user access |
| `v1.1-iteration2` | becc7b0 | Iteration 2 — advanced task organisation |
| `v1.2-iteration3` | 08feded | Iteration 3 — collaboration and reporting |

### Collaboration Evidence

Both members contributed and reviewed each other's work. Tan Le Pin authored the application feature pull requests (#18–#21) and the Iteration 1–3 development issues; Dhinesh authored the backlog acceptance criteria (#22/#23), the closing-permission schema fix (#24/#25), and the Agile process records (#26/#27). Each merged pull request was peer-reviewed and approved. A GitHub Project board tracks work across Todo, In Progress and Done.

---

## 👨‍💻 Individual Contributions

### TAN LE PIN — Scrum Master / Developer

Set up the repository, project board and branching strategy; implemented authentication, roles and permissions, task CRUD and assignment, the Iteration 2 organisation features, and the Iteration 3 board, analytics, workload, activity log and open/close cycle; authored pull requests #18–#21; created the three release tags; managed integration and led final acceptance testing; reviewed Dhinesh's pull requests.

### DHINESH — Product Owner / Developer

Defined and refined the user stories and wrote the acceptance criteria for all fifteen stories (issue #22, PR #23); diagnosed and fixed the closing-permission schema defect (issue #24, PR #25); produced the Agile process records in the README (issue #26, PR #27); performed acceptance testing across Manager and Staff roles; and reviewed the Iteration 3 pull request.

---

## 📄 Documentation

- **Product backlog and acceptance criteria** — [`user-stories.md`](user-stories.md)
- **Agile Process Documentation & Reflective Report** — `Restaurant-Tracker-Agile-and-Reflective-Report.docx` (Scrum evidence, sprint records, GitHub evidence, and the ~2,000-word reflective report with individual contributions)
- **Database schema** — [`supabase-schema.sql`](supabase-schema.sql)

---

## ✅ Project Status

**Status:** All three iterations complete and merged to `main`; release tags published.

**Completed**

- Iteration 1 — authentication, roles, assignment, My Tasks (PR #18, #19)
- Iteration 2 — priority, categories, due dates, filtering, validation (PR #20)
- Iteration 3 — Kanban board, analytics, workload, activity log, responsive redesign, Daily Tasks, open/close cycle (PR #21, #23, #25)
- 15 user stories with acceptance criteria; feature branches; peer-reviewed pull requests; release tags `v1.0`–`v1.2`; Agile process records and reflective report

**Remaining for submission**

- Capture GitHub and system screenshots for the Agile documentation
- Final presentation and demonstration

**Last Updated:** 8 July 2026
