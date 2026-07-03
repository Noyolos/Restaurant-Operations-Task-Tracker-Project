const USERS_STORAGE_KEY = "users";
const SESSION_STORAGE_KEY = "activeSession";
const TASKS_STORAGE_KEY = "tasks";
const VALID_STATUSES = ["To Do", "In Progress", "Done"];

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
const taskList = document.getElementById("taskList");
const statusFilter = document.getElementById("statusFilter");
const taskMessage = document.getElementById("taskMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let users = normalizeUsers(readStoredArray(USERS_STORAGE_KEY));
let tasks = normalizeTasks(readStoredArray(TASKS_STORAGE_KEY));
let activeUser = restoreSession();
let editingTaskId = null;

saveUsers();
saveTasks();

function readStoredArray(key) {
  try {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    return [];
  }
}

function readStoredObject(key) {
  try {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch (error) {
    return null;
  }
}

function normalizeRole(role) {
  return role === "Manager" ? "Manager" : "Staff";
}

function normalizeUsers(rawUsers) {
  const seenUsernames = new Set();

  return rawUsers.reduce((result, user) => {
    if (!user || typeof user !== "object") {
      return result;
    }

    const fullName = typeof user.fullName === "string" ? user.fullName.trim() : "";
    const username = typeof user.username === "string" ? user.username.trim() : "";
    const password = typeof user.password === "string" ? user.password : "";
    const role = normalizeRole(user.role);
    const usernameKey = username.toLowerCase();

    if (!fullName || !username || !password || seenUsernames.has(usernameKey)) {
      return result;
    }

    seenUsernames.add(usernameKey);
    result.push({
      id: user.id || usernameKey,
      fullName,
      username,
      usernameKey,
      password,
      role
    });

    return result;
  }, []);
}

function normalizeAssignedUsername(value) {
  if (typeof value !== "string") {
    return "";
  }

  const cleanedValue = value.trim().toLowerCase();

  if (!cleanedValue) {
    return "";
  }

  const matchingStaff = users.find(
    (user) => user.role === "Staff" && user.usernameKey === cleanedValue
  );

  return matchingStaff ? matchingStaff.username : "";
}

function normalizeTasks(rawTasks) {
  return rawTasks.reduce((result, task, index) => {
    if (!task || typeof task !== "object") {
      return result;
    }

    const title = typeof task.title === "string" ? task.title.trim() : "";

    if (!title) {
      return result;
    }

    const description = typeof task.description === "string" ? task.description.trim() : "";
    const status = VALID_STATUSES.includes(task.status) ? task.status : "To Do";
    const assignedTo = normalizeAssignedUsername(
      task.assignedTo || task.assignedUsername || task.assignedUser || ""
    );

    result.push({
      id: task.id || Date.now() + index,
      title,
      description,
      assignedTo,
      status,
      createdAt: typeof task.createdAt === "string" && task.createdAt.trim()
        ? task.createdAt
        : new Date().toLocaleDateString()
    });

    return result;
  }, []);
}

function saveUsers() {
  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(
      users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        password: user.password,
        role: user.role
      }))
    )
  );
}

function saveTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function saveSession(user) {
  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({
      username: user.username
    })
  );
}

function restoreSession() {
  const session = readStoredObject(SESSION_STORAGE_KEY);

  if (!session || typeof session.username !== "string") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  const matchingUser = getUserByUsername(session.username);

  if (!matchingUser) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  return matchingUser;
}

function getUserByUsername(username) {
  if (typeof username !== "string") {
    return null;
  }

  const usernameKey = username.trim().toLowerCase();
  return users.find((user) => user.usernameKey === usernameKey) || null;
}

