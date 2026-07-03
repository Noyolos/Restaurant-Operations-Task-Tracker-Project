const TASKS_STORAGE_KEY = "tasks";
const USERS_STORAGE_KEY = "registeredUsers";
const SESSION_STORAGE_KEY = "activeUserSession";
const VALID_ROLES = ["Manager", "Staff"];
const VALID_STATUSES = ["To Do", "In Progress", "Done"];

const authScreen = document.getElementById("authScreen");
const appScreen = document.getElementById("appScreen");
const sessionPanel = document.getElementById("sessionPanel");
const sessionName = document.getElementById("sessionName");
const sessionRole = document.getElementById("sessionRole");
const logoutBtn = document.getElementById("logoutBtn");
const authMessage = document.getElementById("authMessage");
const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const registerForm = document.getElementById("registerForm");
const registerFullName = document.getElementById("registerFullName");
const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");
const registerRole = document.getElementById("registerRole");

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const assignedUser = document.getElementById("assignedUser");
const taskStatus = document.getElementById("taskStatus");
const taskList = document.getElementById("taskList");
const statusFilter = document.getElementById("statusFilter");
const errorMessage = document.getElementById("errorMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let tasks = sanitizeTasks(readStorageValue(TASKS_STORAGE_KEY, []));
let users = sanitizeUsers(readStorageValue(USERS_STORAGE_KEY, []));
let activeUser = null;
let editingTaskId = null;

saveTasks();
restoreActiveSession();

function readStorageValue(key, fallbackValue) {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return fallbackValue;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue ?? fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function writeStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function sanitizeTasks(storedTasks) {
  if (!Array.isArray(storedTasks)) {
    return [];
  }

  return storedTasks
    .filter((task) => task && typeof task === "object")
    .map((task, index) => ({
      ...task,
      id: task.id ?? `legacy-task-${index + 1}`,
      title: typeof task.title === "string" && task.title.trim() !== "" ? task.title.trim() : "Untitled Task",
      description: typeof task.description === "string" ? task.description.trim() : "",
      assignedTo:
        typeof task.assignedTo === "string" && task.assignedTo.trim() !== ""
          ? task.assignedTo.trim()
          : "Unassigned Staff",
      status: VALID_STATUSES.includes(task.status) ? task.status : "To Do",
      createdAt:
        typeof task.createdAt === "string" && task.createdAt.trim() !== ""
          ? task.createdAt
          : new Date().toLocaleDateString()
    }));
}

function sanitizeUsers(storedUsers) {
  if (!Array.isArray(storedUsers)) {
    return [];
  }

  return storedUsers
    .filter((user) => user && typeof user === "object")
    .map((user) => ({
      fullName: typeof user.fullName === "string" ? user.fullName.trim() : "",
      username: typeof user.username === "string" ? user.username.trim() : "",
      password: typeof user.password === "string" ? user.password : "",
      role: VALID_ROLES.includes(user.role) ? user.role : "Staff"
    }))
    .filter((user) => user.fullName !== "" && user.username !== "" && user.password !== "");
}

function getUsernameKey(username) {
  return username.trim().toLowerCase();
}

function findUserByUsername(username) {
  const usernameKey = getUsernameKey(username);
  return users.find((user) => getUsernameKey(user.username) === usernameKey);
}

function saveTasks() {
  writeStorageValue(TASKS_STORAGE_KEY, tasks);
}

function saveUsers() {
  writeStorageValue(USERS_STORAGE_KEY, users);
}

function restoreActiveSession() {
  const storedSession = readStorageValue(SESSION_STORAGE_KEY, null);

  if (!storedSession || typeof storedSession !== "object" || typeof storedSession.username !== "string") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  const matchedUser = findUserByUsername(storedSession.username);

  if (!matchedUser) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  activeUser = matchedUser;
}

function setActiveUser(user) {
  activeUser = user;
  writeStorageValue(SESSION_STORAGE_KEY, {
    username: user.username
  });
  updateInterface();
}

function clearActiveUser() {
  activeUser = null;
  localStorage.removeItem(SESSION_STORAGE_KEY);
  updateInterface();
}

function showAuthMessage(message, type) {
  authMessage.textContent = message;
  authMessage.className = "auth-message";
  authMessage.classList.add(type === "success" ? "is-success" : "is-error");
}

function hideAuthMessage() {
  authMessage.textContent = "";
  authMessage.className = "auth-message hidden";
}

function setAuthMode(mode, options = {}) {
  const isLoginMode = mode === "login";
  const shouldClearMessage = options.clearMessage !== false;

  loginForm.classList.toggle("hidden", !isLoginMode);
  registerForm.classList.toggle("hidden", isLoginMode);
  showLoginBtn.classList.toggle("active", isLoginMode);
  showRegisterBtn.classList.toggle("active", !isLoginMode);

  if (shouldClearMessage) {
    hideAuthMessage();
  }
}

function updateInterface() {
  const isLoggedIn = activeUser !== null;

  authScreen.classList.toggle("hidden", isLoggedIn);
  appScreen.classList.toggle("hidden", !isLoggedIn);
  sessionPanel.classList.toggle("hidden", !isLoggedIn);

  if (isLoggedIn) {
    sessionName.textContent = activeUser.fullName;
    sessionRole.textContent = activeUser.role;
    return;
  }

  sessionName.textContent = "User Name";
  sessionRole.textContent = "Role";
}

function showTaskError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideTaskError() {
  errorMessage.style.display = "none";
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

function updateStats() {
  const todoCount = tasks.filter((task) => task.status === "To Do").length;
  const progressCount = tasks.filter((task) => task.status === "In Progress").length;
  const doneCount = tasks.filter((task) => task.status === "Done").length;

  document.getElementById("todoCount").textContent = todoCount;
  document.getElementById("progressCount").textContent = progressCount;
  document.getElementById("doneCount").textContent = doneCount;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks =
    statusFilter.value === "All" ? tasks : tasks.filter((task) => task.status === statusFilter.value);

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No restaurant tasks found. Create a new task or change the filter.";
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
    meta.textContent = `Assigned staff: ${task.assignedTo} | Created: ${task.createdAt}`;

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

    const editButton = document.createElement("button");
    editButton.className = "secondary-btn small-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(task.id));

    const todoButton = document.createElement("button");
    todoButton.className = "secondary-btn small-btn";
    todoButton.textContent = "To Do";
    todoButton.addEventListener("click", () => changeStatus(task.id, "To Do"));

    const progressButton = document.createElement("button");
    progressButton.className = "secondary-btn small-btn";
    progressButton.textContent = "In Progress";
    progressButton.addEventListener("click", () => changeStatus(task.id, "In Progress"));

    const doneButton = document.createElement("button");
    doneButton.className = "secondary-btn small-btn";
    doneButton.textContent = "Done";
    doneButton.addEventListener("click", () => changeStatus(task.id, "Done"));

    const deleteButton = document.createElement("button");
    deleteButton.className = "danger-btn small-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(editButton);
    actions.appendChild(todoButton);
    actions.appendChild(progressButton);
    actions.appendChild(doneButton);
    actions.appendChild(deleteButton);

    taskItem.appendChild(taskTop);
    taskItem.appendChild(description);
    taskItem.appendChild(actions);

    taskList.appendChild(taskItem);
  });

  updateStats();
}

function resetForm() {
  editingTaskId = null;
  taskForm.reset();
  taskStatus.value = "To Do";
  formTitle.textContent = "Create Restaurant Task";
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
  hideTaskError();
}

function editTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  editingTaskId = id;

  taskTitle.value = task.title;
  taskDescription.value = task.description || "";
  assignedUser.value = task.assignedTo;
  taskStatus.value = task.status;

  formTitle.textContent = "Edit Restaurant Task";
  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
  resetForm();
}

