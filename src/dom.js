import { createTaskCard } from "./task-card.js";
import { deleteTodo, getProject, getProjectNames, toggleTodoStatus } from "./todo.js";
import { openTaskModal } from "./modal.js";

// ==========================================
// DOM Elements & State
// ==========================================

const taskContainer = document.getElementById("tasks-container");
const filterContainer = document.querySelector("#filters-btn-container");
const aside = document.querySelector("aside");

let currProject = getProject("inbox");
let currFilter = filterContainer.querySelector(".active")?.dataset.filter || "no-filter";

// ==========================================
// State Getters
// ==========================================

// Returns the currently active project object
const getCurrentProject = () => currProject;

// Returns the currently active filter ("completed" | "today" | "upcoming")
const getCurrentFilter = () => currFilter;

// ==========================================
// Task Card Actions (Callbacks)
// ==========================================

const taskActions = {
  onToggleCheckbox(task) {
    toggleTodoStatus(task);
    console.log(`Task Completed: ${task.completed}`);
    console.table(task);
    renderProject();
  },

  onEdit(task) {
    openTaskModal(task);
  },

  onDelete(task) {
    deleteTodo(task);
    console.log(`Deleted => {${task.title}} from ${task.projectName}`);
    renderProject();
  },
};

// ==========================================
// Rendering & Filtering Logic
// ==========================================

// Filters an array of tasks according to the active currFilter
function filter(array) {
  switch (currFilter) {
    case "completed":
      return array.filter((obj) => obj.completed === true);

    case "today":
      return array
        .filter((obj) => obj.dueDate)
        .filter((obj) => obj.dueDate.toDateString() === new Date().toDateString());

    case "upcoming":
      return array
        .filter((obj) => obj.dueDate > new Date() || obj.dueDate == null)
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }
}

// Resets active filter UI pill and state back to default
function resetFilter() {
  const resetBtn = filterContainer.querySelector(".reset");
  filterContainer.querySelector(".active")?.classList.remove("active");
  resetBtn.classList.add("active");
  currFilter = "no-filter";
}

// Helper to get a flat array of all tasks across all projects
function getAllTasks() {
  return getProjectNames().flatMap((name) => getProject(name).items);
}

/**
 * Creates task cards and inserts them into the DOM
 */
function renderCards(todoArray) {
  for (const obj of todoArray) {
    const todoTaskCard = createTaskCard(obj, taskActions);
    taskContainer.prepend(todoTaskCard);
  }
}

/**
 * Clears the tasks container and renders tasks for the current project
 */
function renderProject() {
  taskContainer.innerHTML = "";
  let tasks = currProject === "all" ? getAllTasks() : currProject.items;
  if (currFilter !== "no-filter") tasks = filter(tasks);
  renderCards(tasks);
}

// ==========================================
// Project Tabs Logic (Sidebar)
// ==========================================

/**
 * Creates a project button element for the sidebar
 */
function createProjectBtn(projectName) {
  const projectBtn = document.createElement("button");
  projectBtn.classList.add("custom-project-btn");
  projectBtn.textContent = projectName.charAt(0).toUpperCase() + projectName.slice(1);
  return projectBtn;
}

/**
 * Renders custom project tabs in the sidebar from stored project names
 */
function renderProjectTabs() {
  const addProjectsBtn = document.querySelector("#add-projects-btn");
  aside.querySelectorAll(".custom-project-btn").forEach((btn) => btn.remove());

  for (const project of getProjectNames()) {
    if (project === "inbox") continue;
    const projectBtn = createProjectBtn(project);
    aside.insertBefore(projectBtn, addProjectsBtn);
  }
}

// ==========================================
// Event Listeners (Navigation & Filters)
// ==========================================

// Filter pill toggle (Completed, Today, Upcoming, Reset)
filterContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  filterContainer.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  currFilter = btn.dataset.filter;
  renderProject();
});

// Sidebar project selection
aside.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.id === "add-projects-btn") return;

  aside.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  const selectedName = btn.textContent.trim().toLowerCase();
  if (selectedName === "all") {
    currProject = "all";
  } else {
    currProject = getProject(selectedName);
    if (currProject === "No Project Found") return;
  }
  resetFilter();
  renderProject();
});

// ==========================================
// Exports
// ==========================================
export { createProjectBtn, renderProjectTabs, renderProject, getCurrentProject, getCurrentFilter };
