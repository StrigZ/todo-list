import { getRandomColor } from "./utility";

export default class ToDoProject {
  constructor(todoItems = [], color = null) {
    this.id = Math.random().toString().split(".")[1];
    this.todoItems = todoItems;
    if (color) {
      this.color = color;
    } else {
      this.color = getRandomColor();
    }
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
