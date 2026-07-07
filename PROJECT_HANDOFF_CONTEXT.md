# Project Handoff Context

## 1. Project Identity

- Course: BAI21113 Software Engineering Project
- Title: Extended Agile Development of a Collaborative Restaurant Operations Task Tracker
- Correct repository: `https://github.com/Noyolos/Restaurant-Operations-Task-Tracker-Project.git`
- Repository that must not be modified: `https://github.com/Noyolos/Restaurant-Operations-Task-Tracker.git`
- Current working copy used for the latest implementation: `C:\Users\PC\Restaurant-Operations-Task-Tracker-Project`
- Technology: HTML, CSS, vanilla JavaScript, Supabase Auth, Supabase Postgres and Row Level Security
- No framework, package installation, build system or automated browser test suite

There are several similarly named local folders on this computer. Before changing anything, verify `git remote -v` and `git rev-parse --show-toplevel`.

## 2. Git State at Handoff

- Current branch: `feature/iteration3-collaboration-reporting`
- Latest implementation baseline before this handoff document: `bca2b3d9e17a222d5810ff86e7f01b7f030e2fed`
- Baseline commit message: `feat: add restaurant opening cycle and functional navigation`
- Local Git identity: `Noyolos <noyolosia@gmail.com>`
- `output/` is untracked course evidence. Do not delete, stage or commit it unless explicitly requested.
- Nothing from the latest work has been pushed by the maintainer handling this handoff.

Before every commit, verify:

```powershell
git config --local user.name
git config --local user.email
git status --short
```

Expected values:

```text
Noyolos
noyolosia@gmail.com
```

## 3. Important Working Restrictions

- Work directly in the current repository. Do not use sub-agents.
- Do not install packages, browsers, Playwright or frameworks.
- Do not create a backend server; Supabase is the only remote service.
- Do not push, merge, create pull requests, tags or releases unless explicitly requested.
- Do not modify the old repository.
- Do not modify `README.md` unless the task genuinely requires it.
- Keep the implementation readable and appropriate for a second-year university prototype.
- Do not add tool attribution, generated-content attribution or additional commit authors.
- Preserve the existing Supabase users and profiles unless deletion is explicitly requested.
- The user performs final manual acceptance testing. A permitted lightweight check is `node --check app.js`.

## 4. Main Source Files

- `index.html`: authentication screens, dashboard, task views, Board, Daily Tasks, dialogs and history UI.
- `style.css`: responsive SaaS-style interface, task drawer, Board, workload bars, closing review and operations status.
- `app.js`: Supabase client, authentication, authorization-aware UI, task workflows, analytics, Board, Daily Tasks, opening and closing operations.
- `supabase-schema.sql`: complete repeatable schema, constraints, triggers, RLS policies and grants.
- `docs/superpowers/specs/2026-07-07-daily-closing-and-task-switching-design.md`: accepted design decisions.
- `docs/superpowers/plans/2026-07-07-daily-closing-and-task-switching-plan.md`: implementation checklist for the previous feature set.

## 5. User and Permission Model

### Manager

A Manager can:

- View all active tasks.
- Create, edit, assign, reassign and delete tasks while operations are open.
- Change any active task status.
- Manage reusable task-name options.
- Manage Daily Task templates.
- Generate Daily Tasks for the current operating cycle.
- View workload, activity and closing history.
- Open restaurant operations.
- Review unfinished work and close restaurant operations.

### Staff

A Staff user:

- Sees only tasks assigned to their profile.
- Cannot create, edit, delete, assign or reassign tasks.
- Can only change the status of their own active tasks while operations are open.
- Cannot view Manager-only Daily Tasks, workload or closing history.

### Account Switching

- Authenticated users see all registered accounts in the Dashboard account switcher.
- Selecting another account signs out the current local session.
- The target username is prefilled on Login.
- The target account password is still required.
- Passwords are never displayed or stored by custom application code.

## 6. Complete Business Workflow

### A. Account Preparation

1. Register one Manager and at least two Staff accounts.
2. Usernames are normalized and duplicates are rejected case-insensitively.
3. Login is handled through Supabase Auth.
4. The matching row in `profiles` supplies full name, username and role.
5. Supabase restores the authenticated session after refresh.

### B. Opening Operations

1. Restaurant operations can be `Open` or `Closed`.
2. When Closed, the Manager sees `Open Operations`.
3. Opening increments the internal `operation_cycle`, records the date, opening time and Manager, then changes the state to Open.
4. The internal cycle allows the restaurant to close and reopen on the same date without displaying shift terminology.
5. When Closed, task creation, Daily Task generation and status updates are disabled.

