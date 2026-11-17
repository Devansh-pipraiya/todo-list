export { createTaskCard };

const SVG_NS = "http://www.w3.org/2000/svg";

// Reusable SVG creation function
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

function createTaskCard(task, callbacks = {}) {
  const card = document.createElement("div");
  card.classList.add("task-card");

  // Checkbox
  const checkbox = document.createElement("button");
  checkbox.classList.add("task-checkbox");
  checkbox.type = "button";
  checkbox.setAttribute("aria-label", "Toggle completion");

  checkbox.addEventListener("click", () => {
    callbacks.onToggle?.(task);
  });

  // Task information
  const info = document.createElement("div");
  info.classList.add("task-info");

  const title = document.createElement("span");
  title.classList.add("task-title");
  title.textContent = task.title;

  const description = document.createElement("span");
  description.classList.add("task-description");
  description.textContent = task.description;

  info.append(title, description);

  // Priority arrow
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

  // Due date
  const dueDate = document.createElement("span");
  dueDate.classList.add("task-due-date");

  dueDate.textContent = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "Not due";

  // Actions
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

  // Assemble card
  card.append(checkbox, info, priority, dueDate, actions);

  return card;
}
