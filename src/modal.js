import { renderProject } from "./dom.js";
import { getProject, getProjectNames, addTodo, addProject } from "./todo.js";

export function initModals() {
  initTaskModal();
  initProjectModal();
}

function initTaskModal() {
  const addTaskBtn = document.querySelector("#add-task-btn");
  const taskModal = document.querySelector("#task-modal");
  const taskForm = document.querySelector("#task-form");
  const closeModalBtn = document.querySelector("#close-modal-btn");
  const cancelModalBtn = document.querySelector("#cancel-modal-btn");
  const projectSelect = document.querySelector("#task-project");
  const aside = document.querySelector("aside");

  function populateProjectsDropdown() {
    projectSelect.innerHTML = "";
    getProjectNames().forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      projectSelect.appendChild(option);
    });
  }

  // Open task modal
  addTaskBtn.addEventListener("click", () => {
    populateProjectsDropdown();

    // Pre-select active sidebar project if matching (if "All", default to "inbox")
    const activeBtn = aside?.querySelector(".active");
    const activeProjectName = activeBtn ? activeBtn.textContent.trim().toLowerCase() : "inbox";
    if (activeProjectName !== "all" && getProject(activeProjectName) !== "No Project Found") {
      projectSelect.value = activeProjectName;
    } else {
      projectSelect.value = "inbox";
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
      projectName,
    );

    console.log(`Task added to "${projectName}":`, newTask);
    console.table(getProject(projectName).items);

    taskForm.reset();
    taskModal.close();
    renderProject();
  });
}

function initProjectModal() {
  const addProjectsBtn = document.querySelector("#add-projects-btn");
  const projectModal = document.querySelector("#project-modal");
  const projectForm = document.querySelector("#project-form");
  const closeProjectModalBtn = document.querySelector("#close-project-modal-btn");
  const cancelProjectModalBtn = document.querySelector("#cancel-project-modal-btn");
  const projectNameInput = document.querySelector("#project-name-input");
  const projectErrorMsg = document.querySelector("#project-error-msg");
  const aside = document.querySelector("aside");

  // Open project modal
  addProjectsBtn.addEventListener("click", () => {
    projectForm.reset();
    projectErrorMsg.style.display = "none";
    projectErrorMsg.textContent = "";
    projectModal.showModal();
    projectNameInput.focus();
  });

  // Close project modal handlers
  closeProjectModalBtn.addEventListener("click", () => projectModal.close());
  cancelProjectModalBtn.addEventListener("click", () => projectModal.close());

  // Close on backdrop click
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.close();
    }
  });

  // Submit project form - runs addProject with try...catch
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rawName = projectNameInput.value.trim();
    if (!rawName) return;

    const normalizedName = rawName.toLowerCase();

    try {
      addProject(normalizedName);

      // Insert new project button in sidebar right before the '+' button
      const newProjectBtn = document.createElement("button");
      newProjectBtn.textContent = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      aside.insertBefore(newProjectBtn, addProjectsBtn);

      projectForm.reset();
      projectModal.close();
    } catch (err) {
      projectErrorMsg.textContent = err.message;
      projectErrorMsg.style.display = "block";
    }
  });
}
