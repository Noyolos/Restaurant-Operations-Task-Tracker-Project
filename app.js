const SUPABASE_URL = "https://tcsvafdvnyttxptlgapk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc3ZhZmR2bnl0dHhwdGxnYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODc1OTksImV4cCI6MjA5ODY2MzU5OX0.23zk-m--_LLBuQdAKXD9UGy-hD92SnJNWP7TCn41nz4";
const LEGACY_TASKS_STORAGE_KEY = "tasks";
const LEGACY_MIGRATION_KEY = "supabaseTasksMigrated";
const TASK_TEMPLATES_STORAGE_KEY = "restaurantTaskTemplates";
const VALID_STATUSES = ["To Do", "In Progress", "Done"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];
const VALID_CATEGORIES = ["Kitchen Preparation", "Cleaning", "Inventory", "Service Setup", "Maintenance", "Other"];
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const mainGrid = document.getElementById("mainGrid");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authMessage = document.getElementById("authMessage");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const registerFullName = document.getElementById("registerFullName");
const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");
const registerRole = document.getElementById("registerRole");
const activeUserName = document.getElementById("activeUserName");
const activeUserRole = document.getElementById("activeUserRole");
const logoutBtn = document.getElementById("logoutBtn");
const boardSubtitle = document.getElementById("boardSubtitle");
const taskFormCard = document.getElementById("taskFormCard");
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const quickTaskSelect = document.getElementById("quickTaskSelect");
const taskDescription = document.getElementById("taskDescription");
const assignedUser = document.getElementById("assignedUser");
const taskStatus = document.getElementById("taskStatus");
const taskPriority = document.getElementById("taskPriority");
const taskCategory = document.getElementById("taskCategory");
const taskDueDate = document.getElementById("taskDueDate");
const taskList = document.getElementById("taskList");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const categoryFilter = document.getElementById("categoryFilter");
const staffFilter = document.getElementById("staffFilter");
const overdueFilter = document.getElementById("overdueFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const sideNav = document.getElementById("sideNav");
const newTaskBtn = document.getElementById("newTaskBtn");
const closeTaskDrawerBtn = document.getElementById("closeTaskDrawerBtn");
const taskDrawerBackdrop = document.getElementById("taskDrawerBackdrop");
const manageTaskTemplatesBtn = document.getElementById("manageTaskTemplatesBtn");
const taskTemplateModal = document.getElementById("taskTemplateModal");
const closeTaskTemplateModalBtn = document.getElementById("closeTaskTemplateModalBtn");
const taskTemplateForm = document.getElementById("taskTemplateForm");
const taskTemplateInput = document.getElementById("taskTemplateInput");
const saveTaskTemplateBtn = document.getElementById("saveTaskTemplateBtn");
const taskTemplateMessage = document.getElementById("taskTemplateMessage");
const taskTemplateList = document.getElementById("taskTemplateList");
const closeDayBtn = document.getElementById("closeDayBtn");
const closeDayModal = document.getElementById("closeDayModal");
const closeCloseDayModalBtn = document.getElementById("closeCloseDayModalBtn");
const cancelCloseDayBtn = document.getElementById("cancelCloseDayBtn");
const confirmCloseDayBtn = document.getElementById("confirmCloseDayBtn");
const closeDayMessage = document.getElementById("closeDayMessage");
const closingHistoryCard = document.getElementById("closingHistoryCard");
const closingHistoryList = document.getElementById("closingHistoryList");
const listViewBtn = document.getElementById("listViewBtn");
const kanbanViewBtn = document.getElementById("kanbanViewBtn");
const listView = document.getElementById("listView");
const kanbanView = document.getElementById("kanbanView");
const workloadCard = document.getElementById("workloadCard");
const workloadList = document.getElementById("workloadList");
const activityList = document.getElementById("activityList");
const taskMessage = document.getElementById("taskMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let profiles = [];
let tasks = [];
let activeUser = null;
let editingTaskId = null;
let activities = [];
let currentView = "list";
let editingTemplateIndex = null;
let closings = [];

const DEFAULT_TASKS = [
  "Prepare dinner service station",
  "Check ingredient and beverage inventory",
  "Clean and sanitise dining area",
  "Inspect kitchen equipment",
  "Set up tables and menus",
  "Review supplier delivery"
];

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function usernameToEmail(username) {
  return `${normalizeUsername(username)}@restaurant-task-tracker.example`;
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9._-]+$/.test(username);
}

function isManager() {
  return activeUser && activeUser.role === "Manager";
}

function setMessage(element, type, text) {
  if (!text) {
    element.textContent = "";
    element.className = "status-message hidden";
    return;
  }

  element.textContent = text;
  element.className = `status-message message-${type}`;
}

function switchAuthTab(tabName) {
  const showLogin = tabName === "login";
  loginTab.classList.toggle("active", showLogin);
  registerTab.classList.toggle("active", !showLogin);
  loginForm.classList.toggle("hidden", !showLogin);
  registerForm.classList.toggle("hidden", showLogin);
}

function getStaffProfiles() {
  return profiles.filter((profile) => profile.role === "Staff");
}

function getProfileById(id) {
  return profiles.find((profile) => profile.id === id) || null;
}

function getStatusClass(status) {
  if (status === "Done") {
    return "status-done";
  }

  if (status === "In Progress") {
    return "status-progress";
  }

  return "status-todo";
}

function getPriorityClass(priority) {
  return `priority-${priority.toLowerCase()}`;
}

function isValidDateValue(value) {
  if (!value) {
    return true;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.getUTCFullYear() === Number(match[1])
    && date.getUTCMonth() === Number(match[2]) - 1
    && date.getUTCDate() === Number(match[3]);
}

function isTaskOverdue(task) {
  if (!task.due_date || task.status === "Done") {
    return false;
  }

  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return task.due_date < localToday;
}

function formatEnglishDate(value) {
  if (!value) return "No due date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getLocalDateValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getNextBusinessDate() {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  return getLocalDateValue(nextDate);
}

function getTaskTemplates() {
  try {
    const stored = JSON.parse(localStorage.getItem(TASK_TEMPLATES_STORAGE_KEY) || "null");
    return Array.isArray(stored) ? stored.filter((title) => typeof title === "string" && title.trim()) : [...DEFAULT_TASKS];
  } catch (error) {
    return [...DEFAULT_TASKS];
  }
}

function saveTaskTemplates(templates) {
  localStorage.setItem(TASK_TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
}

function renderQuickTaskOptions() {
  const selectedTask = taskTitle.value;
  quickTaskSelect.innerHTML = '<option value="">Select a task</option>';
  getTaskTemplates().forEach((title) => {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    quickTaskSelect.appendChild(option);
  });
  quickTaskSelect.value = getTaskTemplates().includes(selectedTask) ? selectedTask : "";
}

function ensureTaskTemplate(title) {
  const templates = getTaskTemplates();
  if (!templates.some((item) => item.toLowerCase() === title.toLowerCase())) {
    templates.push(title);
    saveTaskTemplates(templates);
  }
}

function renderTaskTemplateList() {
  taskTemplateList.innerHTML = "";
  const templates = getTaskTemplates();
  templates.forEach((title, index) => {
    const row = document.createElement("div");
    row.className = "template-row";
    const name = document.createElement("span");
    name.textContent = title;
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "secondary-btn small-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editingTemplateIndex = index;
      taskTemplateInput.value = title;
      saveTaskTemplateBtn.textContent = "Save";
      taskTemplateInput.focus();
    });
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "danger-btn small-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const deletedTitle = templates[index];
      templates.splice(index, 1);
      saveTaskTemplates(templates);
      if (taskTitle.value === deletedTitle && !editingTaskId) taskTitle.value = "";
      renderTaskTemplateList();
      renderQuickTaskOptions();
    });
    actions.append(editButton, deleteButton);
    row.append(name, actions);
    taskTemplateList.appendChild(row);
  });

  if (!templates.length) taskTemplateList.textContent = "No task options. Add one above.";
}

