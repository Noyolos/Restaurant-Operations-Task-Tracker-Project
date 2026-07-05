const SUPABASE_URL = "https://tcsvafdvnyttxptlgapk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc3ZhZmR2bnl0dHhwdGxnYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODc1OTksImV4cCI6MjA5ODY2MzU5OX0.23zk-m--_LLBuQdAKXD9UGy-hD92SnJNWP7TCn41nz4";
const LEGACY_TASKS_STORAGE_KEY = "tasks";
const LEGACY_MIGRATION_KEY = "supabaseTasksMigrated";
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
const taskMessage = document.getElementById("taskMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let profiles = [];
let tasks = [];
let activeUser = null;
let editingTaskId = null;

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
    const dueDate = task.due_date ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString() : "No due date";
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
}

function resetTaskForm() {
  editingTaskId = null;
  taskForm.reset();
  renderAssignmentOptions();
  taskStatus.value = "To Do";
  taskPriority.value = "Medium";
  taskCategory.value = "Other";
  formTitle.textContent = "Create Restaurant Task";
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
  setMessage(taskMessage, "", "");
}

function renderApp() {
  const loggedIn = Boolean(activeUser);
  authSection.classList.toggle("hidden", loggedIn);
  appSection.classList.toggle("hidden", !loggedIn);

  if (!loggedIn) {
    return;
  }

  activeUserName.textContent = activeUser.full_name;
  activeUserRole.textContent = `Role: ${activeUser.role}`;
  boardSubtitle.textContent = isManager()
    ? "Managers can create, edit, delete, assign, and review all restaurant tasks."
    : "Staff can only view tasks assigned to their own account and update their task status.";
  taskFormCard.classList.toggle("hidden", !isManager());
  mainGrid.classList.toggle("single-column", !isManager());
  renderAssignmentOptions();
  renderStaffFilterOptions();
  renderTasks();
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
    .select("id, title, description, assigned_to, status, priority, category, due_date, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  tasks = data || [];
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
  taskTitle.value = task.title;
  taskDescription.value = task.description;
  renderAssignmentOptions(task.assigned_to);
  taskStatus.value = task.status;
  taskPriority.value = VALID_PRIORITIES.includes(task.priority) ? task.priority : "Medium";
  taskCategory.value = VALID_CATEGORIES.includes(task.category) ? task.category : "Other";
  taskDueDate.value = task.due_date || "";
  formTitle.textContent = "Edit Restaurant Task";
  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
  setMessage(taskMessage, "info", "Editing selected task.");
}

async function deleteTask(id) {
  if (!isManager()) {
    return;
  }

  const { error } = await supabaseClient.from("tasks").delete().eq("id", id);

  if (error) {
    setMessage(taskMessage, "error", "Unable to delete the task.");
    return;
  }

  await loadTasks();
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
  editingTaskId = null;
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

  const result = editingTaskId
    ? await supabaseClient.from("tasks").update(taskData).eq("id", editingTaskId)
    : await supabaseClient.from("tasks").insert({ ...taskData, created_by: activeUser.id });

  if (result.error) {
    setMessage(taskMessage, "error", "Unable to save the task.");
    return;
  }

  await loadTasks();
  resetTaskForm();
  renderTasks();
});

cancelEditBtn.addEventListener("click", resetTaskForm);
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

switchAuthTab("login");
initializeApp();
