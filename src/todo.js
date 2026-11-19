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
        projectName: "inbox",
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
  { title, description = "", dueDate = null, priority = "normal", notes = "" } = {},
  projectName = "inbox",
) {
  if (!title) throw new Error("addTodo: title is required");
  if (getProject(projectName) === "No Project Found") addProject(projectName);

  const item = {
    title,
    description,
    createdOn: new Date(),
    dueDate,
    priority,
    notes,
    completed: false,
    projectName,
  };

  projects[projectName].items.push(item);
  return item;
}

const toggleTodoStatus = (todoObj) => (todoObj.completed = !todoObj.completed);

const deleteTodo = (todoObj) => {
  const project = getProject(todoObj.projectName);
  const todoIndex = project.items.indexOf(todoObj);

  if (todoIndex !== -1) {
    project.items.splice(todoIndex, 1);
  }
};

const editTodo = (todoObj, { title, description, dueDate, priority, notes, projectName }) => {
  // If projectName changed, move task from old project to new project
  if (projectName && projectName !== todoObj.projectName) {
    const oldProject = getProject(todoObj.projectName);
    if (oldProject && oldProject !== "No Project Found") {
      const index = oldProject.items.indexOf(todoObj);
      if (index !== -1) {
        oldProject.items.splice(index, 1);
      }
    }

    todoObj.projectName = projectName;
    const newProject = getProject(projectName);
    if (newProject && newProject !== "No Project Found") {
      newProject.items.push(todoObj);
    }
  }

  todoObj.title = title;
  todoObj.description = description;
  todoObj.dueDate = dueDate;
  todoObj.priority = priority;
  todoObj.notes = notes;
  return todoObj;
};

export { getProject, getProjectNames, addTodo, addProject, toggleTodoStatus, deleteTodo, editTodo };
