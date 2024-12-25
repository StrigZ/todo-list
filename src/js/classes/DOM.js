import { state } from "../../index";
import NewTaskDialog from "../components/NewTaskDialog";
import TaskPage from "../components/TaskPage";
import ToDoItem from "./ToDoItem";

export default class DOM {
  constructor() {
    this.currentMenu = "tasks-for-today";
    this.mainEle = document.querySelector("main");
    this.menu = document.querySelector("#menu");
    this.addTaskButton = document.querySelector("#add-task-btn");
    this.overlayDiv = document.querySelector(".overlay");
    this.dialog = document.querySelector("dialog");
    this.newTaskDialogButton = document.querySelector(
      "#open-new-task-modal-btn"
    );
  }

  resetMainContent = () => (this.mainEle.innerHTML = "");

  handleMenuClick = ({ target }) => {
    if (!target.id) {
      return;
    }

    switch (target.id) {
      case "add-task-btn":
        break;
      case "tasks-for-today-btn":
        this.currentMenu = "tasks-for-today";
        this.renderTaskForTodayPage();
        break;
      case "tasks-inbox-btn":
        this.currentMenu = "inbox";
        this.renderTaskInboxPage();
        break;

      default:
        break;
    }

    if (target.id !== "open-new-task-modal-btn") {
      this.highlightCurrentMenu(target.id);
    }
  };

  highlightCurrentMenu = (currentMenuId) => {
    Array.from(this.menu.children).map(({ firstElementChild }) => {
      const button = firstElementChild;
      button.classList.remove("active");

      if (button.id === currentMenuId) {
        button.classList.add("active");
      }
    });
  };

  openDialog = () => {
    this.dialog.showModal();
  };

  closeDialog = () => {
    this.dialog.close();
  };

  isFormValid = ({ title }) => {
    if (!title) {
      return false;
    }
    return true;
  };

  createNewTaskFromForm = (formData) => {
    if (!this.isFormValid(formData)) {
      return;
    }

    const {
      title,
      description,
      dueDate,
      isRepeatable,
      priority,
      parentProject,
    } = formData;

    const newTask = new ToDoItem(
      title,
      description,
      dueDate,
      priority,
      isRepeatable,
      parentProject
    );

    state.currentUser.addTask(newTask);
    this.rerenderCurrentPage();
    this.closeDialog();
  };

  rerenderCurrentPage = () => {
    switch (this.currentMenu) {
      case "tasks-for-today":
        this.renderTaskForTodayPage();
        break;
      case "inbox":
        this.renderTaskInboxPage();
        break;
      default:
        break;
    }
  };

  renderTaskForTodayPage = () => {
    this.resetMainContent();
    TaskPage(state.currentUser.tasksForToday).map((el) =>
      this.mainEle.append(el)
    );
  };

  renderTaskInboxPage = () => {
    this.resetMainContent();
    TaskPage(state.currentUser.tasks).map((el) => this.mainEle.append(el));
  };

  resetDialogContent = () => (this.overlayDiv.innerHTML = "");

  openNewTaskDialog = () => {
    this.resetDialogContent();
    this.overlayDiv.append(NewTaskDialog());
    this.dialog.showModal();
  };

  attachEventListeners() {
    this.menu.addEventListener("click", this.handleMenuClick);

    this.newTaskDialogButton.addEventListener("click", this.openNewTaskDialog);

    this.overlayDiv.addEventListener("click", this.closeDialog);
  }

  init() {
    this.attachEventListeners();
    TaskPage(state.currentUser.tasksForToday).map((el) =>
      this.mainEle.append(el)
    );
    this.highlightCurrentMenu("tasks-for-today-btn");
  }
}
