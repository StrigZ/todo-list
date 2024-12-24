import User from "./classes/User";

class State {
  constructor() {
    this.currentMenu = "tasks-for-today";
    this.currentUser = new User();
  }
}

const state = new State();
export default state;
