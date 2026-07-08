# Product Backlog & User Stories

**Project:** Restaurant Operations Task Tracker
**SDLC:** Scrum — three sprints (Iteration 1 → 3), each delivering a working increment.
**Roles:** Manager (full control), Staff (own tasks only).

Each user story follows the `As a … I want … so that …` format and includes acceptance criteria written as verifiable conditions.

---

## Iteration 1 — Sprint Goal: Minimum viable task management with authentication and roles

### US01 — Registration
**As a** new restaurant employee **I want** to register an account **so that** I can access the task system.
**Acceptance criteria:**
- Registration requires full name, username, and password; empty fields are rejected.
- Usernames are normalised (case-insensitive) and duplicates are rejected.
- On success the account is created and the user is directed to log in.

### US02 — Login and logout
**As a** registered user **I want** to log in and log out **so that** my session is secure.
**Acceptance criteria:**
- Valid credentials grant access; invalid credentials show a clear error.
- The authenticated session is restored after a page refresh.
- Logout ends the session and returns to the login screen.

### US03 — Manager and Staff roles
**As a** Manager **I want** role-based permissions **so that** staff cannot perform manager-only actions.
**Acceptance criteria:**
- Each profile has a role of Manager or Staff.
- Managers can create, edit, assign, and delete tasks; Staff cannot.
- The interface only shows controls permitted for the current role.

### US04 — View assigned tasks
**As a** Staff member **I want** to see only the tasks assigned to me **so that** I can focus on my own work.
**Acceptance criteria:**
- A Staff user sees only tasks assigned to their profile.
- Managers can see all active tasks.
- Task counters reflect only the tasks visible to the current user.

### US05 — Assign tasks to registered staff
**As a** Manager **I want** to assign tasks to specific staff **so that** responsibility is clear.
**Acceptance criteria:**
- Assignment stores the staff profile ID, not free text.
- Only registered Staff accounts can be selected; otherwise the task is Unassigned.
- Removed or invalid assignments display as Unassigned.

---

## Iteration 2 — Sprint Goal: Richer task organisation, filtering, and validation

### US06 — Task priority
**As a** Manager **I want** to set task priority **so that** urgent work is highlighted.
**Acceptance criteria:**
- Priority can be Low, Medium, or High.
- Priority is shown on each task and in the High Priority counter.
- High-priority tasks are visually distinct.

### US07 — Task category
**As a** Manager **I want** to categorise tasks **so that** work is grouped by operational area.
**Acceptance criteria:**
- Categories include Kitchen Preparation, Cleaning, Inventory, Service Setup, Maintenance, Other.
- Category is shown on each task.
- Tasks can be filtered by category.

### US08 — Due date and overdue indicator
**As a** Manager **I want** due dates and overdue flags **so that** late work is visible.
**Acceptance criteria:**
- A task can have an optional due date.
- Tasks past their due date and not Done are flagged Overdue.
- An overdue counter and filter are available.

### US09 — Advanced filtering
**As a** Manager **I want** to combine filters **so that** I can find specific tasks quickly.
**Acceptance criteria:**
- Tasks can be filtered by status, priority, category, assigned staff, and due status.
- Filters can be combined and cleared in one action.
- Counts update to match the active filter.

### US10 — Improved validation
**As a** user **I want** input validation **so that** invalid data is not saved.
**Acceptance criteria:**
- Required fields and invalid dates are rejected with a clear message.
- Only allowed values for status, priority, and category are accepted.
- Duplicate usernames are rejected case-insensitively.

---

## Iteration 3 — Sprint Goal: Collaboration and reporting, plus quality and integration refinement

### US11 — Kanban board view
**As a** Manager **I want** a board grouped by status **so that** workflow is easy to read.
**Acceptance criteria:**
- Tasks are grouped into To Do, In Progress, and Done columns.
- Each column shows a live count.
- Status can be changed from the board where permitted.

### US12 — Dashboard analytics
**As a** Manager **I want** summary metrics **so that** I can assess the day at a glance.
**Acceptance criteria:**
- The dashboard shows Total, To Do, In Progress, Done, Overdue, and High Priority counts.
- Metrics count only tasks visible to the current user.
- Metrics update immediately after any task change.

### US13 — Workload monitoring
**As a** Manager **I want** to see each staff member's load **so that** work is balanced.
**Acceptance criteria:**
- Each staff member shows active, completed, overdue, and high-priority totals.
- A capacity bar and label (Available / Balanced / At Capacity) reflect the load.
- Only Managers can view workload.

### US14 — Activity log
**As a** Manager **I want** a record of key actions **so that** accountability is preserved.
**Acceptance criteria:**
- Registration, login, and task actions are recorded with user and timestamp.
- The most recent activity is listed newest-first.
- Each entry shows who acted and what changed.

### US15 — Responsive UI improvement
**As a** user **I want** the interface to adapt to my screen **so that** it is usable on any device.
**Acceptance criteria:**
- Layout adjusts cleanly across desktop, tablet, and mobile widths.
- Navigation and dialogs remain usable on small screens.
- No horizontal overflow or overlapping controls at supported breakpoints.

---

## Backlog notes
- Additional increments delivered in Iteration 3 beyond the original stories: reusable Daily Tasks, Manager-controlled restaurant Open/Close operating cycle, end-of-day closing review (Issue / No Issue classification), and closing history for accountability.
- Stories are prioritised top-to-bottom within each iteration; higher stories were delivered first.
