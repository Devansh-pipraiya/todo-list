import { renderProject } from "./dom.js";

export { getProject, getProjectNames, addTodo, addProject, toggleTodoStatus };

const projects = {
  inbox: {
    name: "inbox",
    items: [
      {
        title: "Add a Todo",
        description: 'Click on "Add Task" button to create a Todo',
        createdOn: new Date(),
        dueDate: new Date(),
        priority: "high",
        notes: "",
        completed: false,
      },
    ],
  },
};

function getProjectNames() {
  return Object.keys(projects);
}

function addProject(name) {
  if (name == undefined || projects[name]) {
    throw Error("Error: Project name is undefined or already exists.");
  }
  projects[name] = {
    name,
    items: [],
  };
  console.log(`New Project Created ${name}`);
  console.table(projects);
  return projects[name];
}

function getProject(projectName) {
  return Object.hasOwn(projects, projectName) ? projects[projectName] : "No Project Found";
}

function addTodo(
  {
    title,
    description = "",
    createdOn = new Date(),
    dueDate = null,
    priority = "normal",
    notes = "",
    completed = false,
  } = {},
  projectName = "inbox",
) {
  if (!title) throw new Error("addTodo: title is required");
  if (getProject(projectName) === "No Project Found") addProject(projectName);

  const item = {
    title,
    description,
    createdOn,
    dueDate,
    priority,
    notes,
    completed,
  };

  projects[projectName].items.push(item);
  return item;
}

const toggleTodoStatus = (todoObj) => (todoObj.completed = !todoObj.completed);
