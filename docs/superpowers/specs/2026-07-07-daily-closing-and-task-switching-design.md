# Daily Closing and Daily Tasks Design

## Objective

Create a complete daily restaurant operations cycle. Managers must review unfinished work before closing, all tasks must leave the active dashboard after closing, and reusable daily task sets must be available for fast assignment.

## Operations Lifecycle

The system has one restaurant-wide `Open` or `Closed` state. A Manager opens operations before tasks can be created or updated. Closing operations archives the current work and changes the state to `Closed`. A Manager may open operations again on the same calendar date; an internal cycle number separates the records without exposing shift terminology to users.

## End-of-Day Review

When a Manager selects **Close Today**, the system displays every active task. Completed tasks require no additional input. Every `To Do` or `In Progress` task must be classified before closing:

- `Issue`: the task was not completed and requires follow-up. A reason is required.
- `No Issue`: the task was not completed for an acceptable operational reason. A note is optional.

Each review record stores the business date, task title, assigned Staff account and name, original task status, classification, note, and reviewing Manager.

The close operation is blocked until all unfinished tasks are classified and every `Issue` has a reason. After confirmation, every task for the day is archived. No unfinished task is automatically carried to the next day, so the active Dashboard and Board become empty.

## Closing History

Managers can view previous closing records grouped by business date. Opening a date displays:

- Closing totals and Manager name.
- Completed tasks.
- Unfinished tasks classified as `Issue`.
- Unfinished tasks classified as `No Issue`.
- Assigned Staff and review notes.

Staff cannot access closing history or other Staff performance records.

## Daily Tasks

Managers can maintain reusable Daily Task templates. A template stores task title, description, default Staff assignment, priority, category, due-date rule, and active state.

The Daily Tasks panel allows a Manager to select one or more templates and create the selected tasks for the current operating cycle. Existing tasks with the same template and cycle are not created twice. Managers can still edit the generated tasks normally.

## Account Switching

The Dashboard Active User area shows all registered accounts to authenticated users for demonstration purposes. Selecting another account signs out the current session, returns to Login, and pre-fills the selected username. The target account password remains required. Passwords are never stored or displayed.

## Demo Scenario

The sample setup includes:

- A completed opening safety task.
- An unfinished refrigerator inspection classified as `Issue` with an equipment-fault reason.
- An unfinished inventory task classified as `No Issue` because a supplier delivery was delayed.
- Daily Task templates for opening safety, kitchen preparation, service setup, cleaning, and closing checks.

This scenario demonstrates daily generation, Staff status updates, Manager monitoring, end-of-day classification, complete task reset, and historical follow-up.

## Data and Security

New Supabase tables use Row Level Security. Managers can manage templates, create closing reviews, and view closing history. Staff retain access only to their assigned active tasks. The frontend never uses a service-role key or bypasses Supabase Auth.

## Verification

- Run `node --check app.js`.
- Confirm Issue notes are required and No Issue notes are optional.
- Confirm closing archives all active tasks.
- Confirm history groups review records by date and Staff.
- Confirm Daily Tasks cannot be generated twice for the same date.
- Confirm account switching still requires the target password.
