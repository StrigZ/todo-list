import { DOM } from "../../index";
import NewTaskDialog from "./NewTaskDialog";
import TaskList from "./TaskList";

const getHeadingText = () => {
  switch (DOM.currentMenu) {
    case "tasks-for-today":
      return "Today";
    case "inbox":
      return "Inbox";
    default:
      return DOM.currentMenu;
  }
};

export default function TaskPage(tasks) {
  const header = document.createElement("header");
  const heading = document.createElement("h1");
  const subheading = document.createElement("p");
  const circleCheckIcon = document.createElement("i");
  const taskList = document.createElement("ul");
  const addTaskButton = document.createElement("button");
  const circlePlusIcon = document.createElement("i");
  const plusIcon = document.createElement("i");

  heading.textContent = getHeadingText();
  subheading.textContent = ` ${tasks.length} tasks`;
  circleCheckIcon.classList.add("fa-regular");
  circleCheckIcon.classList.add("fa-circle-check");
  taskList.classList.add("task-list");
  taskList.id = "task-list";
  TaskList(tasks).map((task) => taskList.append(task));
  addTaskButton.classList.add("add-task-btn");
  addTaskButton.id = "add-task-btn";
  addTaskButton.textContent = "Add task";
  circlePlusIcon.classList.add("fa-solid");
  circlePlusIcon.classList.add("fa-circle-plus");
  circlePlusIcon.classList.add("fa-fw");
  plusIcon.classList.add("fa-solid");
  plusIcon.classList.add("fa-plus");
  plusIcon.classList.add("fa-fw");
  addTaskButton.addEventListener("click", () => {
    DOM.openDialog(NewTaskDialog());
    if (DOM.currentMenu === "tasks-for-today") {
      const dueDateInput = document.querySelector("#new-task-input-dueDate");
      dueDateInput.valueAsDate = new Date();
    }
  });

  header.append(heading, subheading);
  subheading.prepend(circleCheckIcon);
  addTaskButton.prepend(circlePlusIcon, plusIcon);

  return [header, taskList, addTaskButton];
}
