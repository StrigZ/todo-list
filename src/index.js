// TODO:
// Add modals to pick parent project and priority
// Somehow represent priority in the Task element
// Add dialog to create new projects
// Add delete button next to project name to delete the project and all its tasks
// Dynamically update project list on the sidebar
// Give cool name to the project

import "./reset.css";
import "./styles.css";

import DOMClass from "./js/classes/DOM";
import State from "./js/classes/State";

export const state = new State();
export const DOM = new DOMClass();

DOM.init();
