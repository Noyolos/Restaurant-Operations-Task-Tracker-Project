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
| US01 | As a new user, I want to register an account so that I can access the restaurant task tracker. | High | Iteration 1 | ⏳ Planned |
| US02 | As a user, I want to log in and log out so that I can access the system using my account. | High | Iteration 1 | ⏳ Planned |
| US03 | As a user, I want the system to identify my role so that I receive the correct permissions. | High | Iteration 1 | ⏳ Planned |
| US04 | As a staff member, I want to view tasks assigned to me so that I can focus on my responsibilities. | High | Iteration 1 | ⏳ Planned |
| US05 | As a manager, I want to assign tasks to registered staff members so that responsibility is clear. | High | Iteration 1 | ⏳ Planned |
| US06 | As a manager, I want to set task priority so that urgent duties can be completed first. | Medium | Iteration 2 | ⏳ Planned |
| US07 | As a manager, I want to add task categories so that restaurant duties can be organised clearly. | Medium | Iteration 2 | ⏳ Planned |
| US08 | As a manager, I want to set a due date so that staff know when tasks must be completed. | Medium | Iteration 2 | ⏳ Planned |
| US09 | As a user, I want to filter tasks using different conditions so that I can find relevant tasks quickly. | Medium | Iteration 2 | ⏳ Planned |
| US10 | As a user, I want clear validation messages so that incorrect task information can be corrected. | Medium | Iteration 2 | ⏳ Planned |
| US11 | As a user, I want to view tasks on a Kanban board so that task progress is easier to understand. | Medium | Iteration 3 | ⏳ Planned |
| US12 | As a manager, I want to view dashboard analytics so that I can monitor task completion. | Medium | Iteration 3 | ⏳ Planned |
| US13 | As a manager, I want to view staff workload so that tasks can be assigned fairly. | Medium | Iteration 3 | ⏳ Planned |
| US14 | As a manager, I want to view an activity log so that important task changes can be reviewed. | Medium | Iteration 3 | ⏳ Planned |
| US15 | As a user, I want an improved responsive interface so that the system remains usable on different screen sizes. | Low | Iteration 3 | ⏳ Planned |

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
| Iteration 1 | ⏳ Planned | `v1.0-iteration1` | Add authentication and user access | Registration, login, logout, roles, assignment, and My Tasks |
| Iteration 2 | ⏳ Planned | `v1.1-iteration2` | Improve task organisation | Priority, categories, due dates, filtering, and validation |
| Iteration 3 | ⏳ Planned | `v1.2-iteration3` | Add collaboration and reporting | Kanban board, dashboard, workload monitoring, activity log, and final integration |
| Final Submission | ⏳ Planned | `v1.2-project-final` | Prepare final Project delivery | Working prototype, Agile documentation, reflective report, screenshots, and presentation |

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

## 🔧 GitHub Usage

GitHub is used to support version control, collaboration, task tracking, peer review, and iteration evidence.

### Version Control Workflow

```text
User Story -> GitHub Issue -> Feature Branch -> Commit -> Pull Request -> Review -> Merge -> Release Tag
```

### Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable and reviewed version of the application |
| `feature/user-registration` | User registration development |
| `feature/login-and-roles` | Login, logout, and role identification |
| `feature/my-tasks` | Assigned task view |
| `feature/task-priority-labels` | Priority and category development |
| `feature/task-due-date-filtering` | Due dates and advanced filters |
| `feature/kanban-board` | Kanban task view |
| `feature/dashboard-analytics` | Dashboard and workload summary |
| `feature/activity-log` | Activity history development |
| `docs/agile-process-documentation` | Agile evidence and process records |
| `docs/reflective-report` | Reflective report preparation |

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

**Planned Evidence**

- GitHub Issues
- Feature branches
- Application commits
- Pull requests
- Pull request reviews
- Release tags
- Board updates
- System screenshots

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

**Planned Evidence**

- GitHub Issues
- Feature branches
- Development commits
- Documentation commits
- Pull requests
- Pull request reviews
- Testing records
- Scrum documentation

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

**Status:** Project setup and planning in progress

### Completed

- New GitHub repository created
- Previous Restaurant Operations Task Tracker added as the starting system
- Initial source code added
- GitHub Project Board created
- Scrum methodology selected
- Initial README prepared

### Current Work

- Prepare the Product Backlog
- Create at least 12 User Stories
- Add acceptance criteria
- Create Iteration 1 Issues
- Assign team responsibilities
- Invite project collaborator
- Begin authentication development

### Next Milestone

```text
v1.0-iteration1
```

The next milestone will deliver user registration, login, logout, role identification, registered staff assignment, and the My Tasks view.

**Last Updated:** July 2026
