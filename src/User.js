export default class User {
  constructor(name) {
    this.id = Math.random().toString().split(".")[1];
    this.name = name;
    this.projects = [];
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }
  removeProject(projectId) {
    const index = this.todoItems.findIndex(
      (project) => project.id === projectId
    );
    if (index === -1) {
      return;
    }

    this.todoItems.splice(index, 1);
  }
}
