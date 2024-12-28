import { DOM } from "../../index";

export default function Project({ title, id }) {
  const container = document.createElement("li");
  const button = document.createElement("button");
  const hashIcon = document.createElement("i");
  const deleteButton = document.createElement("button");
  const deleteButtonIcon = document.createElement("i");

  button.type = "button";
  hashIcon.classList.add("fa-solid");
  hashIcon.classList.add("fa-hashtag");
  hashIcon.classList.add("fa-fw");
  button.textContent = title;
  button.id = id;
  button.addEventListener("click", () => {
    DOM.renderProjectPage(id);
  });
  deleteButton.addEventListener("click", () => {
    DOM.removeProject(title, id);
  });
  deleteButtonIcon.classList.add("fa-solid", "fa-trash");
  deleteButton.classList.add("delete-btn");
  deleteButton.append(deleteButtonIcon);
  container.append(button, deleteButton);
  button.prepend(hashIcon);
  return container;
}
