export default class ToDoProject {
  constructor(title, todoItems = []) {
    this.id =
      title === "Inbox" ? "Inbox" : Math.random().toString().split(".")[1];
    this.title = title;
    this._todoItems = todoItems;
    this.isTasksDirty = false;
  }
  get todoItems() {
    if (this.isTasksDirty) {
      this.isTasksDirty = false;
      this._todoItems.sort((a, b) => a.createdAt - b.createdAt);
    }

    return this._todoItems;
  }
  addItem(newItem) {
    this.todoItems.push(newItem);
    this.isTasksDirty = true;
  }

  removeItem(itemId) {
    const index = this.todoItems.findIndex((item) => item.id === itemId);
    if (index === -1) {
      return;
    }

    this.todoItems.splice(index, 1);
    this.isTasksDirty = true;
  }
}
