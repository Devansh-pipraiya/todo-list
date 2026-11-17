// === Styles === //
import "./css/modern-normalize.css";
import "./css/styles.css";

import { initModals } from "./modal.js";

import { createTaskCard } from "./task-card.js";

const task = {
  title: "Complete JavaScript project",
  description: "Finish the restaurant page",
  createdOn: new Date(),
  dueDate: new Date("2026-11-20"),
  priority: "high",
  notes: "Check the remaining sections",
  checklist: [],
};

const card = createTaskCard(task);

document.querySelector(".tasks-list").append(card);

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

// Initialize Modals
initModals();