### C. Daily Task Preparation

1. The Manager maintains Daily Task templates.
2. A template stores title, description, default Staff, priority, category and due-date offset.
3. The Manager selects templates and clicks `Add Selected to Today`.
4. Tasks are created for the active operation cycle.
5. A template cannot generate a duplicate task within the same operation cycle.
6. The same template can be used after operations are closed and reopened because the cycle number changes.

### D. Task Assignment and Execution

1. Manager creates or generates tasks.
2. Assignment stores the Staff profile UUID, not free text.
3. Invalid or removed assignments display as Unassigned.
4. Staff logs in and sees only their assigned tasks.
5. Staff changes status from `To Do` to `In Progress` and then `Done`.
6. Manager monitors list view, Board, counters, filters, workload and activity.
7. Status, priority, category, Staff and overdue filters can be combined.

### E. Monitoring and Cause-and-Effect Evidence

- Analytics count only tasks visible to the active user.
- Staff workload combines active, completed, overdue and high-priority work.
- Workload colors represent Available, Balanced and At Capacity.
- Activity Log records registrations, login-related actions and task actions implemented by the current code.
- Board groups tasks into To Do, In Progress and Done.
- Top navigation now calls the actual view-switching logic before scrolling to Board.

### F. Closing Operations

1. Manager selects `Close Today` while operations are Open.
2. Completed tasks are automatically classified as `Completed`.
3. Every To Do or In Progress task must be classified as `Issue` or `No Issue`.
4. `Issue` means follow-up is required and a reason is mandatory.
5. `No Issue` means the incomplete result is operationally acceptable and its note is optional.
6. The system stores a closing summary and a snapshot of every task, Staff assignment, original status, outcome and note.
7. All tasks in the active cycle are archived.
8. Operations change to Closed.
9. Active Dashboard and Board become empty.
10. Manager can expand Closing History to inspect previous outcomes by date, time, task and Staff member.

### G. Reopening

1. Manager selects `Open Operations` again.
2. A new internal cycle begins, even on the same calendar date.
3. The new cycle starts without active tasks.
4. Manager generates Daily Tasks or creates tasks manually.
5. The same execution and closing process repeats.

## 7. Supabase Data Model

### `profiles`

Stores one application profile per Auth user:

- `id`
- `full_name`
- `username`
- `role`
- `created_at`

### `restaurant_operations`

Singleton row with `id = 1`:

- `is_open`
- `operation_cycle`
- `business_date`
- `opened_at`
- `opened_by`
- `updated_at`

### `tasks`

Stores active and archived task records:

- Title and description
- Assigned Staff UUID
- Status, priority and category
- Due date and business date
- Operation cycle
- Optional Daily Task template source
- Creator, creation time and archive time

### `daily_task_templates`

Stores reusable Manager-controlled assignments and task defaults.

### `activity_log`

Stores user, action, optional task title and timestamp.

### `daily_closings`

Stores one summary for each completed operating cycle. Multiple records may share the same calendar date.

### `closing_task_reviews`

Stores immutable task snapshots for a closing record, including Staff, original status, outcome and Manager note.

## 8. Current Simulated Data

The business tables were cleared and rebuilt after the latest schema update. Auth users and profiles were preserved.

At the time of handoff, the intended simulation contains:

- 3 profiles: one Manager and two Staff accounts.
- Operations currently Open.
- 8 current tasks across To Do, In Progress and Done.
- 5 Daily Task templates.
- 1 previous closing record.
- 5 task-review rows in that closing.
- An Issue example: unsafe refrigerator temperature requiring maintenance follow-up.
- A No Issue example: supplier delay outside the Staff member's control.
- Activity records connecting opening, assignment and Staff status changes.

This is live demonstration data, not assessment evidence by itself. Query the database before assuming these counts are unchanged.

## 9. Known Gaps and Risks

### Critical: Public Manager Registration

The registration UI currently allows a new user to select Manager. The profile trigger accepts role information submitted during sign-up. A public user can therefore create a Manager account and receive Manager permissions.

Recommended correction:

- Public registration should create Staff accounts only.
- Create the first Manager manually in Supabase.
- Only an existing trusted Manager should promote or create another Manager through a protected server-side process.

Do not claim the current role model is production-secure until this is fixed.

### High: Closing Is Not Atomic

Closing currently performs several client requests:

1. Insert closing summary.
2. Insert task review snapshots.
3. Archive tasks.
4. Mark operations Closed.

If a network or permission failure occurs between requests, the database may contain a partial closing.

Recommended correction:

- Move the entire closing operation into one carefully protected Postgres function and transaction.
- Validate the current Manager, active cycle and review completeness inside the function.
- Keep the privileged function outside exposed schemas or explicitly revoke public execution.

