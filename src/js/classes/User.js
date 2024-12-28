import { compareDesc, isToday } from "date-fns";
import ToDoProject from "./ToDoProject";
import ToDoItem from "./ToDoItem";

export default class User {
  constructor() {
    this.projects = [new ToDoProject("qwe"), new ToDoProject("asd")];
    this._tasks = [
      new ToDoItem("1", "kek", new Date("12/12/12"), 1, true, "Inbox"),
      new ToDoItem("2", "kek", new Date("12/13/12"), 2, true, "Inbox"),
      new ToDoItem("3", "kek", new Date("12/14/12"), 3, true, "Inbox"),
    ];
    this.completedTasks = [];
    this.isTasksDirty = false;
  }
  get tasks() {
    if (this.isTasksDirty) {
      this.isTasksDirty = false;
      this._tasks.sort((a, b) => a.createdAt - b.createdAt);
    }

    return this._tasks;
  }
  get tasksForToday() {
    return this.tasks.filter((item) => isToday(item.dueDate));
  }

  completeTask(taskId) {
    const completedTask = this.tasks.find((task) => task.id === taskId);
    this.completedTasks.push(completedTask);
    this.removeTask(taskId);
    return completedTask;
  }
  uncompleteTask(taskId) {
    const taskToUncompleteIndex = this.completedTasks.findIndex(
      (task) => task.id === taskId
    );
    const taskToUncomplete = this.completedTasks[taskToUncompleteIndex];
    this.tasks.push(taskToUncomplete);
    this.completedTasks.splice(taskToUncompleteIndex, 1);
    if (taskToUncomplete.parentProjectId) {
      this.projects
        .find((proj) => proj.id === taskToUncomplete.parentProjectId)
        .addItem(taskToUncomplete);
    }
    this.isTasksDirty = true;
  }
  addTask(newTask) {
    if (newTask.parentProjectId !== "Inbox") {
      this.projects
        .find((project) => project.id === newTask.parentProjectId)
        .addItem(newTask);
    }
    this.tasks.push(newTask);
    this.isTasksDirty = true;
  }

  removeTask(taskId) {
    const taskToRemoveIndex = this.tasks.findIndex(
      (task) => task.id === taskId
    );
    if (taskToRemoveIndex === -1) {
      return;
    }
    const taskToRemove = this.tasks[taskToRemoveIndex];
    if (taskToRemove.parentProjectId !== "Inbox") {
      const parentProjectIndex = this.projects.findIndex(
        (proj) => proj.id === taskToRemove.parentProjectId
      );
      this.projects[parentProjectIndex].removeItem(taskId);
    }
    this.tasks.splice(taskToRemoveIndex, 1);
    this.isTasksDirty = false;
    return taskToRemove;
  }
  getProjectById(projectId) {
    return this.projects.find((proj) => proj.id === projectId);
  }
  addProject(newProject) {
    this.projects.push(newProject);
  }

  removeProject(projectId) {
    this._tasks = this._tasks.filter(
      ({ parentProjectId }) => parentProjectId !== projectId
    );

    const index = this.projects.findIndex(
      (project) => project.id === projectId
    );
    if (index === -1) {
      return;
    }

    this.projects.splice(index, 1);
    this.isTasksDirty = true;
  }
}
