export default class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    isRepeatable,
    parentProjectId
  ) {
    this.id = Math.random().toString().split(".")[1];
    this.createdAt = new Date();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentProjectId = parentProjectId;
    this.isRepeatable = isRepeatable;
  }
}
