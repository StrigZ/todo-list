import { isToday } from "date-fns";
import ToDoProject from "./ToDoProject";

export default class User {
  constructor() {
    this.projects = [new ToDoProject("Inbox")];
    this.tasks = [];
  }

  addTask(newTask, parentProjectTitle = null) {
    console.log(parentProjectTitle);

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

  get tasksForToday() {
    return this.tasks.filter((item) => isToday(item.dueDate));
  }
}