function getCategoryIcon(category) {
  const icons = {
    "Kitchen Preparation": "K",
    Cleaning: "C",
    Inventory: "I",
    "Service Setup": "S",
    Maintenance: "M",
    Other: "O"
  };
  return icons[category] || "O";
}

async function recordActivity(action, taskTitle = null) {
  if (!activeUser) {
    return;
  }

  const { error } = await supabaseClient.from("activity_log").insert({
    user_id: activeUser.id,
    user_name: activeUser.full_name,
    action,
    task_title: taskTitle
  });

  if (!error) {
    await loadActivities();
    renderActivities();
  }
}

function updateAnalytics() {
  const values = {
    totalAnalytics: tasks.length,
    todoAnalytics: tasks.filter((task) => task.status === "To Do").length,
    progressAnalytics: tasks.filter((task) => task.status === "In Progress").length,
    doneAnalytics: tasks.filter((task) => task.status === "Done").length,
    overdueAnalytics: tasks.filter(isTaskOverdue).length,
    highAnalytics: tasks.filter((task) => task.priority === "High").length
  };

  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = value;
  });
}

function createKanbanTask(task) {
  const item = document.createElement("article");
  item.className = `kanban-task${isTaskOverdue(task) ? " task-overdue" : ""}`;
  const assignedStaff = getProfileById(task.assigned_to);
  item.innerHTML = `<div class="board-task-heading"><span class="category-icon"></span><strong></strong></div><p></p><div class="kanban-tags"></div>`;
  item.querySelector(".category-icon").textContent = getCategoryIcon(task.category);
  item.querySelector("strong").textContent = task.title;
  item.querySelector("p").textContent = assignedStaff?.full_name || "Unassigned";
  const tags = item.querySelector(".kanban-tags");
  [task.priority, task.category].forEach((value) => {
    const tag = document.createElement("span");
    tag.textContent = value;
    tags.appendChild(tag);
  });

  if (canChangeTaskStatus(task)) {
    const actions = document.createElement("div");
    actions.className = "kanban-actions";
    VALID_STATUSES.filter((status) => status !== task.status).forEach((status) => {
      const button = document.createElement("button");
      button.className = "secondary-btn small-btn";
      button.textContent = status;
      button.addEventListener("click", () => changeStatus(task.id, status));
      actions.appendChild(button);
    });
    item.appendChild(actions);
  }

  return item;
}

