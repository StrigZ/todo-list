import { isToday } from "date-fns";
import ToDoProject from "./ToDoProject";

export default class User {
  constructor() {
    this.projects = [
      new ToDoProject("Inbox"),
      new ToDoProject("qwe"),
      new ToDoProject("asd"),
    ];
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

  removeProject(projectTitle) {
    this.tasks = this.tasks.filter(
      ({ parentProject }) => parentProject !== projectTitle
    );

    const index = this.projects.findIndex(
      (project) => project.title === projectTitle
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
