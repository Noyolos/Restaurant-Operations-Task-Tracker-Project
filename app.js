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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

/*
  This migration keeps older Iteration 1 tasks usable.
  Iteration 1 only had title and description.
  Iteration 2 adds assigned user and status.
*/
tasks = tasks.map((task) => ({
  ...task,
  assignedTo: task.assignedTo || "Unassigned Staff",
  status: task.status || "To Do",
  createdAt: task.createdAt || new Date().toLocaleDateString()
}));

saveTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

  const selectedFilter = statusFilter.value;

  const filteredTasks =
    selectedFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === selectedFilter);

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
    meta.textContent = `Assigned staff: ${task.assignedTo || "Unassigned Staff"} | Created: ${task.createdAt}`;

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
  errorMessage.style.display = "none";
}

function editTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  editingTaskId = id;

  taskTitle.value = task.title;
  taskDescription.value = task.description;
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

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (taskTitle.value.trim() === "") {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

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
    const newTask = {
      id: Date.now(),
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      assignedTo: assignedUser.value.trim() || "Unassigned Staff",
      status: taskStatus.value,
      createdAt: new Date().toLocaleDateString()
    };

    tasks.push(newTask);
  }

  saveTasks();
  renderTasks();
  resetForm();
});

cancelEditBtn.addEventListener("click", resetForm);
statusFilter.addEventListener("change", renderTasks);

renderTasks();