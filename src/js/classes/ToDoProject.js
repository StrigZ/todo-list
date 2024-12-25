export default class ToDoProject {
  constructor(title, todoItems = []) {
    this.id = Math.random().toString().split(".")[1];
    this.title = title;
    this.todoItems = todoItems;
  }

  addItem(newItem) {
    this.todoItems.push(newItem);
  }

  removeItem(itemId) {
    const index = this.todoItems.findIndex((item) => item.id === itemId);
    if (index === -1) {
      return;
    }

    this.todoItems.splice(index, 1);
  }
}
