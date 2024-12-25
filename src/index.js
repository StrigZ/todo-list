// TODO:
// MAKE DIALOGS DYNAMIC!!!!! (SEPARATE COMPONENT.JS FOR EACH DIALOG (TASK AND PROJECT FORM))
// Add dialog to add new projects
// Somehow represent priority in the Task element
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
