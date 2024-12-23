import "./reset.css";
import "./styles.css";

import ToDoItem from "./js/classes/ToDoItem";
import User from "./js/classes/User";
import TasksForToday from "./js/components/TasksForToday";

const mainEle = document.querySelector("main");
const menu = document.querySelector("#menu");
const addTaskButton = document.querySelector("#add-task-btn");
const newTaskDialogBtn = document.querySelector("#open-new-task-modal-btn");
const closeNewTaskDialogBtn = document.querySelector("#cancel-new-task");
const newTaskDialog = document.querySelector("dialog");
const overlayDiv = document.querySelector(".overlay");
const newTaskForm = document.querySelector(".new-task-form");

export let currentMenu = "tasks-for-today";

const currentUser = new User();

export const openNewTaskModal = () => newTaskDialog.showModal();
export const closeNewTaskModal = () => {
  newTaskDialog.close();
  resetNewTaskForm();
};

const createNewTaskFromForm = () => {
  const title = document.querySelector("#new-task-input-title").value;
  const description = document.querySelector(
    "#new-task-input-description"
  ).value;
  const dueDate = document.querySelector("#new-task-input-dueDate").value;
  const priority = document.querySelector("#new-task-input-priority").value;
  const isRepeatable = document.querySelector(
    "#new-task-input-repeatable"
  ).value;
  const parentProject = document.querySelector("#new-task-input-project").value;
  const newTask = new ToDoItem(
    title,
    description,
    dueDate,
    priority,
    null,
    null,
    isRepeatable,
    parentProject
  );

  currentUser.addTask(newTask);
  if (currentMenu === "tasks-for-today") {
    renderTasksForToday();
  }
  resetNewTaskForm();
};

const resetNewTaskForm = () => {
  newTaskForm.reset();
};

const renderTasksForToday = () => {
  resetMainContent();
  TasksForToday(currentUser.getTasksForToday()).map((el) => mainEle.append(el));
};
const highlightCurrentMenu = (currentMenuId) => {
  Array.from(menu.children).map(({ firstElementChild }) => {
    const button = firstElementChild;
    button.classList.remove("active");

    if (button.id === currentMenuId) {
      button.classList.add("active");
    }
  });
};

// Render initial menu
(() => {
  TasksForToday(currentUser.getTasksForToday()).map((el) => mainEle.append(el));
  highlightCurrentMenu("tasks-for-today-btn");
})();

const resetMainContent = () => (mainEle.innerHTML = "");
const handleMenuClick = ({ target }) => {
  if (!target.id) {
    return;
  }

  switch (target.id) {
    case "add-task-btn":
      break;
    case "tasks-for-today-btn":
      currentMenu = "tasks-for-today";

      renderTasksForToday();
      break;
    case "upcoming-tasks-btn":
      currentMenu = "upcoming-tasks";
      resetMainContent();
      break;
    case "inbox-btn":
      currentMenu = "inbox";
      resetMainContent();
      break;

    default:
      break;
  }

  if (target.id !== "open-new-task-modal-btn") {
    highlightCurrentMenu(target.id);
  }
};

menu.addEventListener("click", handleMenuClick);
addTaskButton.addEventListener("click", () => {
  createNewTaskFromForm();
  closeNewTaskModal();
});
newTaskDialogBtn.addEventListener("click", () => openNewTaskModal());
closeNewTaskDialogBtn.addEventListener("click", () => closeNewTaskModal());
overlayDiv.addEventListener("click", () => closeNewTaskModal());
newTaskForm.addEventListener("click", (e) => e.stopPropagation());
