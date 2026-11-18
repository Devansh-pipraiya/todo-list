import { createTaskCard } from "./task-card.js";
import { getProject } from "./todo.js";

const taskContainer = document.getElementById("tasks-container");
let currProject = getProject("inbox");

// takes array of todo objects creates todo card and insert to DOM
function renderCard(todoArray) {
  for (const obj of todoArray) {
    const todoTaskCard = createTaskCard(obj);
    taskContainer.prepend(todoTaskCard);
  }
}

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
