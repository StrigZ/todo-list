import { isToday } from "date-fns";

export default class User {
  constructor() {
    this.projects = [];
    this.tasks = [];
  }

  addTask(newTask, parentProjectTitle = null) {
    if (parentProjectTitle) {
      this.projects
        .find((project) => project.title === parentProjectTitle)
        .addItem(newTask);
    }

    this.tasks.push(newTask);
  }

  removeTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return;
    }

    this.tasks.splice(index, 1);
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  removeProject(projectId) {
    const index = this.projects.findIndex(
      (project) => project.id === projectId
    );
    if (index === -1) {
      return;
    }

    this.projects.splice(index, 1);
  }

  getTasksForToday() {
    return this.tasks.filter((item) => isToday(item.dueDate));
  }

  getUpcomingTasks() {
    return this.tasks.filter((item) => isFuture(item.dueDate));
  }
}
