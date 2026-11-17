// === Styles === //
import "./css/modern-normalize.css";
import "./css/styles.css";

import { projects, addTodo, addProject } from "./todo.js";

// console.table(addTodo({ title: "test1" }));
// console.table(addTodo({ title: "test2", priority: "high", duedate: new Date("2025-01-01") }));
// console.table(addTodo({ title: "report" }, "work"));

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
});

// === Modal Dialog Logic === //
const addTaskBtn = document.querySelector("#add-task-btn");
const taskModal = document.querySelector("#task-modal");
const taskForm = document.querySelector("#task-form");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cancelModalBtn = document.querySelector("#cancel-modal-btn");
const projectSelect = document.querySelector("#task-project");

function populateProjectsDropdown() {
  projectSelect.innerHTML = "";
  Object.keys(projects).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    projectSelect.appendChild(option);
  });
}

// Open modal
addTaskBtn.addEventListener("click", () => {
  populateProjectsDropdown();

  // Pre-select active sidebar project if matching
  const activeBtn = aside.querySelector(".active");
  const activeProjectName = activeBtn ? activeBtn.textContent.trim().toLowerCase() : "inbox";
  if (projects[activeProjectName]) {
    projectSelect.value = activeProjectName;
  }

  taskModal.showModal();
  document.querySelector("#task-title").focus();
});

// Close modal handlers
closeModalBtn.addEventListener("click", () => taskModal.close());
cancelModalBtn.addEventListener("click", () => taskModal.close());

// Close on backdrop click
taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.close();
  }
});

// Form submit handler - runs addTodo
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#task-title").value.trim();
  if (!title) return;

  const description = document.querySelector("#task-desc").value.trim();
  const duedateVal = document.querySelector("#task-due").value;
  const duedate = duedateVal ? new Date(duedateVal) : null;
  const priority = document.querySelector("#task-priority").value;
  const projectName = document.querySelector("#task-project").value;
  const notes = document.querySelector("#task-notes").value.trim();

  const newTask = addTodo(
    {
      title,
      description,
      duedate,
      priority,
      notes,
    },
    projectName
  );

  console.log(`Task added to "${projectName}":`, newTask);
  console.table(projects[projectName].items);

  taskForm.reset();
  taskModal.close();
});
