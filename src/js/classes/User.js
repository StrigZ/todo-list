import { isToday } from "date-fns";

export default class User {
  constructor(name) {
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

  getTasksForToday() {
    return this.projects
      .map((proj) => proj.todoItems.filter((item) => isToday(item.dueDate)))
      .flat();
  }

  getUpcomingTasks() {
    return this.projects
      .map((proj) => proj.todoItems.filter((item) => isFuture(item.dueDate)))
      .flat();
  }
}