function renderKanban() {
  const columns = {
    "To Do": document.getElementById("kanbanTodo"),
    "In Progress": document.getElementById("kanbanProgress"),
    Done: document.getElementById("kanbanDone")
  };

  Object.values(columns).forEach((column) => { column.innerHTML = ""; });
  tasks.forEach((task) => columns[task.status].appendChild(createKanbanTask(task)));
  document.getElementById("kanbanTodoCount").textContent = tasks.filter((task) => task.status === "To Do").length;
  document.getElementById("kanbanProgressCount").textContent = tasks.filter((task) => task.status === "In Progress").length;
  document.getElementById("kanbanDoneCount").textContent = tasks.filter((task) => task.status === "Done").length;

  Object.entries(columns).forEach(([status, column]) => {
    if (!column.children.length) {
      const empty = document.createElement("p");
      empty.className = "kanban-empty";
      empty.textContent = `No ${status.toLowerCase()} tasks.`;
      column.appendChild(empty);
    }
  });
}

function renderWorkload() {
  workloadList.innerHTML = "";
  getStaffProfiles().forEach((profile) => {
    const assignedTasks = tasks.filter((task) => task.assigned_to === profile.id);
    const activeTasks = assignedTasks.filter((task) => task.status !== "Done");
    const completedTasks = assignedTasks.filter((task) => task.status === "Done");
    const overdueTasks = activeTasks.filter(isTaskOverdue);
    const highTasks = activeTasks.filter((task) => task.priority === "High");
    const loadScore = Math.min(100, activeTasks.length * 20 + overdueTasks.length * 25 + highTasks.length * 10);
    const loadLevel = loadScore > 70 ? "high" : loadScore > 40 ? "medium" : "low";
    const loadLabel = loadLevel === "high" ? "At capacity" : loadLevel === "medium" ? "Balanced" : "Available";
    const row = document.createElement("div");
    row.className = "workload-row";
    row.innerHTML = `<div class="workload-heading"><span class="staff-avatar"></span><div><strong></strong><small></small></div><b></b></div><div class="capacity-track"><span></span></div><div class="workload-metrics"><span></span><span></span><span></span></div>`;
    row.querySelector(".staff-avatar").textContent = profile.full_name.charAt(0).toUpperCase();
    row.querySelector("strong").textContent = profile.full_name;
    row.querySelector("small").textContent = `${assignedTasks.length} total tasks`;
    row.querySelector("b").textContent = loadLabel;
    row.querySelector("b").className = `capacity-label capacity-${loadLevel}`;
    const capacityBar = row.querySelector(".capacity-track span");
    capacityBar.className = `capacity-${loadLevel}`;
    capacityBar.style.width = `${Math.max(loadScore, assignedTasks.length ? 12 : 4)}%`;
    const metricItems = row.querySelectorAll(".workload-metrics span");
    metricItems[0].textContent = `${activeTasks.length} active`;
    metricItems[1].textContent = `${completedTasks.length} completed`;
    metricItems[2].textContent = `${overdueTasks.length} overdue`;
    workloadList.appendChild(row);
  });

  if (!workloadList.children.length) {
    workloadList.textContent = "No Staff accounts are registered.";
  }
}

function renderActivities() {
  activityList.innerHTML = "";
  activities.forEach((activity) => {
    const item = document.createElement("div");
    item.className = "activity-item";
    const summary = activity.task_title ? `${activity.action}: ${activity.task_title}` : activity.action;
    item.innerHTML = `<strong></strong><p></p><time></time>`;
    item.querySelector("strong").textContent = activity.user_name;
    item.querySelector("p").textContent = summary;
    item.querySelector("time").textContent = new Date(activity.created_at).toLocaleString();
    activityList.appendChild(item);
  });

  if (!activities.length) {
    activityList.textContent = "No activity has been recorded yet.";
  }
}

function getClosingSummary() {
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "Done").length,
    carried: tasks.filter((task) => task.status !== "Done").length,
    overdue: tasks.filter(isTaskOverdue).length
  };
}

