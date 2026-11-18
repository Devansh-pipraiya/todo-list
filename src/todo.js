export { getProject, getProjectNames, addTodo, addProject };

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
        checklist: [],
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
    checklist = [],
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
    checklist,
  };

  projects[projectName].items.push(item);
  return item;
}
