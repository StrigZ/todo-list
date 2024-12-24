import { state } from "../../index";
import TaskPage from "../components/TaskPage";
import ToDoItem from "./ToDoItem";

export default class DOM {
  constructor() {
    this.currentMenu = "tasks-for-today";
    this.mainEle = document.querySelector("main");
    this.menu = document.querySelector("#menu");
    this.addTaskButton = document.querySelector("#add-task-btn");
    this.newTaskDialogBtn = document.querySelector("#open-new-task-modal-btn");
    this.closeNewTaskDialogBtn = document.querySelector("#cancel-new-task");
    this.newTaskDialog = document.querySelector("dialog");
    this.overlayDiv = document.querySelector(".overlay");
    this.newTaskForm = document.querySelector("#new-task-form");
    this.newTaskFormPriorityPicker = document.querySelector(
      "#new-task-input-priority"
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

  openNewTaskModal = () => this.newTaskDialog.showModal();

  closeNewTaskModal = () => {
    this.newTaskDialog.close();
    this.resetNewTaskForm();
  };

  getDataFromTaskForm = () => {
    const title = document.querySelector("#new-task-input-title").value;
    const description = document.querySelector(
      "#new-task-input-description"
    ).value;
    const dueDate = document.querySelector("#new-task-input-dueDate").value;
    const priority = document.querySelector("#new-task-input-priority").value;
    const isRepeatable = document.querySelector(
      "#new-task-input-repeatable"
    ).value;
    const parentProject = document.querySelector(
      "#new-task-input-project"
    ).value;

    return {
      title,
      description,
      dueDate,
      priority,
      isRepeatable,
      parentProject,
    };
  };

  isFormValid = ({ title }) => {
    if (!title) {
      return false;
    }
    return true;
  };

  createNewTaskFromForm = () => {
    const formData = this.getDataFromTaskForm();
    console.log(formData);

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
    this.resetNewTaskForm();
    this.closeNewTaskModal();
  };

  resetNewTaskForm = () => {
    this.newTaskForm.reset();
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
    TaskPage(state.currentUser.getTasksForToday()).map((el) =>
      this.mainEle.append(el)
    );
  };

  renderTaskInboxPage = () => {
    this.resetMainContent();
    TaskPage(state.currentUser.tasks).map((el) => this.mainEle.append(el));
  };
  showPriorityModal = () => {};

  attachEventListeners() {
    this.menu.addEventListener("click", this.handleMenuClick);
    this.addTaskButton.addEventListener("click", () => {
      this.createNewTaskFromForm();
    });
    this.newTaskDialogBtn.addEventListener("click", () =>
      this.openNewTaskModal()
    );
    this.closeNewTaskDialogBtn.addEventListener("click", () =>
      this.closeNewTaskModal()
    );
    this.overlayDiv.addEventListener("click", () => this.closeNewTaskModal());
    this.newTaskForm.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.newTaskFormPriorityPicker.addEventListener(
      "click",
      this.showPriorityModal
    );
  }

  init() {
    this.attachEventListeners();
    TaskPage(state.currentUser.getTasksForToday()).map((el) =>
      this.mainEle.append(el)
    );
    this.highlightCurrentMenu("tasks-for-today-btn");
  }
}
