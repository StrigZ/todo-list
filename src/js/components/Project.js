import { DOM } from "../../index";

export default function Project({ title }) {
  const container = document.createElement("li");
  const button = document.createElement("button");
  const hashIcon = document.createElement("i");
  const deleteButton = document.createElement("button");

  button.type = "button";
  hashIcon.classList.add("fa-solid");
  hashIcon.classList.add("fa-hashtag");
  hashIcon.classList.add("fa-fw");
  button.textContent = title;
  button.id = title;
  button.addEventListener("click", () => {
    DOM.renderProjectPage(title);
  });
  deleteButton.textContent = "Del";
  deleteButton.addEventListener("click", () => {
    DOM.removeProject(title);
  });
  container.append(button, deleteButton);
  button.prepend(hashIcon);
  return container;
}
