import "./reset.css";
import "./styles.css";

import DOMClass from "./js/classes/DOM";
import State from "./js/classes/State";

export const state = new State();
export const DOM = new DOMClass();

DOM.init();
window.addEventListener("beforeunload", () => {
  localStorage.setItem("tasks", JSON.stringify(state.currentUser.tasks));
  localStorage.setItem("projects", JSON.stringify(state.currentUser.projects));
});
