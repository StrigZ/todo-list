// TODO:
// Add delete button next to project name to delete the project and all its tasks
// Somehow represent priority in the Task element
// Give cool name to the project

import "./reset.css";
import "./styles.css";

import DOMClass from "./js/classes/DOM";
import State from "./js/classes/State";

export const state = new State();
export const DOM = new DOMClass();

DOM.init();