function changeStatus(id, status) {
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usernameValue = loginUsername.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (usernameValue === "" || passwordValue === "") {
    showAuthMessage("Please enter both username and password.", "error");
    return;
  }

  const matchedUser = findUserByUsername(usernameValue);

  if (!matchedUser || matchedUser.password !== passwordValue) {
    showAuthMessage("Incorrect username or password.", "error");
    return;
  }

  loginForm.reset();
  hideAuthMessage();
  setActiveUser(matchedUser);
  renderTasks();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullNameValue = registerFullName.value.trim();
  const usernameValue = registerUsername.value.trim();
  const passwordValue = registerPassword.value.trim();
  const roleValue = registerRole.value;

  if (fullNameValue === "" || usernameValue === "" || passwordValue === "" || roleValue === "") {
    showAuthMessage("Please complete full name, username, password, and role.", "error");
    return;
  }

  if (findUserByUsername(usernameValue)) {
    showAuthMessage("That username is already registered. Please choose another username.", "error");
    return;
  }

  users.push({
    fullName: fullNameValue,
    username: usernameValue,
    password: passwordValue,
    role: roleValue
  });

  saveUsers();
  registerForm.reset();
  setAuthMode("login", {
    clearMessage: false
  });
  loginUsername.value = usernameValue;
  loginPassword.value = "";
  showAuthMessage("Registration successful. Please log in with your new account.", "success");
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (taskTitle.value.trim() === "") {
    showTaskError("Please enter a restaurant task title.");
    return;
  }

  hideTaskError();

  if (editingTaskId !== null) {
    tasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title: taskTitle.value.trim(),
          description: taskDescription.value.trim(),
          assignedTo: assignedUser.value.trim() || "Unassigned Staff",
          status: taskStatus.value
        };
      }

      return task;
    });
  } else {
    tasks.push({
      id: Date.now(),
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      assignedTo: assignedUser.value.trim() || "Unassigned Staff",
      status: taskStatus.value,
      createdAt: new Date().toLocaleDateString()
    });
  }

  saveTasks();
  renderTasks();
  resetForm();
});

showLoginBtn.addEventListener("click", () => setAuthMode("login"));
showRegisterBtn.addEventListener("click", () => setAuthMode("register"));
logoutBtn.addEventListener("click", () => {
  clearActiveUser();
  loginForm.reset();
  registerForm.reset();
  setAuthMode("login");
  resetForm();
});
cancelEditBtn.addEventListener("click", resetForm);
statusFilter.addEventListener("change", renderTasks);

setAuthMode("login");
updateInterface();
renderTasks();
