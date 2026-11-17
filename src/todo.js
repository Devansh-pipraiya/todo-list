export { projects, getProject, addTodo, addProject };

const projects = {
  inbox: {
    name: "inbox",
    items: [],
  },
};

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
    duedate = null,
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
    duedate,
    priority,
    notes,
    checklist,
  };

  projects[projectName].items.push(item);
  return item;
}
