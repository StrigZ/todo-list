import { format } from "date-fns";

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
  const taskDueTimeDiv = document.createElement("div");
  const taskDueTimeTextEle = document.createElement("p");
  const taskDueTimeAlarmIcon = document.createElement("i");

  taskTitleEle.textContent = title;
  taskDescriptionEle.textContent = description;

  taskDueTimeTextEle.textContent = format(dueDate, "HH:mm");
  if (parentProject) {
    const taskParenProjectButton = document.createElement("button");
    taskParenProjectButton.textContent = `#${parentProject.title}`;
    taskBottomDiv.append(taskParenProjectButton);
  }

  taskDueTimeAlarmIcon.classList.add("fa-regular");
  taskDueTimeAlarmIcon.classList.add("fa-bell");

  if (isRepeatable) {
    const taskDueTimeRefreshIcon = document.createElement("i");
    taskDueTimeRefreshIcon.classList.add("fa-solid");
    taskDueTimeRefreshIcon.classList.add("fa-arrows-rotate");
    taskDueTimeDiv.prepend(taskDueTimeRefreshIcon);
  }

  li.append(checkMarkDiv, article, taskBottomDiv);
  checkMarkDiv.append(checkMarkButton);
  checkMarkButton.append(checkMarkIcon);
  article.append(taskTitleEle, taskDescriptionEle);
  taskBottomDiv.prepend(taskDueTimeDiv);
  taskDueTimeDiv.append(taskDueTimeTextEle, taskDueTimeAlarmIcon);

  return li;
}