function getStaffUsers() {
  return users.filter((user) => user.role === "Staff");
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

function isManager() {
  return activeUser && activeUser.role === "Manager";
}

function isStaff() {
  return activeUser && activeUser.role === "Staff";
}

function getAssignedStaffName(username) {
  const assignedStaff = getUserByUsername(username);
  return assignedStaff && assignedStaff.role === "Staff"
    ? assignedStaff.fullName
    : "Unassigned";
}

function canViewTask(task) {
  if (!activeUser) {
    return false;
  }

  if (isManager()) {
    return true;
  }

  return activeUser.usernameKey === String(task.assignedTo || "").toLowerCase();
}

function canEditOrDeleteTasks() {
  return isManager();
}

function canAssignTasks() {
  return isManager();
}

function canChangeTaskStatus(task) {
  if (!activeUser) {
    return false;
  }

  if (isManager()) {
    return true;
  }

  return activeUser.usernameKey === String(task.assignedTo || "").toLowerCase();
}

function getVisibleTasks() {
  return tasks.filter((task) => canViewTask(task));
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

function renderAssignmentOptions(selectedUsername = "") {
  assignedUser.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Unassigned";
  assignedUser.appendChild(defaultOption);

  getStaffUsers().forEach((staffUser) => {
    const option = document.createElement("option");
    option.value = staffUser.username;
    option.textContent = staffUser.fullName;
    assignedUser.appendChild(option);
  });

  assignedUser.value = getUserByUsername(selectedUsername)?.role === "Staff"
    ? getUserByUsername(selectedUsername).username
    : "";
}

function updateStats() {
  const visibleTasks = getVisibleTasks();
  const todoCount = visibleTasks.filter((task) => task.status === "To Do").length;
  const progressCount = visibleTasks.filter((task) => task.status === "In Progress").length;
  const doneCount = visibleTasks.filter((task) => task.status === "Done").length;

  document.getElementById("todoCount").textContent = todoCount;
  document.getElementById("progressCount").textContent = progressCount;
  document.getElementById("doneCount").textContent = doneCount;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (!activeUser) {
    updateStats();
    return;
  }

  const selectedFilter = statusFilter.value;
  const visibleTasks = getVisibleTasks();
  const filteredTasks = selectedFilter === "All"
    ? visibleTasks
    : visibleTasks.filter((task) => task.status === selectedFilter);

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
    meta.textContent = `Assigned staff: ${getAssignedStaffName(task.assignedTo)} | Created: ${task.createdAt}`;

    taskInfo.appendChild(title);
    taskInfo.appendChild(meta);

    const badge = document.createElement("span");
    badge.className = `status-badge ${getStatusClass(task.status)}`;
    badge.textContent = task.status;

    taskTop.appendChild(taskInfo);
    taskTop.appendChild(badge);

    const description = document.createElement("div");
    description.className = "task-desc";
    description.textContent = task.description || "No details provided.";

    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (canEditOrDeleteTasks()) {
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

    if (canEditOrDeleteTasks()) {
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
  renderAssignmentOptions("");
  taskStatus.value = "To Do";
  formTitle.textContent = "Create Restaurant Task";
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
  setMessage(taskMessage, "", "");
}

function editTask(id) {
  if (!canEditOrDeleteTasks()) {
    return;
  }

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  editingTaskId = id;
  taskTitle.value = task.title;
  taskDescription.value = task.description;
  renderAssignmentOptions(task.assignedTo);
  taskStatus.value = task.status;

  formTitle.textContent = "Edit Restaurant Task";
  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
  setMessage(taskMessage, "info", "Editing selected task.");
}

function deleteTask(id) {
  if (!canEditOrDeleteTasks()) {
    return;
  }

  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
  resetTaskForm();
}

function changeStatus(id, status) {
  const targetTask = tasks.find((task) => task.id === id);

  if (!targetTask || !canChangeTaskStatus(targetTask)) {
    return;
  }

  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function renderApp() {
  const loggedIn = Boolean(activeUser);
  authSection.classList.toggle("hidden", loggedIn);
  appSection.classList.toggle("hidden", !loggedIn);

  if (!loggedIn) {
    return;
  }

  const managerView = isManager();

  activeUserName.textContent = activeUser.fullName;
  activeUserRole.textContent = `Role: ${activeUser.role}`;
  boardSubtitle.textContent = managerView
    ? "Managers can create, edit, delete, assign, and review all restaurant tasks."
    : "Staff can only view tasks assigned to their own account and update their task status.";

  taskFormCard.classList.toggle("hidden", !managerView);
  mainGrid.classList.toggle("single-column", !managerView);
  renderAssignmentOptions(assignedUser.value);
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) {
    setMessage(authMessage, "error", "Please enter both username and password.");
    return;
  }

  const matchingUser = getUserByUsername(username);

  if (!matchingUser || matchingUser.password !== password) {
    setMessage(authMessage, "error", "Incorrect username or password.");
    return;
  }

  activeUser = matchingUser;
  saveSession(activeUser);
  loginForm.reset();
  setMessage(authMessage, "", "");
  resetTaskForm();
  renderApp();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = registerFullName.value.trim();
  const username = registerUsername.value.trim();
  const password = registerPassword.value;
  const role = normalizeRole(registerRole.value);

  if (!fullName || !username || !password) {
    setMessage(authMessage, "error", "Full name, username, and password are required.");
    return;
  }

  if (getUserByUsername(username)) {
    setMessage(authMessage, "error", "That username is already registered.");
    return;
  }

  users.push({
    id: username.toLowerCase(),
    fullName,
    username,
    usernameKey: username.toLowerCase(),
    password,
    role
  });

  users = normalizeUsers(users);
  tasks = normalizeTasks(tasks);
  saveUsers();
  saveTasks();
  registerForm.reset();
  registerRole.value = "Manager";
  switchAuthTab("login");
  setMessage(authMessage, "success", "Registration successful. Please log in.");
});

logoutBtn.addEventListener("click", () => {
  activeUser = null;
  editingTaskId = null;
  localStorage.removeItem(SESSION_STORAGE_KEY);
  loginForm.reset();
  registerForm.reset();
  resetTaskForm();
  renderApp();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isManager()) {
    setMessage(taskMessage, "error", "Only managers can create or edit tasks.");
    return;
  }

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const selectedAssignee = normalizeAssignedUsername(assignedUser.value);

  if (!title) {
    setMessage(taskMessage, "error", "Please enter a restaurant task title.");
    return;
  }

  if (editingTaskId !== null) {
    tasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title,
          description,
          assignedTo: selectedAssignee,
          status: taskStatus.value
        };
      }

      return task;
    });
  } else {
    tasks.push({
      id: Date.now(),
      title,
      description,
      assignedTo: selectedAssignee,
      status: taskStatus.value,
      createdAt: new Date().toLocaleDateString()
    });
  }

  saveTasks();
  renderTasks();
  resetTaskForm();
});

cancelEditBtn.addEventListener("click", resetTaskForm);
statusFilter.addEventListener("change", renderTasks);

switchAuthTab("login");
resetTaskForm();
renderApp();
