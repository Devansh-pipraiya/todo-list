import { createTaskCard } from "./task-card.js";
import { deleteTodo, getProject, toggleTodoStatus } from "./todo.js";
import { openTaskModal } from "./modal.js";

// ==========================================
// DOM Elements & State
// ==========================================

const taskContainer = document.getElementById("tasks-container");
const filterContainer = document.querySelector("#filters-btn-container");
const aside = document.querySelector("aside");

let currProject = getProject("inbox");
let currFilter =
  filterContainer.querySelector(".active")?.textContent.trim().toLowerCase() || "today";

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
    deleteTodo(task, currProject);
    console.log(`Deleted => {${task.title}} from ${currProject.name}`);
    console.table(currProject.items);
    renderProject();
  },
};

// ==========================================
// Rendering Logic
// ==========================================

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
  renderCards(currProject.items);
}

// ==========================================
// Event Listeners (Navigation & Filters)
// ==========================================

// Filter pill toggle (Completed, Today, Upcoming)
filterContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  filterContainer.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  currFilter = btn.textContent.trim().toLowerCase();
});

// Sidebar project selection
aside.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.id === "add-projects-btn") return;

  aside.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  currProject = getProject(e.target.innerText.toLowerCase());
  if (currProject === "No Project Found") return;

  renderProject();
});

// ==========================================
// Exports
// ==========================================
export { renderProject, getCurrentProject, getCurrentFilter };
