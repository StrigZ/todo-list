import { format } from "date-fns";

export default function TaskItem({
  title,
  description,
  dueTime,
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
  const taskDueTimeRefreshIcon = document.createElement("i");
  const taskDueTimeTextEle = document.createElement("p");
  const taskDueTimeAlarmIcon = document.createElement("i");
  const taskParenProjectButton = document.createElement("button");

  taskTitleEle.textContent = title;
  taskDescriptionEle.textContent = description;
  taskDueTimeTextEle.textContent = format(dueTime, "HH:mm'");
  taskParenProjectButton.textContent = `#${parentProject.title}`;
  taskDueTimeAlarmIcon.classList.add("fa-regular fa-bell");

  if (isRepeatable) {
    taskDueTimeRefreshIcon.classList.add("fa-solid fa-arrows-rotate");
  } else {
    taskDueTimeRefreshIcon = null;
  }

  li.append(checkMarkDiv, article, taskBottomDiv);
  checkMarkDiv.append(checkMarkButton);
  checkMarkButton.append(checkMarkIcon);
  article.append(taskTitleEle, taskDescriptionEle);
  taskBottomDiv.append(taskDueTimeDiv, taskParenProjectButton);
  taskDueTimeDiv.append(
    taskDueTimeRefreshIcon,
    taskDueTimeTextEle,
    taskDueTimeAlarmIcon
  );
}
