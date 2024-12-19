export default class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    tag,
    isRepeatable
  ) {
    this.id = Math.random().toString().split(".")[1];
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.tag = tag;
    this.isRepeatable = isRepeatable;
  }
}
