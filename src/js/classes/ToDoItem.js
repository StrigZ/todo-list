export default class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    isRepeatable,
    parentProject
  ) {
    this.id = Math.random().toString().split(".")[1];
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentProject = parentProject;
    this.isRepeatable = isRepeatable;
  }
}