function renderClosingHistory() {
  closingHistoryList.innerHTML = "";
  closings.forEach((closing) => {
    const item = document.createElement("div");
    item.className = "closing-history-row";
    item.innerHTML = `<div><strong></strong><span></span></div><div class="closing-history-metrics"><span></span><span></span><span></span><span></span></div>`;
    item.querySelector("strong").textContent = formatEnglishDate(closing.business_date);
    item.querySelector("div > span").textContent = `Closed by ${closing.manager_name} at ${new Date(closing.closed_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
    const metrics = item.querySelectorAll(".closing-history-metrics span");
    metrics[0].textContent = `${closing.total_tasks} total`;
    metrics[1].textContent = `${closing.completed_tasks} completed`;
    metrics[2].textContent = `${closing.carried_tasks} carried`;
    metrics[3].textContent = `${closing.overdue_tasks} overdue`;
    closingHistoryList.appendChild(item);
  });
  if (!closings.length) closingHistoryList.textContent = "No business days have been closed yet.";
}

function openCloseDayModal() {
  const summary = getClosingSummary();
  document.getElementById("closingTotal").textContent = summary.total;
  document.getElementById("closingCompleted").textContent = summary.completed;
  document.getElementById("closingCarried").textContent = summary.carried;
  document.getElementById("closingOverdue").textContent = summary.overdue;
  setMessage(closeDayMessage, "", "");
  confirmCloseDayBtn.disabled = closings.some((closing) => closing.business_date === getLocalDateValue());
  if (confirmCloseDayBtn.disabled) setMessage(closeDayMessage, "info", "Today’s operations have already been closed.");
  closeDayModal.classList.remove("hidden");
}

async function closeBusinessDay() {
  if (!isManager() || confirmCloseDayBtn.disabled) return;
  confirmCloseDayBtn.disabled = true;
  confirmCloseDayBtn.textContent = "Closing...";
  const summary = getClosingSummary();
  const closedAt = new Date().toISOString();

  const completedResult = await supabaseClient.from("tasks").update({ archived_at: closedAt }).eq("status", "Done").is("archived_at", null);
  const carriedResult = await supabaseClient.from("tasks").update({ status: "To Do", business_date: getNextBusinessDate() }).neq("status", "Done").is("archived_at", null);

  if (completedResult.error || carriedResult.error) {
    setMessage(closeDayMessage, "error", "Unable to reset today’s tasks. Please try again.");
    confirmCloseDayBtn.disabled = false;
    confirmCloseDayBtn.textContent = "Confirm Closing";
    return;
  }

  const { error } = await supabaseClient.from("daily_closings").insert({
    business_date: getLocalDateValue(),
    manager_id: activeUser.id,
    manager_name: activeUser.full_name,
    total_tasks: summary.total,
    completed_tasks: summary.completed,
    carried_tasks: summary.carried,
    overdue_tasks: summary.overdue
  });

  if (error) {
    setMessage(closeDayMessage, "error", "Tasks were reset, but the closing summary could not be saved.");
    confirmCloseDayBtn.textContent = "Confirm Closing";
    return;
  }

  await recordActivity("Closed today’s operations");
  await loadTasks();
  await loadClosings();
  renderTasks();
  renderClosingHistory();
  closeDayModal.classList.add("hidden");
  confirmCloseDayBtn.textContent = "Confirm Closing";
}

function setTaskView(view) {
  currentView = view;
  const showList = view === "list";
  listView.classList.toggle("hidden", !showList);
  kanbanView.classList.toggle("hidden", showList);
  listViewBtn.classList.toggle("active", showList);
  kanbanViewBtn.classList.toggle("active", !showList);
}

function openTaskDrawer() {
  if (!isManager()) return;
  taskFormCard.classList.remove("hidden");
  taskDrawerBackdrop.classList.remove("hidden");
  document.body.classList.add("drawer-open");
  quickTaskSelect.focus();
}

function closeTaskDrawer() {
  taskFormCard.classList.add("hidden");
  taskDrawerBackdrop.classList.add("hidden");
  document.body.classList.remove("drawer-open");
  taskFormCard.classList.remove("edit-mode");
}

function getErrorMessage(error, fallback) {
  if (!error) {
    return fallback;
  }

  const message = String(error.message || "").toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Incorrect username or password.";
  }

  if (message.includes("already registered") || message.includes("already exists") || message.includes("duplicate")) {
    return "That username is already registered.";
  }

  if (message.includes("password")) {
    return error.message;
  }

  return fallback;
}

function renderAssignmentOptions(selectedId = "") {
  assignedUser.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Unassigned";
  assignedUser.appendChild(defaultOption);

  getStaffProfiles().forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.full_name;
    assignedUser.appendChild(option);
  });

  assignedUser.value = getProfileById(selectedId)?.role === "Staff" ? selectedId : "";
}

function renderStaffFilterOptions() {
  const selectedValue = staffFilter.value;
  staffFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All Staff";
  staffFilter.appendChild(allOption);

  const unassignedOption = document.createElement("option");
  unassignedOption.value = "Unassigned";
  unassignedOption.textContent = "Unassigned";
  staffFilter.appendChild(unassignedOption);

  getStaffProfiles().forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.full_name;
    staffFilter.appendChild(option);
  });

  staffFilter.value = Array.from(staffFilter.options).some((option) => option.value === selectedValue)
    ? selectedValue
    : "All";
}

function updateStats() {
  document.getElementById("todoCount").textContent = tasks.filter((task) => task.status === "To Do").length;
  document.getElementById("progressCount").textContent = tasks.filter((task) => task.status === "In Progress").length;
  document.getElementById("doneCount").textContent = tasks.filter((task) => task.status === "Done").length;
}

function canChangeTaskStatus(task) {
  return isManager() || task.assigned_to === activeUser?.id;
}

function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter.value === "All" || task.status === statusFilter.value;
    const matchesPriority = priorityFilter.value === "All" || task.priority === priorityFilter.value;
    const matchesCategory = categoryFilter.value === "All" || task.category === categoryFilter.value;
    const matchesStaff = staffFilter.value === "All"
      || (staffFilter.value === "Unassigned" ? !getProfileById(task.assigned_to) : task.assigned_to === staffFilter.value);
    const overdue = isTaskOverdue(task);
    const matchesOverdue = overdueFilter.value === "All"
      || (overdueFilter.value === "Overdue" ? overdue : !overdue);

    return matchesStatus && matchesPriority && matchesCategory && matchesStaff && matchesOverdue;
  });

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = isManager()
      ? "No restaurant tasks found. Create a new task or change the filter."
      : "No tasks are currently assigned to your account for this filter.";
    taskList.appendChild(emptyState);
    updateStats();
    updateAnalytics();
    renderKanban();
    if (isManager()) renderWorkload();
    return;
  }

  filteredTasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    const taskTop = document.createElement("div");
    taskTop.className = "task-top";
    const taskInfo = document.createElement("div");
    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;
    const meta = document.createElement("div");
    meta.className = "task-meta";
    const assignedStaff = getProfileById(task.assigned_to);
    const createdDate = new Date(task.created_at).toLocaleDateString();
    const dueDate = formatEnglishDate(task.due_date);
    meta.textContent = `Assigned staff: ${assignedStaff?.full_name || "Unassigned"} | Created: ${createdDate} | Due: ${dueDate}`;
    taskInfo.appendChild(title);
    taskInfo.appendChild(meta);

    const badge = document.createElement("span");
    badge.className = `status-badge ${getStatusClass(task.status)}`;
    badge.textContent = task.status;
    taskTop.appendChild(taskInfo);
    const badges = document.createElement("div");
    badges.className = "task-badges";
    const priorityBadge = document.createElement("span");
    priorityBadge.className = `priority-badge ${getPriorityClass(task.priority)}`;
    priorityBadge.textContent = `${task.priority} Priority`;
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = task.category;
    badges.appendChild(badge);
    badges.appendChild(priorityBadge);
    badges.appendChild(categoryBadge);

    if (isTaskOverdue(task)) {
      const overdueBadge = document.createElement("span");
      overdueBadge.className = "overdue-badge";
      overdueBadge.textContent = "Overdue";
      badges.appendChild(overdueBadge);
      taskItem.classList.add("task-overdue");
    }

    taskTop.appendChild(badges);

    const description = document.createElement("div");
    description.className = "task-desc";
    description.textContent = task.description || "No details provided.";
    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (isManager()) {
      const editButton = document.createElement("button");
      editButton.className = "secondary-btn small-btn";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editTask(task.id));
      actions.appendChild(editButton);
    }

    VALID_STATUSES.forEach((status) => {
      const statusButton = document.createElement("button");
      statusButton.className = "secondary-btn small-btn";
      statusButton.textContent = status;
      statusButton.disabled = !canChangeTaskStatus(task) || task.status === status;
      statusButton.addEventListener("click", () => changeStatus(task.id, status));
      actions.appendChild(statusButton);
    });

    if (isManager()) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "danger-btn small-btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      actions.appendChild(deleteButton);
    }

    taskItem.appendChild(taskTop);
    taskItem.appendChild(description);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);
  });

  updateStats();
  updateAnalytics();
  renderKanban();
  if (isManager()) renderWorkload();
}

function resetTaskForm() {
  editingTaskId = null;
  taskForm.reset();
  renderAssignmentOptions();
  taskStatus.value = "To Do";
  taskPriority.value = "Medium";
  taskCategory.value = "Other";
  renderQuickTaskOptions();
  quickTaskSelect.value = "";
  taskFormCard.classList.remove("edit-mode");
  formTitle.textContent = "Create Task";
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
  setMessage(taskMessage, "", "");
}

function renderApp() {
  const loggedIn = Boolean(activeUser);
  authSection.classList.toggle("hidden", loggedIn);
  appSection.classList.toggle("hidden", !loggedIn);
  document.body.classList.toggle("app-active", loggedIn);
  sideNav.classList.toggle("hidden", !loggedIn);

  if (!loggedIn) {
    return;
  }

  activeUserName.textContent = activeUser.full_name;
  activeUserRole.textContent = `Role: ${activeUser.role}`;
  boardSubtitle.textContent = isManager()
    ? "Managers can create, edit, delete, assign, and review all restaurant tasks."
    : "Staff can only view tasks assigned to their own account and update their task status.";
  newTaskBtn.classList.toggle("hidden", !isManager());
  closeDayBtn.classList.toggle("hidden", !isManager());
  closingHistoryCard.classList.toggle("hidden", !isManager());
  closeTaskDrawer();
  workloadCard.classList.toggle("hidden", !isManager());
  mainGrid.classList.toggle("single-column", !isManager());
  renderAssignmentOptions();
  renderStaffFilterOptions();
  renderTasks();
  renderActivities();
  if (isManager()) renderClosingHistory();
  setTaskView(currentView);
}

async function loadProfiles() {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, full_name, username, role")
    .order("full_name");

  if (error) {
    throw error;
  }

  profiles = data || [];
}

async function loadTasks() {
  const { data, error } = await supabaseClient
    .from("tasks")
    .select("id, title, description, assigned_to, status, priority, category, due_date, business_date, archived_at, created_at")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  tasks = data || [];
}

async function loadActivities() {
  const { data, error } = await supabaseClient
    .from("activity_log")
    .select("id, user_name, action, task_title, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  activities = data || [];
}

async function loadClosings() {
  if (!isManager()) {
    closings = [];
    return;
  }

  const { data, error } = await supabaseClient
    .from("daily_closings")
    .select("id, business_date, manager_name, total_tasks, completed_tasks, carried_tasks, overdue_tasks, closed_at")
    .order("business_date", { ascending: false })
    .limit(10);

  if (error) throw error;
  closings = data || [];
}

function readLegacyTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEGACY_TASKS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function migrateLegacyTasks() {
  if (!isManager() || localStorage.getItem(LEGACY_MIGRATION_KEY) === "complete") {
    return;
  }

  const legacyTasks = readLegacyTasks();

  if (legacyTasks.length === 0) {
    localStorage.setItem(LEGACY_MIGRATION_KEY, "complete");
    return;
  }

  const rows = legacyTasks
    .filter((task) => task && typeof task.title === "string" && task.title.trim())
    .map((task) => {
      const assignedUsername = String(task.assignedTo || task.assignedUsername || "").toLowerCase();
      const assignedProfile = profiles.find(
        (profile) => profile.role === "Staff" && profile.username.toLowerCase() === assignedUsername
      );

      return {
        title: task.title.trim(),
        description: typeof task.description === "string" ? task.description.trim() : "",
        assigned_to: assignedProfile?.id || null,
        status: VALID_STATUSES.includes(task.status) ? task.status : "To Do",
        priority: VALID_PRIORITIES.includes(task.priority) ? task.priority : "Medium",
        category: VALID_CATEGORIES.includes(task.category) ? task.category : "Other",
        due_date: isValidDateValue(task.dueDate) ? task.dueDate || null : null,
        created_by: activeUser.id
      };
    });

  if (rows.length > 0) {
    const { error } = await supabaseClient.from("tasks").insert(rows);

    if (error) {
      throw error;
    }
  }

  localStorage.setItem(LEGACY_MIGRATION_KEY, "complete");
}

async function loadActiveUser(userId) {
  await loadProfiles();
  activeUser = getProfileById(userId);

  if (!activeUser) {
    throw new Error("No profile was found for this account.");
  }

  await migrateLegacyTasks();
  await loadTasks();
  await loadActivities();
  await loadClosings();
}

async function initializeApp() {
  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      throw error;
    }

    if (data.session?.user) {
      await loadActiveUser(data.session.user.id);
    }
  } catch (error) {
    activeUser = null;
    setMessage(authMessage, "error", "Unable to connect to the application database.");
  }

  resetTaskForm();
  renderApp();
}

function editTask(id) {
  if (!isManager()) {
    return;
  }

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  editingTaskId = id;
  ensureTaskTemplate(task.title);
  taskTitle.value = task.title;
  renderQuickTaskOptions();
  quickTaskSelect.value = task.title;
  taskDescription.value = task.description;
  renderAssignmentOptions(task.assigned_to);
  taskStatus.value = task.status;
  taskPriority.value = VALID_PRIORITIES.includes(task.priority) ? task.priority : "Medium";
  taskCategory.value = VALID_CATEGORIES.includes(task.category) ? task.category : "Other";
  taskDueDate.value = task.due_date || "";
  formTitle.textContent = "Update Assigned Task";
  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
  setMessage(taskMessage, "info", "Editing selected task.");
  taskFormCard.classList.add("edit-mode");
  openTaskDrawer();
}

async function deleteTask(id) {
  if (!isManager()) {
    return;
  }

  const targetTask = tasks.find((task) => task.id === id);
  const { error } = await supabaseClient.from("tasks").delete().eq("id", id);

  if (error) {
    setMessage(taskMessage, "error", "Unable to delete the task.");
    return;
  }

  await loadTasks();
  await recordActivity("Task deleted", targetTask?.title || "Deleted task");
  resetTaskForm();
  renderTasks();
}

async function changeStatus(id, status) {
  const targetTask = tasks.find((task) => task.id === id);

  if (!targetTask || !VALID_STATUSES.includes(status) || !canChangeTaskStatus(targetTask)) {
    return;
  }

  const { error } = await supabaseClient.from("tasks").update({ status }).eq("id", id);

  if (error) {
    setMessage(taskMessage, "error", "Unable to update the task status.");
    return;
  }

  await loadTasks();
  await recordActivity(`Task status changed to ${status}`, targetTask.title);
  renderTasks();
}

loginTab.addEventListener("click", () => {
  switchAuthTab("login");
  setMessage(authMessage, "", "");
});

registerTab.addEventListener("click", () => {
  switchAuthTab("register");
  setMessage(authMessage, "", "");
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) {
    setMessage(authMessage, "error", "Please enter both username and password.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: usernameToEmail(username),
    password
  });

  if (error) {
    setMessage(authMessage, "error", getErrorMessage(error, "Unable to log in."));
    return;
  }

  try {
    await loadActiveUser(data.user.id);
    await recordActivity("Logged in");
    loginForm.reset();
    setMessage(authMessage, "", "");
    resetTaskForm();
    renderApp();
  } catch (loadError) {
    await supabaseClient.auth.signOut({ scope: "local" });
    setMessage(authMessage, "error", "Unable to load this account profile.");
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = registerFullName.value.trim();
  const username = registerUsername.value.trim();
  const password = registerPassword.value;
  const role = registerRole.value === "Manager" ? "Manager" : "Staff";

  if (!fullName || !username || !password) {
    setMessage(authMessage, "error", "Full name, username, and password are required.");
    return;
  }

  if (!isValidUsername(username)) {
    setMessage(authMessage, "error", "Username may only contain letters, numbers, dots, hyphens, and underscores.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: usernameToEmail(username),
    password,
    options: {
      data: {
        full_name: fullName,
        username: normalizeUsername(username),
        role
      }
    }
  });

  if (error) {
    setMessage(authMessage, "error", getErrorMessage(error, "Unable to create the account."));
    return;
  }

  if (!data.session) {
    setMessage(authMessage, "error", "Disable Confirm email in Supabase Auth settings, then register again.");
    return;
  }

  await supabaseClient.from("activity_log").insert({
    user_id: data.user.id,
    user_name: fullName,
    action: "User registered"
  });

  await supabaseClient.auth.signOut({ scope: "local" });
  registerForm.reset();
  registerRole.value = "Manager";
  switchAuthTab("login");
  setMessage(authMessage, "success", "Registration successful. Please log in.");
});

logoutBtn.addEventListener("click", async () => {
  await supabaseClient.auth.signOut({ scope: "local" });
  activeUser = null;
  profiles = [];
  tasks = [];
  activities = [];
  closings = [];
  editingTaskId = null;
  currentView = "list";
  loginForm.reset();
  registerForm.reset();
  resetTaskForm();
  renderApp();
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isManager()) {
    setMessage(taskMessage, "error", "Only managers can create or edit tasks.");
    return;
  }

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const assignedTo = getProfileById(assignedUser.value)?.role === "Staff" ? assignedUser.value : null;
  const status = VALID_STATUSES.includes(taskStatus.value) ? taskStatus.value : "To Do";
  const priority = taskPriority.value;
  const category = taskCategory.value;
  const dueDate = taskDueDate.value;

  if (!title) {
    setMessage(taskMessage, "error", "Please enter a restaurant task title.");
    return;
  }

  if (assignedUser.value && !assignedTo) {
    setMessage(taskMessage, "error", "Please select a registered Staff account or Unassigned.");
    return;
  }

  if (!VALID_STATUSES.includes(taskStatus.value)) {
    setMessage(taskMessage, "error", "Please select a valid task status.");
    return;
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    setMessage(taskMessage, "error", "Please select a valid task priority.");
    return;
  }

  if (!VALID_CATEGORIES.includes(category)) {
    setMessage(taskMessage, "error", "Please select a valid task category.");
    return;
  }

  if (!isValidDateValue(dueDate)) {
    setMessage(taskMessage, "error", "Please select a valid due date.");
    return;
  }

  const taskData = {
    title,
    description,
    assigned_to: assignedTo,
    status,
    priority,
    category,
    due_date: dueDate || null
  };

  const previousTask = tasks.find((task) => task.id === editingTaskId);

  const result = editingTaskId
    ? await supabaseClient.from("tasks").update(taskData).eq("id", editingTaskId)
    : await supabaseClient.from("tasks").insert({ ...taskData, created_by: activeUser.id });

  if (result.error) {
    setMessage(taskMessage, "error", "Unable to save the task.");
    return;
  }

  await loadTasks();
  await recordActivity(editingTaskId ? "Task edited" : "Task created", title);

  if (previousTask?.assigned_to !== assignedTo && editingTaskId) {
    await recordActivity(`Task reassigned to ${getProfileById(assignedTo)?.full_name || "Unassigned"}`, title);
  } else if (!editingTaskId && assignedTo) {
    await recordActivity(`Task assigned to ${getProfileById(assignedTo)?.full_name}`, title);
  }
  resetTaskForm();
  closeTaskDrawer();
  renderTasks();
});

cancelEditBtn.addEventListener("click", () => {
  resetTaskForm();
  closeTaskDrawer();
});
newTaskBtn.addEventListener("click", () => {
  resetTaskForm();
  openTaskDrawer();
});
closeTaskDrawerBtn.addEventListener("click", () => {
  resetTaskForm();
  closeTaskDrawer();
});
taskDrawerBackdrop.addEventListener("click", () => {
  resetTaskForm();
  closeTaskDrawer();
});
quickTaskSelect.addEventListener("change", () => {
  taskTitle.value = quickTaskSelect.value;
  if (quickTaskSelect.value) taskDescription.focus();
});
manageTaskTemplatesBtn.addEventListener("click", () => {
  editingTemplateIndex = null;
  taskTemplateInput.value = "";
  saveTaskTemplateBtn.textContent = "Add Task";
  taskTemplateMessage.textContent = "";
  renderTaskTemplateList();
  taskTemplateModal.classList.remove("hidden");
  taskTemplateInput.focus();
});
closeTaskTemplateModalBtn.addEventListener("click", () => taskTemplateModal.classList.add("hidden"));
taskTemplateModal.addEventListener("click", (event) => {
  if (event.target === taskTemplateModal) taskTemplateModal.classList.add("hidden");
});
taskTemplateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTemplateInput.value.trim();
  const templates = getTaskTemplates();

  if (!title) {
    taskTemplateMessage.textContent = "Enter a task name.";
    return;
  }

  const duplicateIndex = templates.findIndex((item) => item.toLowerCase() === title.toLowerCase());
  if (duplicateIndex !== -1 && duplicateIndex !== editingTemplateIndex) {
    taskTemplateMessage.textContent = "This task option already exists.";
    return;
  }

  if (editingTemplateIndex === null) {
    templates.push(title);
  } else {
    const previousTitle = templates[editingTemplateIndex];
    templates[editingTemplateIndex] = title;
    if (taskTitle.value === previousTitle) taskTitle.value = title;
  }

  saveTaskTemplates(templates);
  editingTemplateIndex = null;
  taskTemplateInput.value = "";
  saveTaskTemplateBtn.textContent = "Add Task";
  taskTemplateMessage.textContent = "Task options updated.";
  renderTaskTemplateList();
  renderQuickTaskOptions();
});
closeDayBtn.addEventListener("click", openCloseDayModal);
closeCloseDayModalBtn.addEventListener("click", () => closeDayModal.classList.add("hidden"));
cancelCloseDayBtn.addEventListener("click", () => closeDayModal.classList.add("hidden"));
closeDayModal.addEventListener("click", (event) => {
  if (event.target === closeDayModal) closeDayModal.classList.add("hidden");
});
confirmCloseDayBtn.addEventListener("click", closeBusinessDay);
statusFilter.addEventListener("change", renderTasks);
[priorityFilter, categoryFilter, staffFilter, overdueFilter].forEach((filter) => {
  filter.addEventListener("change", renderTasks);
});
clearFiltersBtn.addEventListener("click", () => {
  statusFilter.value = "All";
  priorityFilter.value = "All";
  categoryFilter.value = "All";
  staffFilter.value = "All";
  overdueFilter.value = "All";
  renderTasks();
});
listViewBtn.addEventListener("click", () => setTaskView("list"));
kanbanViewBtn.addEventListener("click", () => setTaskView("kanban"));

switchAuthTab("login");
initializeApp();
