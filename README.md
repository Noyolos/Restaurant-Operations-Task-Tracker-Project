# 🍽️ Restaurant Operations Task Tracker Project

A collaborative web-based task management system for managing daily internal restaurant operations such as kitchen preparation, cleaning duties, inventory checking, service setup, staff assignment, and task progress monitoring.

This project was developed for the **BAI21113 Software Engineering Project**. It continues the previous Restaurant Operations Task Tracker and extends the system through **three new Scrum iterations** with user authentication, role identification, advanced task organisation, collaboration features, and reporting tools.

---

## 📋 Table of Contents

- [Team Members and Roles](#-team-members-and-roles)
- [Problem Statement](#-problem-statement)
- [Product Vision and Scope](#-product-vision-and-scope)
- [System Overview](#-system-overview)
- [Product Backlog and User Stories](#-product-backlog-and-user-stories)
- [Iteration Development Plan](#-iteration-development-plan)
- [How to Run the System](#-how-to-run-the-system)
- [Technology Stack](#-technology-stack)
- [Scrum Process Summary](#-scrum-process-summary)
- [Iteration and Sprint Overview](#-iteration-and-sprint-overview)
- [GitHub Usage](#-github-usage)
- [Individual Contributions](#-individual-contributions)
- [Documentation](#-documentation)
- [Project Status](#-project-status)

---

## 👥 Team Members and Roles

| Name | Student ID | Scrum Role | Role / Responsibility |
|---|---|---|---|
| TAN LE PIN | BAI_B2009F-2505001 | Scrum Master / Developer | Coordinates the GitHub workflow, manages branches and version tags, develops authentication and role features, supports system integration, and coordinates the final project submission. |
| DHINESH | BAI_A2009F-2509008 | Product Owner / Developer | Defines and refines user stories, clarifies system requirements, develops selected task management features, supports testing, and prepares Agile process documentation. |

---

## 🎯 Problem Statement

Small restaurants often manage daily operational tasks through verbal instructions, paper notes, or messaging applications. These methods may work for simple situations, but they can create problems when the restaurant becomes busy or when many staff members are working at the same time.

Common problems include:

- Staff may forget assigned duties during busy service hours.
- Managers may find it difficult to monitor pending and completed tasks.
- Task responsibility may be unclear.
- Urgent tasks may not be prioritised correctly.
- Staff may not know which tasks are assigned specifically to them.
- Paper notes and verbal instructions may be lost or misunderstood.
- Managers may not have a clear summary of team workload and task completion.

The restaurant requires a collaborative task tracking system that helps managers and staff create tasks, assign responsibilities, update progress, organise work, and monitor restaurant operations more effectively.

---

## 🌟 Product Vision and Scope

### Vision Statement

To provide a simple, collaborative, and easy-to-use restaurant operations task tracker that helps managers and staff organise daily work, clarify responsibilities, monitor progress, and improve operational efficiency.

### Current Starting Point

The Project continues from the previous Restaurant Operations Task Tracker, which already supports:

- Create restaurant operation tasks
- View task list
- Edit existing tasks
- Delete unnecessary tasks
- Assign tasks to staff members
- Change task status
- Filter tasks by status
- Save task data using browser `localStorage`
- Display task status counters

These existing features provide the starting foundation for the extended Project.

### Project Scope

The extended Project will include:

- User registration
- User login and logout
- User authentication
- Manager and Staff role identification
- Role-based system access
- Create, view, edit, and delete tasks
- Assign tasks to registered users
- View tasks assigned to the current user
- Update task status
- Set task priority
- Add task categories or labels
- Add task due dates
- Filter tasks using multiple conditions
- Display tasks using a Kanban board
- Display dashboard analytics
- Monitor staff workload
- Record important task activities

### Out of Scope

The following features are not currently included:

- Customer reservation management
- Online ordering
- Payment processing
- Real-time cloud database
- Email or SMS notifications
- Payroll management
- Supplier payment processing
- Production-level password encryption and server authentication

> The current system is an academic prototype. Browser storage may be used for demonstration purposes, while a production system would require secure backend authentication and database storage.

---

## 📱 System Overview

The **Restaurant Operations Task Tracker Project** is a lightweight web application developed using HTML, CSS, and JavaScript.

The application allows restaurant managers and staff to manage operational work through a shared task tracking interface.

### Main Workflow

1. A new user registers an account.
2. The user logs in as a Manager or Staff member.
3. A Manager creates a restaurant operation task.
4. The Manager enters task details, priority, category, due date, and assigned staff.
5. The task is displayed in the task list or Kanban board.
6. The assigned Staff member views the task through the My Tasks section.
7. The Staff member updates the task status.
8. The system updates the dashboard and activity log.
9. Task data remains available after the browser is refreshed.

### User Roles

#### Manager

The Manager can:

- Create tasks
- Edit tasks
- Delete tasks
- Assign tasks to staff
- Set task priority
- Set task category
- Set task due date
- View all tasks
- View dashboard analytics
- View workload monitoring
- View activity logs

#### Staff

The Staff member can:

- Log in to the system
- View assigned tasks
- View task details
- Update task status
- View tasks through the Kanban board
- Review personal task workload

### Example Restaurant Tasks

- Check kitchen stock level
- Prepare ingredients for dinner service
- Clean dining area before opening
- Refill sauce containers
- Check supplier delivery
- Update daily sales record
- Report broken kitchen equipment
- Prepare closing duties
- Inspect food storage temperature
- Confirm table setup before service

---

## 📖 Product Backlog and User Stories

The Product Backlog contains the user stories planned for the three Project iterations.

| ID | User Story | Priority | Iteration | Status |
|---|---|---|---|---|
| US01 | As a new user, I want to register an account so that I can access the restaurant task tracker. | High | Iteration 1 | ✅ Done |
| US02 | As a user, I want to log in and log out so that I can access the system using my account. | High | Iteration 1 | ✅ Done |
| US03 | As a user, I want the system to identify my role so that I receive the correct permissions. | High | Iteration 1 | ✅ Done |
| US04 | As a staff member, I want to view tasks assigned to me so that I can focus on my responsibilities. | High | Iteration 1 | ✅ Done |
| US05 | As a manager, I want to assign tasks to registered staff members so that responsibility is clear. | High | Iteration 1 | ✅ Done |
| US06 | As a manager, I want to set task priority so that urgent duties can be completed first. | Medium | Iteration 2 | ✅ Done |
| US07 | As a manager, I want to add task categories so that restaurant duties can be organised clearly. | Medium | Iteration 2 | ✅ Done |
| US08 | As a manager, I want to set a due date so that staff know when tasks must be completed. | Medium | Iteration 2 | ✅ Done |
| US09 | As a user, I want to filter tasks using different conditions so that I can find relevant tasks quickly. | Medium | Iteration 2 | ✅ Done |
| US10 | As a user, I want clear validation messages so that incorrect task information can be corrected. | Medium | Iteration 2 | ✅ Done |
| US11 | As a user, I want to view tasks on a Kanban board so that task progress is easier to understand. | Medium | Iteration 3 | ✅ Done |
| US12 | As a manager, I want to view dashboard analytics so that I can monitor task completion. | Medium | Iteration 3 | ✅ Done |
| US13 | As a manager, I want to view staff workload so that tasks can be assigned fairly. | Medium | Iteration 3 | ✅ Done |
| US14 | As a manager, I want to view an activity log so that important task changes can be reviewed. | Medium | Iteration 3 | ✅ Done |
| US15 | As a user, I want an improved responsive interface so that the system remains usable on different screen sizes. | Low | Iteration 3 | ✅ Done |

### Acceptance Criteria Examples

#### US01 — Register Account

- Given the user is on the registration page
- When the user enters valid registration details
- Then a new user account should be created
- And duplicate usernames should be rejected
- And empty required fields should display a validation message

#### US02 — Login and Logout

- Given a registered account exists
- When the user enters the correct username and password
- Then the user should be logged in
- And the user’s name and role should be displayed
- And the user should be able to log out

#### US06 — Task Priority

- Given a Manager is creating or editing a task
- When the Manager selects `High`, `Medium`, or `Low`
- Then the selected priority should be displayed on the task
- And the priority should remain saved after refreshing the page

#### US11 — Kanban Board

- Given tasks exist in the system
- When the user opens the Kanban view
- Then tasks should appear under `To Do`, `In Progress`, or `Done`
- And a task should move to the correct column after its status changes

#### US12 — Dashboard Analytics

- Given tasks exist in the system
- When the Manager opens the dashboard
- Then the system should display total tasks
- And the system should display To Do, In Progress, and Done totals
- And the task completion rate should be calculated correctly

> Full acceptance criteria will be documented in the Product Backlog and Agile Process Documentation.

---

## ✨ Iteration Development Plan

### 🔐 Iteration 1 — Authentication and User Access

**Sprint Goal**

Develop the user authentication and role foundation required for collaborative task management.

**Selected User Stories**

- US01 — Register Account
- US02 — Login and Logout
- US03 — Role Identification
- US04 — View Assigned Tasks
- US05 — Assign Tasks to Registered Staff

**Planned Features**

- User registration
- User login
- User logout
- Manager and Staff roles
- Display current logged-in user
- Assign tasks to registered users
- My Tasks view
- Basic role permissions
- Authentication validation

**Expected Working Increment**

At the end of Iteration 1, users should be able to register, log in, access the system according to their role, and view tasks assigned to them.

**Planned Release Tag**

```text
v1.0-iteration1
```

---

### 🗂️ Iteration 2 — Advanced Task Organisation

**Sprint Goal**

Improve task organisation, scheduling, prioritisation, filtering, and validation.

**Selected User Stories**

- US06 — Task Priority
- US07 — Task Categories
- US08 — Task Due Date
- US09 — Advanced Filtering
- US10 — Improved Validation

**Planned Features**

- High, Medium, and Low priority
- Task category or label
- Kitchen category
- Service category
- Cleaning category
- Inventory category
- Administration category
- Task due date
- Priority filtering
- Category filtering
- Assigned staff filtering
- Due date validation
- Improved task form validation
- Improved task card layout

**Expected Working Increment**

At the end of Iteration 2, managers should be able to organise restaurant tasks using priority, categories, due dates, assignment, and advanced filtering.

**Planned Release Tag**

```text
v1.1-iteration2
```

---

### 📊 Iteration 3 — Collaboration and Reporting

**Sprint Goal**

Add visual workflow, management analytics, workload monitoring, and activity tracking.

**Selected User Stories**

- US11 — Kanban Board
- US12 — Dashboard Analytics
- US13 — Workload Monitoring
- US14 — Activity Log
- US15 — Responsive Interface Improvement

**Planned Features**

- Kanban board
- To Do column
- In Progress column
- Done column
- Dashboard analytics
- Task completion rate
- Priority summary
- Staff workload summary
- Activity log
- Task creation history
- Task update history
- Status change history
- Role permission refinement
- Responsive interface improvements
- Final integration testing

**Expected Working Increment**

At the end of Iteration 3, the system should provide a more complete collaborative restaurant task management experience with visual workflow, analytics, workload monitoring, and activity tracking.

**Planned Release Tag**

```text
v1.2-iteration3
```

---

## 🚀 How to Run the System

### Prerequisites

- A modern web browser such as Chrome, Edge, Firefox, or Safari
- Git, if the repository will be cloned
- No server installation is currently required

### Steps to Run

1. Clone or download the repository.

```bash
git clone https://github.com/Noyolos/Restaurant-Operations-Task-Tracker-Project.git
```

2. Open the project folder.

```bash
cd Restaurant-Operations-Task-Tracker-Project
```

3. Open `index.html` in a web browser.

4. Use the available system features.

### Current Task Tracker Functions

- Create a restaurant task
- Add task details
- Assign staff
- Select task status
- Edit task
- Delete task
- Filter tasks
- View task status counters
- Save task data using localStorage

### Testing Suggestions

- Register a new account
- Attempt to register a duplicate username
- Log in using correct and incorrect credentials
- Test Manager and Staff permissions
- Create tasks with different priorities
- Assign tasks to different staff members
- Filter tasks by status, priority, and category
- Update task status
- Check Kanban board placement
- Refresh the page to test data persistence
- Check dashboard calculations
- Review activity log records

---

## 🛠 Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Structure | HTML5 | Page structure, forms, task cards, and system sections |
| Styling | CSS3 | Responsive layout, dashboard, Kanban board, and interface design |
| Logic | JavaScript | Authentication, validation, task management, filtering, and analytics |
| Storage | Browser localStorage | Store user accounts, tasks, session details, and activity records |
| Version Control | Git and GitHub | Manage branches, commits, pull requests, reviews, and releases |
| Work Tracking | GitHub Projects | Track Todo, In Progress, and Done work |
| Documentation | Markdown and PDF | Prepare Agile evidence and reflective reporting |

### Why Vanilla JavaScript?

- Lightweight and easy to run
- No installation or build process required
- Suitable for an academic prototype
- Supports browser localStorage
- Demonstrates JavaScript fundamentals
- Allows the project to focus on Agile development and collaboration evidence

---

## 📊 Scrum Process Summary

The team selected **Scrum** as the Agile SDLC methodology.

Scrum is suitable because the Project can be divided into three short development iterations. Each iteration delivers a working improvement to the system and provides opportunities for planning, implementation, testing, review, and reflection.

### Scrum Roles

| Scrum Role | Assigned Member | Responsibility |
|---|---|---|
| Product Owner | DHINESH | Defines and prioritises user stories, clarifies requirements, and checks that features support restaurant operations. |
| Scrum Master | TAN LE PIN | Coordinates the Scrum workflow, GitHub board, branches, pull requests, reviews, releases, and iteration progress. |
| Developers | TAN LE PIN and DHINESH | Develop features, test the system, review pull requests, and prepare documentation. |

### Scrum Artifacts

- Product Backlog
- Sprint Backlog
- GitHub Issues
- GitHub Project Board
- Working Increment
- Sprint Review Records
- Sprint Retrospective Records
- Release Tags

### Scrum Activities

- Sprint planning
- Task breakdown
- Work assignment
- Stand-up summaries
- Feature development
- Pull request review
- System testing
- Sprint review
- Sprint retrospective

---

## 🏃 Iteration and Sprint Overview

| Stage | Status | Tag / Milestone | Goal | Main Deliverables |
|---|---|---|---|---|
| Initial Project Setup | ✅ Complete | Initial commit | Establish the new Project repository | Previous Task Tracker starting code, GitHub repository, Project Board, and README |
| Iteration 1 | ✅ Complete | `v1.0-iteration1` | Add authentication and user access | Registration, login, logout, roles, assignment, and My Tasks (PR #18, #19) |
| Iteration 2 | ✅ Complete | `v1.1-iteration2` | Improve task organisation | Priority, categories, due dates, filtering, and validation (PR #20) |
| Iteration 3 | ✅ Complete | `v1.2-iteration3` | Add collaboration and reporting | Kanban board, dashboard, workload monitoring, activity log, responsive redesign, and closing cycle (PR #21, #23, #25) |
| Final Submission | ⏳ In progress | `v1.2-project-final` | Prepare final Project delivery | Working prototype ready; Agile documentation, reflective report, screenshots, and presentation remaining |

### Iteration 1 Summary

**Sprint Goal:** Add authentication, user roles, and individual task access.

**Planned User Stories:** US01, US02, US03, US04, US05

**Expected Review Outcome:** Users can register, log in, access role-based functions, and view assigned tasks.

### Iteration 2 Summary

**Sprint Goal:** Improve task organisation and task management.

**Planned User Stories:** US06, US07, US08, US09, US10

**Expected Review Outcome:** Tasks can be organised using priority, categories, due dates, and advanced filters.

### Iteration 3 Summary

**Sprint Goal:** Add collaboration, monitoring, and reporting features.

**Planned User Stories:** US11, US12, US13, US14, US15

**Expected Review Outcome:** The system provides a Kanban board, analytics, workload monitoring, activity records, and final quality improvements.

---

## 🗒️ Agile Process Records (Scrum Evidence)

These records document how the three sprints were actually carried out. Each sprint maps to one iteration, a feature branch, a merged pull request, and a release tag. Dates and pull request numbers reflect the real GitHub history.

### Sprint 1 — Iteration 1 (Authentication and User Access)

**Dates:** 3–5 July 2026 · **Branches:** `feature/authentication`, `feature/iteration1-complete` · **Release:** `v1.0-iteration1`

**Sprint backlog**

| Work item | Issue | Owner |
|---|---|---|
| US01 Registration, US02 Login/Logout | #2, #4 | TAN LE PIN |
| US03 Roles and permissions | #3 | TAN LE PIN |
| US04 View assigned tasks, US05 Assign to staff | #5 | TAN LE PIN |
| Acceptance criteria and test scenarios | — | DHINESH |

**Stand-up summaries**

- Set up feature branches and Supabase authentication; registration and login working.
- Added role-based gating so Staff see only their own tasks; started the assignment dropdown.
- Fixed session persistence after refresh; prepared the pull request and passed manual testing.

**Sprint review** — Delivered registration, login/logout, Manager and Staff roles, task assignment, and the My Tasks view. Increment merged via PR #18 then PR #19 on 5 July, and tagged `v1.0-iteration1`.

**Sprint retrospective**

- Went well: the feature-branch workflow and Supabase auth came together quickly.
- To improve: pull request authorship was concentrated on one member.
- Action: distribute issue and pull request authorship more evenly in later sprints.

### Sprint 2 — Iteration 2 (Advanced Task Organisation)

**Dates:** 5 July 2026 · **Branch:** `feature/iteration2-task-organisation` · **Release:** `v1.1-iteration2`

**Sprint backlog**

| Work item | Issue | Owner |
|---|---|---|
| US06 Priority, US07 Categories | #7 | TAN LE PIN |
| US08 Due dates and overdue indicator | #8 | TAN LE PIN |
| US09 Advanced filtering, US10 Validation | #9 | DHINESH / TAN LE PIN |
| Iteration 2 testing and sprint review prep | #10 | DHINESH |

**Stand-up summaries**

- Added priority and category fields to the task model and form.
- Added due dates with an overdue indicator and an overdue filter.
- Combined status, priority, category, staff, and overdue filters; tightened form validation.

**Sprint review** — Delivered priority, categories, due dates with overdue flags, combined filtering, and stronger validation. Merged via PR #20 on 5 July, and tagged `v1.1-iteration2`.

**Sprint retrospective**

- Went well: the increment was small, focused, and easy to test.
- To improve: peer review comments were still light.
- Action: add explicit review comments on each pull request before merge.

### Sprint 3 — Iteration 3 (Collaboration and Reporting)

**Dates:** 7–8 July 2026 · **Branch:** `feature/iteration3-collaboration-reporting` · **Release:** `v1.2-iteration3`

**Sprint backlog**

| Work item | Issue | Owner |
|---|---|---|
| US11 Kanban board | #12 | TAN LE PIN |
| US12 Dashboard analytics, US13 Workload monitoring | #13 | TAN LE PIN |
| US14 Activity log | #14 | TAN LE PIN |
| US15 Responsive UI and restaurant redesign | #15 | DHINESH |
| Final integration and release preparation | #16 | TAN LE PIN |
| Backlog acceptance criteria | #22 | DHINESH |
| Fix: Close Today archive permission | #24 | DHINESH |

**Stand-up summaries**

- Built the Kanban board, dashboard analytics, workload monitoring, and activity log; added Daily Tasks and the restaurant open/close operating cycle.
- Redesigned the interface into a modern restaurant theme and improved responsiveness.
- Found that Close Today saved reviews but could not clear active tasks; traced it to the task-update trigger and fixed it; expanded the backlog with acceptance criteria.

**Sprint review** — Delivered the Kanban board, dashboard analytics, staff workload, activity log, responsive restaurant-themed UI, Daily Tasks, the open/close operating cycle, and end-of-day closing review with history. Iteration 3 merged to `main` via PR #21 (closing issues #12–#16); documentation and the closing fix merged via PR #23 and PR #25. Tagged `v1.2-iteration3`.

**Sprint retrospective**

- Went well: a real defect (the closing trigger) was caught, tracked as an issue, and fixed through its own branch and pull request.
- To improve: release tags and peer review comments were added late in the sprint.
- Action: create the three iteration tags and record review comments on every pull request before final submission.

---

## 🔧 GitHub Usage

GitHub is used to support version control, collaboration, task tracking, peer review, and iteration evidence.

### Version Control Workflow

```text
User Story -> GitHub Issue -> Feature Branch -> Commit -> Pull Request -> Review -> Merge -> Release Tag
```

### Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, reviewed, and released version of the application |
| `feature/authentication` | User registration, login, logout, and session management |
| `feature/iteration1-complete` | Iteration 1 authentication, roles, assignment, and My Tasks |
| `feature/iteration2-task-organisation` | Priority, categories, due dates, filtering, and validation |
| `feature/iteration3-collaboration-reporting` | Kanban board, analytics, workload, activity log, and responsive UI |
| `docs/backlog-acceptance-criteria` | Product backlog acceptance criteria (Iteration 3 documentation) |
| `fix/manager-closing-archive-permission` | Fix for the Close Today archive-permission trigger |

### Planned Tags and Releases

| Tag | Purpose |
|---|---|
| `v1.0-iteration1` | Marks the completed authentication and user access increment |
| `v1.1-iteration2` | Marks the completed advanced task organisation increment |
| `v1.2-iteration3` | Marks the completed collaboration and reporting increment |
| `v1.2-project-final` | Marks the final submitted Project version |

### GitHub Project Board

The Project Board uses three workflow stages:

| Stage | Purpose |
|---|---|
| Todo | Issues and tasks that have not started |
| In Progress | Issues and tasks currently being developed |
| Done | Work that has been completed and tested |

### Collaboration Evidence

The Project repository will include:

- At least three GitHub Issues per member
- At least three Pull Requests per member
- Meaningful commits from both members
- Feature branches
- Pull request review comments
- GitHub Project Board updates
- Release tags for all three iterations
- Screenshots of GitHub collaboration evidence

---

## 👨‍💻 Individual Contributions

### TAN LE PIN

**Planned Responsibilities**

- Set up the new GitHub repository
- Set up the GitHub Project Board
- Coordinate Scrum activities
- Develop authentication features
- Develop role identification and permissions
- Develop selected task management features
- Develop Kanban board
- Support system integration
- Manage release tags
- Coordinate final submission

**Evidence (actual)**

- Opened the Iteration 1–3 development issues (#1–#17)
- Feature branches `feature/authentication`, `feature/iteration1-complete`, `feature/iteration2-task-organisation`, `feature/iteration3-collaboration-reporting`
- Application commits across all three iterations
- Pull requests #18 and #19 (Iteration 1), #20 (Iteration 2), and #21 (Iteration 3, merged to `main`)
- Pull request review comments on Iteration 1–3 pull requests
- Release tags `v1.0-iteration1`, `v1.1-iteration2`, `v1.2-iteration3`
- GitHub Project Board updates and system screenshots

### DHINESH

**Planned Responsibilities**

- Define and refine user stories
- Prepare acceptance criteria
- Develop selected task organisation features
- Support dashboard or reporting development
- Perform system testing
- Prepare test cases
- Prepare Scrum process records
- Support Agile documentation
- Review pull requests

**Evidence (actual)**

- Opened issues #22 (backlog acceptance criteria), #24 (Close Today archive-permission fix), and the Agile process records issue
- Feature branches `docs/backlog-acceptance-criteria`, `fix/manager-closing-archive-permission`, and the README Agile-records branch
- Documentation and fix commits authored as `Dhee0511`
- Pull requests #23 (backlog acceptance criteria), #25 (closing-permission schema fix), and the README Agile-records pull request
- Pull request review comments on Noyolos's Iteration 3 pull request
- Product backlog acceptance criteria, schema bug fix, and Agile process records

---

## 📄 Documentation

The Project will include two main documentation deliverables.

### 1. Agile Process Documentation

The Agile Process Documentation will include:

- Scrum methodology and justification
- Team roles
- Product backlog
- At least 12 user stories
- Acceptance criteria
- Three-iteration plan
- Sprint goals
- Sprint backlogs
- Task breakdown
- Member responsibilities
- Stand-up summaries
- Sprint reviews
- Sprint retrospectives
- GitHub Project Board screenshots
- GitHub Issues screenshots
- Branch and commit evidence
- Pull request screenshots
- Review comment screenshots
- Release tag screenshots
- System increment screenshots

### 2. Reflective Report

The Reflective Report will include:

- Application of iterative and incremental development
- Use of GitHub for collaboration
- Application of Scrum practices
- Challenges faced by the team
- Technical and collaboration issues
- Conflict and issue handling
- Lessons learned
- Individual contribution summaries
- Final reflection on the Project

---

## ✅ Project Status

**Status:** All three iterations complete; preparing final submission

### Completed

- All three Scrum iterations implemented and merged to `main`
- Iteration 1: authentication, roles, assignment, and My Tasks (PR #18, #19)
- Iteration 2: priority, categories, due dates, filtering, and validation (PR #20)
- Iteration 3: Kanban board, dashboard analytics, workload monitoring, activity log, responsive restaurant redesign, Daily Tasks, and the open/close operating cycle (PR #21, #23, #25)
- Product backlog with 15 user stories and acceptance criteria
- Feature-branch workflow, issues, pull requests, and Agile sprint records

### Remaining for Final Submission

- Create the release tags `v1.0-iteration1`, `v1.1-iteration2`, and `v1.2-iteration3`
- Add peer review comments on the Iteration 3 pull requests
- Capture GitHub and system screenshots for the Agile documentation
- Complete the Reflective Report (approximately 2,000–2,500 words)

### Final Milestone

```text
v1.2-project-final
```

The final milestone packages the working prototype, Agile process records, reflective report, screenshots, and presentation for submission.

**Last Updated:** 8 July 2026
