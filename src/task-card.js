// Namespace needed for creating dynamic SVG elements in HTML
const SVG_NS = "http://www.w3.org/2000/svg";

// Helper to build reusable SVG icons from path data strings
function createIcon(paths) {
  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  paths.forEach((d) => {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.append(path);
  });

  return svg;
}

// Factory function: creates and returns an interactive task card DOM element
export function createTaskCard(task, callbacks = {}) {
  // Root card container
  const card = document.createElement("div");
  card.classList.add("task-card");

  // 1. Completion status checkbox button
  const checkbox = document.createElement("button");
  checkbox.classList.add("task-checkbox");
  checkbox.type = "button";
  checkbox.setAttribute("aria-label", "Toggle completion");

  if (task.completed) {
    checkbox.classList.add("done");
    card.classList.add("completed");
  }

  checkbox.addEventListener("click", () => {
    callbacks.onToggleCheckbox?.(task, card);
  });

  // 2. Task information (title & description)
  const info = document.createElement("div");
  info.classList.add("task-info");

  const title = document.createElement("span");
  title.classList.add("task-title");
  title.textContent = task.title;

  const description = document.createElement("span");
  description.classList.add("task-description");
  description.textContent = task.description;

  info.append(title, description);

  // 3. Priority indicator arrow
  const priority = document.createElement("span");
  priority.classList.add("task-priority");

  const priorityPaths = {
    high: ["M6 14 12 8 18 14"],
    low: ["M6 10 12 16 18 10"],
    normal: ["M6 10 12 16 18 10"],
  };

  const priorityLevel = task.priority || "normal";

  priority.classList.add(`priority-${priorityLevel}`);
  priority.setAttribute("aria-hidden", "true");

  priority.append(createIcon(priorityPaths[priorityLevel] || priorityPaths.normal));

  // 4. Formatted due date display
  const dueDate = document.createElement("span");
  dueDate.classList.add("task-due-date");

  dueDate.textContent = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "Not due";

  // 5. Action buttons container (Edit & Delete)
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("task-btn-details");
  editBtn.type = "button";
  editBtn.setAttribute("aria-label", "Edit task");
  editBtn.title = "Edit";

  editBtn.append(createIcon(["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z"]));

  editBtn.addEventListener("click", () => {
    callbacks.onEdit?.(task);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("task-btn-delete");
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.title = "Delete";

  deleteBtn.append(createIcon(["M18 6 6 18", "m6 6 12 12"]));

  deleteBtn.addEventListener("click", () => {
    callbacks.onDelete?.(task);
  });

  actions.append(editBtn, deleteBtn);

  // Assemble all parts into the root card and return
  card.append(checkbox, info, priority, dueDate, actions);

  return card;
}
