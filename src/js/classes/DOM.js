import { state } from "../../index";
import NewProjectDialog from "../components/NewProjectDialog";
import NewTaskDialog from "../components/NewTaskDialog";
import Project from "../components/Project";
import TaskPage from "../components/TaskPage";
import ToDoItem from "./ToDoItem";
import ToDoProject from "./ToDoProject";

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
    this.newProjectDialogButton = document.querySelector(
      "#open-new-project-modal-btn"
    );

    this.projectsContainer = document.querySelector("#projects");
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
        this.currentMenu = "Inbox";
        this.renderTaskInboxPage();
        break;
      case "open-new-task-modal-btn":
        this.openDialog(NewTaskDialog());
        break;
      case "completed-tasks-btn":
        this.currentMenu = "Completed";
        this.renderCompletedTasksPage();
        break;

      default:
        this.currentMenu = state.currentUser.getProjectById(target.id).title;
        this.renderProjectPage(target.id);
        break;
    }

    if (target.id !== "open-new-task-modal-btn") {
      this.highlightCurrentMenu(target.id);
    }
  };

  highlightCurrentMenu = (currentMenuId) => {
    const allMenus = [
      ...Array.from(this.menu.children),
      ...Array.from(this.projectsContainer.children),
    ];
    allMenus.map(({ firstElementChild }) => {
      const button = firstElementChild;
      button.classList.remove("active");

      if (button.id === currentMenuId) {
        button.classList.add("active");
      }
    });
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

  removeProject = (title, projectId) => {
    state.currentUser.removeProject(projectId);

    this.populateProjectsList();

    if (this.currentMenu === title) {
      this.currentMenu = "Inbox";
      this.renderTaskInboxPage();
    } else {
      this.rerenderCurrentPage();
    }
  };

  createNewTask = (taskData) => {
    if (!this.isFormValid(taskData)) {
      return;
    }

    const {
      title,
      description,
      dueDate,
      isRepeatable,
      priority,
      parentProjectId,
    } = taskData;

    const newTask = new ToDoItem(
      title,
      description,
      dueDate,
      priority,
      isRepeatable,
      parentProjectId
    );

    state.currentUser.addTask(newTask, parentProjectId);
    this.rerenderCurrentPage(parentProjectId);
    this.closeDialog();
  };

  createNewProject = (projectData) => {
    const { title } = projectData;

    const newProject = new ToDoProject(title);

    state.currentUser.addProject(newProject);
    this.rerenderCurrentPage();
    this.populateProjectsList();
    this.closeDialog();
  };

  deleteTask = (taskId) => {
    const { parentProjectId } = state.currentUser.removeTask(taskId);
    this.rerenderCurrentPage(parentProjectId);
  };
  renderProjectPage = (projectId) => {
    const project = state.currentUser.getProjectById(projectId);
    this.currentMenu = project.title;
    this.resetMainContent();
    this.highlightCurrentMenu(projectId);
    TaskPage(project.todoItems).map((el) => this.mainEle.append(el));
  };
  rerenderCurrentPage = (projectId) => {
    switch (this.currentMenu) {
      case "tasks-for-today":
        this.renderTaskForTodayPage();
        break;
      case "Inbox":
        this.renderTaskInboxPage();
        break;
      case "Completed":
        this.renderCompletedTasksPage();
        break;
      default:
        this.renderProjectPage(projectId);
        break;
    }
  };
  uncompleteTask(taskId) {
    state.currentUser.uncompleteTask(taskId);
    this.rerenderCurrentPage();
  }
  completeTask(taskId) {
    const { parentProjectId } = state.currentUser.completeTask(taskId);
    this.rerenderCurrentPage(parentProjectId);
  }
  renderTaskForTodayPage = () => {
    this.resetMainContent();

    TaskPage(state.currentUser.tasksForToday).map((el) =>
      this.mainEle.append(el)
    );
  };
  renderCompletedTasksPage = () => {
    this.resetMainContent();
    TaskPage(state.currentUser.completedTasks).map((el) =>
      this.mainEle.append(el)
    );
  };
  renderTaskInboxPage = () => {
    this.resetMainContent();

    TaskPage(state.currentUser.tasks).map((el) => this.mainEle.append(el));
  };

  resetDialogContent = () => (this.overlayDiv.innerHTML = "");

  openDialog = (content) => {
    this.resetDialogContent();
    this.overlayDiv.append(content);
    this.dialog.showModal();
  };

  populateProjectsList = () => {
    this.projectsContainer.innerHTML = "";
    state.currentUser.projects.forEach((project) => {
      this.projectsContainer.append(Project(project));
    });
  };

  attachEventListeners() {
    this.menu.addEventListener("click", this.handleMenuClick);
    this.projectsContainer.addEventListener("click", this.handleMenuClick);

    this.newTaskDialogButton.addEventListener("click", () =>
      this.openDialog(NewTaskDialog())
    );
    this.newProjectDialogButton.addEventListener("click", () =>
      this.openDialog(NewProjectDialog())
    );

    this.overlayDiv.addEventListener("click", this.closeDialog);
  }

  init() {
    this.attachEventListeners();
    TaskPage(state.currentUser.tasksForToday).map((el) =>
      this.mainEle.append(el)
    );

    this.highlightCurrentMenu("tasks-for-today-btn");
    this.populateProjectsList();
  }
}
