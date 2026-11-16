// === Styles === //
import "./css/modern-normalize.css";
import "./css/styles.css";

import { projects, addTodo, addProject } from "./todo.js";

console.table(addTodo({ title: "test1" }));
console.table(addTodo({ title: "test2", priority: "high", duedate: new Date("2025-01-01") }));
console.table(addTodo({ title: "report" }, "work"));
// addProject("1");
