import { createTaskCard } from "./task-card.js";
import { deleteTodo, getProject, toggleTodoStatus } from "./todo.js";

const taskContainer = document.getElementById("tasks-container");
let currProject = getProject("inbox");

// takes array of todo objects creates todo card and insert to DOM
function renderCard(todoArray) {
  for (const obj of todoArray) {
    const todoTaskCard = createTaskCard(obj, taskActions);
    taskContainer.prepend(todoTaskCard);
  }
}

const taskActions = {
  onToggleCheckbox: (task) => {
    toggleTodoStatus(task);
    console.log(`Task Completed ${task.completed}`);
    console.table(task);
    renderProject();
  },
  onDelete: (task) => {
    deleteTodo(task, currProject);
    console.log(`Deleted => {${task.title}} from ${currProject.name}`);
    console.table(currProject.items);
    renderProject();
  },
};

// clears DOM and Render Cards in Current Project Tab
function renderProject() {
  taskContainer.innerHTML = "";
  renderCard(currProject.items);
}

// Filter pill toggle
const filterContainer = document.querySelector("#filters-btn-container");
filterContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  filterContainer.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");
});

// Sidebar project active toggle
const aside = document.querySelector("aside");
aside.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.id === "add-projects-btn") return;

  aside.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  currProject = getProject(e.target.innerText.toLowerCase());
  if (currProject == "No Project Found") return;

  renderProject();
});

export { renderProject };
