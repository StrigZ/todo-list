import { format } from "date-fns";
import { DOM, state } from "../../index";

export default function TaskItem({
  title,
  description,
  dueDate,
  isRepeatable,
  parentProjectId,
  priority,
  id,
}) {
  const li = document.createElement("li");
  const checkMarkDiv = document.createElement("div");
  const checkMarkButton = document.createElement("button");
  const checkMarkIcon = document.createElement("i");
  const article = document.createElement("article");
  const taskTitleEle = document.createElement("h4");
  const taskDescriptionEle = document.createElement("p");
  const taskBottomDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("i");

  const isCompleted = DOM.currentMenu === "Completed";
  const isOnTodaysPage = DOM.currentMenu === "tasks-for-today";
  if (isCompleted) {
    li.classList.add("completed");
  }

  taskTitleEle.textContent = title;
  taskDescriptionEle.textContent = description;

  if (parentProjectId !== "Inbox") {
    const parentProjectButton = document.createElement("button");

    parentProjectButton.textContent = `#${
      state.currentUser.getProjectById(parentProjectId).title
    }`;
    parentProjectButton.addEventListener("click", () =>
      DOM.renderProjectPage(parentProjectId)
    );
    taskBottomDiv.append(parentProjectButton);
  }

  if (dueDate && !isOnTodaysPage) {
    const taskDueTimeDiv = document.createElement("div");
    const taskDueTimeTextEle = document.createElement("p");

    taskDueTimeTextEle.textContent = isCompleted
      ? `Completed on: ${format(new Date(), "P")}`
      : format(dueDate, "P");

    if (isRepeatable && !isCompleted) {
      const taskDueTimeRefreshIcon = document.createElement("i");
      taskDueTimeRefreshIcon.classList.add("fa-solid", "fa-arrows-rotate");
      taskDueTimeDiv.prepend(taskDueTimeRefreshIcon);
    }
    taskDueTimeDiv.appendChild(taskDueTimeTextEle);
    taskBottomDiv.prepend(taskDueTimeDiv);
  }
  checkMarkButton.classList.add(`p-${priority}`);
  checkMarkButton.classList.add("check-mark-button");
  checkMarkButton.addEventListener("click", () => {
    if (isCompleted) {
      DOM.uncompleteTask(id);
    } else {
      DOM.completeTask(id);
    }
  });
  checkMarkIcon.classList.add("fa-solid", "fa-check", "fa-fw");

  deleteButton.addEventListener("click", () => DOM.deleteTask(id));
  deleteButton.classList.add("delete-btn");
  deleteButton.append(deleteIcon);
  deleteButton.classList.add("delete-btn");
  deleteIcon.classList.add("fa-solid", "fa-trash");

  li.append(checkMarkDiv, article, deleteButton);

  if (
    (dueDate && !isOnTodaysPage) ||
    (parentProjectId && parentProjectId !== "Inbox")
  ) {
    li.append(taskBottomDiv);
  }

  checkMarkDiv.append(checkMarkButton);
  checkMarkButton.append(checkMarkIcon);
  article.append(taskTitleEle, taskDescriptionEle);

  return li;
}
