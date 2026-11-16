// === Styles === //
import "./css/modern-normalize.css";
import "./css/styles.css";

import { projects, addTodo, addProject } from "./todo.js";

console.table(addTodo({ title: "test1" }));
console.table(addTodo({ title: "test2", priority: "high", duedate: new Date("2025-01-01") }));
console.table(addTodo({ title: "report" }, "work"));

// Filter pill toggle
const filterContainer = document.querySelector("#filters-btn-container");

filterContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  filterContainer.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");
});