### High: Opening Cycle Race

The browser calculates `operation_cycle + 1`. Two Managers clicking Open at the same time could write the same or conflicting state.

Recommended correction:

- Increment the cycle in a database transaction with row locking.
- Return the new operation state from the database.

### High: Database Does Not Enforce Open State for Task Writes

The UI blocks writes while Closed, but Manager RLS policies do not check `restaurant_operations.is_open` or the active cycle. A direct API call using a valid Manager session could insert or update tasks while Closed.

Recommended correction:

- Add database checks or triggers requiring Open operations and the current cycle for task insert/update.
- Keep UI validation as a second layer, not the only layer.

### Medium: Duplicate Closing Retry

There is no unique constraint on `operation_cycle` in `daily_closings`. A repeated request could create two summaries for one cycle.

Recommended correction:

- Add a unique index on `daily_closings(operation_cycle)`.
- Treat retry of an already closed cycle as an idempotent result.

### Medium: Activity Privacy

All authenticated users can currently read all Activity Log rows. This may expose other Staff activity.

Recommended correction:

- Managers see all activity.
- Staff see only their own activity, or hide Activity from Staff entirely.

### Medium: Account Deletion Removes Evidence

Deleting an Auth user cascades to `profiles`, and some related records may be removed or become Unassigned. Historical accountability should not depend on an active user account.

Recommended correction:

- Add an `active` flag to profiles.
- Deactivate users instead of deleting them.
- Continue using snapshot names in closing records.

### Medium: Timezone Handling

Database timestamps use UTC while the UI formats dates using browser locale. Business date boundaries may differ if used outside the current Kuala Lumpur environment.

Recommended correction:

- Define `Asia/Kuala_Lumpur` as the project business timezone.
- Derive business dates consistently in the database.

### Low: Template and Manual Task Duplication

The database prevents the same Daily Task template from generating twice in one cycle, but Managers can still create manual tasks with identical titles.

Recommended correction:

- Keep manual duplicates allowed if legitimate.
- Add a warning rather than a hard unique constraint.

### Low: Scaling and Pagination

The prototype loads task collections in the browser and limits closing history to recent rows. Large datasets would require pagination and server-side filtering.

This is acceptable for the current university prototype.

## 10. Recommended Next Work Order

1. Restrict public registration to Staff and secure Manager creation.
2. Make Open and Close operations transactional and idempotent in Postgres.
3. Add database enforcement for Open state and current operation cycle.
4. Restrict Staff visibility of Activity Log.
5. Add profile deactivation instead of account deletion.
6. Standardize Kuala Lumpur business-date handling.
7. Perform complete Manager and Staff manual acceptance testing.
8. Capture screenshots for Iteration 3 Agile evidence.
9. Push the branch and create the Iteration 3 pull request only when the user approves.

## 11. Manual Acceptance Checklist

1. Login as Manager and confirm Operations Status.
2. Close operations, then confirm tasks are archived and controls are disabled.
3. Open operations and confirm a new empty cycle begins.
4. Generate selected Daily Tasks and verify duplicates are skipped within that cycle.
5. Create, edit, reassign and delete a Manager task.
6. Use Overview, Tasks, Board, Team, Activity and History navigation.
7. Switch to Staff account 1 and verify only assigned tasks are visible.
8. Verify Staff cannot create, edit, delete or assign tasks.
9. Verify Staff can update their own task status while Open.
10. Verify Staff cannot update status while Closed.
11. Close as Manager and classify incomplete work as Issue and No Issue.
12. Verify Issue requires a note.
13. Expand Closing History and verify Staff, outcome and notes.
14. Reopen on the same date and confirm Daily Tasks can be generated for the new cycle.
15. Refresh and confirm Auth session, operation state and data persistence.

## 12. Lightweight Verification Commands

```powershell
node --check app.js
git diff --check
git status --short
git log -5 --oneline
```

Do not treat syntax checks as functional acceptance. The user performs the final browser workflow manually.

## 13. Suggested Iteration 3 Pull Request Content

Suggested title:

```text
Complete Iteration 3 collaboration and reporting features
```

Suggested summary:

- Adds Board workflow, analytics, Staff workload and Activity Log.
- Adds reusable Daily Tasks and Manager-controlled restaurant opening and closing.
- Adds closing review classification, historical accountability and responsive navigation.
- Preserves authentication, roles, assignment, filtering and Supabase persistence.

Suggested issue links:

```text
Closes #12
Closes #13
Closes #14
Closes #15
Closes #16
```

Do not create or push the pull request without user approval.
