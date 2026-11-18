import { renderProject } from "./dom.js";
import { getProject, getProjectNames, addTodo, addProject, editTodo } from "./todo.js";

// Cached DOM elements for Task Modal
const taskModal = document.querySelector("#task-modal");
const taskForm = document.querySelector("#task-form");
const modalHeading = document.querySelector("#task-modal .modal-header h3");
const submitTaskBtn = document.querySelector("#submit-task-btn");
const addTaskBtn = document.querySelector("#add-task-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cancelModalBtn = document.querySelector("#cancel-modal-btn");

// Task form inputs
const titleInput = document.querySelector("#task-title");
const descInput = document.querySelector("#task-desc");
const dueInput = document.querySelector("#task-due");
const prioritySelect = document.querySelector("#task-priority");
const projectSelect = document.querySelector("#task-project");
const notesInput = document.querySelector("#task-notes");

let currentEditingTask = null;

// ==========================================
// Helper Functions
// ==========================================

function getActiveProjectName() {
  const activeBtn = document.querySelector("aside .active");
  const activeProjectName = activeBtn ? activeBtn.textContent.trim().toLowerCase() : "inbox";
  return activeProjectName !== "all" && getProject(activeProjectName) !== "No Project Found"
    ? activeProjectName
    : "inbox";
}

function populateProjectsDropdown() {
  projectSelect.innerHTML = "";
  getProjectNames().forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    projectSelect.appendChild(option);
  });
}

// ==========================================
// Task Modal: Open Logic (Add & Edit)
// ==========================================

/**
 * Opens task modal in either Add mode (task = null) or Edit mode (task = object)
 */
export function openTaskModal(task = null) {
  currentEditingTask = task;

  // 1. Refresh project options and set active selection
  populateProjectsDropdown();
  projectSelect.value = getActiveProjectName();

  // 2. Set mode-specific UI and values
  if (task) {
    modalHeading.textContent = "Edit Task";
    submitTaskBtn.textContent = "Save Changes";

    titleInput.value = task.title;
    descInput.value = task.description || "";
    dueInput.value = task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "";
    prioritySelect.value = task.priority || "normal";
    notesInput.value = task.notes || "";
  } else {
    modalHeading.textContent = "Add New Task";
    submitTaskBtn.textContent = "Add Task";
    taskForm.reset();
    projectSelect.value = getActiveProjectName();
  }

  // 3. Display dialog and autofocus
  taskModal.showModal();
  titleInput.focus();
}

// ==========================================
// Task Modal Initialization (Close & Submit)
// ==========================================

function initTaskModal() {
  // Open in Add mode when sidebar/header button is clicked
  addTaskBtn.addEventListener("click", () => openTaskModal());

  // Close modal handlers (close X, cancel button, backdrop click)
  closeModalBtn.addEventListener("click", () => taskModal.close());
  cancelModalBtn.addEventListener("click", () => taskModal.close());
  taskModal.addEventListener("click", (e) => {
    if (e.target === taskModal) taskModal.close();
  });

  // Submit handler - handles both Add and Edit
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) return;

    const taskData = {
      title,
      description: descInput.value.trim(),
      dueDate: dueInput.value ? new Date(dueInput.value) : null,
      priority: prioritySelect.value,
      notes: notesInput.value.trim(),
    };

    if (currentEditingTask) {
      editTodo(currentEditingTask, taskData);
      console.log("Task edited:", currentEditingTask);
    } else {
      const projectName = projectSelect.value;
      const newTask = addTodo(taskData, projectName);
      console.log(`Task added to "${projectName}":`, newTask);
    }

    currentEditingTask = null;
    taskForm.reset();
    taskModal.close();
    renderProject();
  });
}

// ==========================================
// Project Modal Initialization
// ==========================================

function initProjectModal() {
  const addProjectsBtn = document.querySelector("#add-projects-btn");
  const projectModal = document.querySelector("#project-modal");
  const projectForm = document.querySelector("#project-form");
  const closeProjectModalBtn = document.querySelector("#close-project-modal-btn");
  const cancelProjectModalBtn = document.querySelector("#cancel-project-modal-btn");
  const projectNameInput = document.querySelector("#project-name-input");
  const projectErrorMsg = document.querySelector("#project-error-msg");
  const aside = document.querySelector("aside");

  // Open project modal
  addProjectsBtn.addEventListener("click", () => {
    projectForm.reset();
    projectErrorMsg.style.display = "none";
    projectErrorMsg.textContent = "";
    projectModal.showModal();
    projectNameInput.focus();
  });

  // Close handlers
  closeProjectModalBtn.addEventListener("click", () => projectModal.close());
  cancelProjectModalBtn.addEventListener("click", () => projectModal.close());
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) projectModal.close();
  });

  // Submit handler
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rawName = projectNameInput.value.trim();
    if (!rawName) return;

    const normalizedName = rawName.toLowerCase();

    try {
      addProject(normalizedName);

      // Insert new project button in sidebar right before the '+' button
      const newProjectBtn = document.createElement("button");
      newProjectBtn.textContent = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      aside.insertBefore(newProjectBtn, addProjectsBtn);

      projectForm.reset();
      projectModal.close();
    } catch (err) {
      projectErrorMsg.textContent = err.message;
      projectErrorMsg.style.display = "block";
    }
  });
}

export function initModals() {
  initTaskModal();
  initProjectModal();
}
