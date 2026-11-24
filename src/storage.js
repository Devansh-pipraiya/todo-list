const updateStorage = (projects) => localStorage.setItem("localProjects", JSON.stringify(projects));

function getLocalProjects() {
  const localProjects = JSON.parse(localStorage.getItem("localProjects"), (key, value) => {
    if ((key === "createdOn" || key === "dueDate") && value) {
      return new Date(value);
    }
    return value;
  });

  return localProjects;
}

function initProjects() {
  if (getLocalProjects()) {
    return getLocalProjects();
  } else
    return {
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
}

export { updateStorage, getLocalProjects, initProjects };
