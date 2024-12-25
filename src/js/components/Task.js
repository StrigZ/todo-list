import { format } from "date-fns";
import { DOM } from "../../index";

export default function TaskItem({
  title,
  description,
  dueDate,
  isRepeatable,
  parentProject,
}) {
  const li = document.createElement("li");
  const checkMarkDiv = document.createElement("div");
  const checkMarkButton = document.createElement("button");
  const checkMarkIcon = document.createElement("i");
  const article = document.createElement("article");
  const taskTitleEle = document.createElement("h4");
  const taskDescriptionEle = document.createElement("p");
  const taskBottomDiv = document.createElement("div");

  taskTitleEle.textContent = title;
  taskDescriptionEle.textContent = description;

  if (parentProject && parentProject.toLowerCase() !== "inbox") {
    const taskParenProjectButton = document.createElement("button");
    taskParenProjectButton.textContent = `#${parentProject}`;
    taskParenProjectButton.addEventListener("click", () =>
      DOM.renderProjectPage(parentProject)
    );
    taskBottomDiv.append(taskParenProjectButton);
  }

  if (dueDate && DOM.currentMenu !== "tasks-for-today") {
    const taskDueTimeDiv = document.createElement("div");
    const taskDueTimeTextEle = document.createElement("p");
    const taskDueTimeAlarmIcon = document.createElement("i");
    taskDueTimeAlarmIcon.classList.add("fa-regular");
    taskDueTimeAlarmIcon.classList.add("fa-bell");

    taskDueTimeTextEle.textContent = format(dueDate, "P");

    if (isRepeatable) {
      const taskDueTimeRefreshIcon = document.createElement("i");
      taskDueTimeRefreshIcon.classList.add("fa-solid");
      taskDueTimeRefreshIcon.classList.add("fa-arrows-rotate");
      taskDueTimeDiv.prepend(taskDueTimeRefreshIcon);
    }
    taskDueTimeDiv.appendChild(taskDueTimeTextEle);
    taskDueTimeDiv.append(taskDueTimeAlarmIcon);
    taskBottomDiv.prepend(taskDueTimeDiv);
  }

  checkMarkIcon.classList.add("fa-solid");
  checkMarkIcon.classList.add("fa-check");
  checkMarkIcon.classList.add("fa-fw");

  li.append(checkMarkDiv, article);

  if (
    (dueDate && DOM.currentMenu !== "tasks-for-today") ||
    (parentProject && parentProject.toLowerCase() !== "inbox")
  ) {
    li.append(taskBottomDiv);
  }

  checkMarkDiv.append(checkMarkButton);
  checkMarkButton.append(checkMarkIcon);
  article.append(taskTitleEle, taskDescriptionEle);

  return li;
}
