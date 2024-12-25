import { DOM, state } from "../../index";

export default function NewTaskDialog() {
  const form = document.createElement("form");
  const topDiv = document.createElement("div");
  const titleInput = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const middleDiv = document.createElement("div");
  const dueDateInput = document.createElement("input");
  const priorityFormControl = document.createElement("div");
  const priorityLabel = document.createElement("label");
  const priorityInput = document.createElement("select");
  const repeatLabel = document.createElement("label");
  const repeatInput = document.createElement("input");
  const bottomDiv = document.createElement("div");
  const projectFormControl = document.createElement("div");
  const projectInput = document.createElement("select");
  const actionDiv = document.createElement("div");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");

  form.classList.add("new-task-form");
  form.id = "new-task-form";
  form.addEventListener("click", (e) => e.stopPropagation());
  form.addEventListener("submit", (e) => e.preventDefault());

  //   Top Div
  titleInput.type = "text";
  titleInput.id = "new-task-input-title";
  titleInput.placeholder = "Attend very important meeting";
  titleInput.required = true;
  descriptionInput.type = "text";
  descriptionInput.id = "new-task-input-description";
  descriptionInput.placeholder = "Description";
  topDiv.append(titleInput, descriptionInput);

  //   Middle div
  dueDateInput.type = "date";
  dueDateInput.id = "new-task-input-dueDate";
  if (DOM.currentMenu === "tasks-for-today") {
    dueDateInput.valueAsDate = new Date();
  }
  priorityLabel.for = "new-task-input-priority";
  priorityLabel.textContent = "Priority: ";
  priorityInput.name = "test";
  priorityInput.id = "new-task-input-priority";
  [1, 2, 3, 4].forEach((priority) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = priority;
    priorityOption.textContent = priority;
    priorityInput.append(priorityOption);
  });
  repeatLabel.textContent = "Repeat ";
  repeatInput.type = "checkbox";
  repeatInput.checked = false;
  repeatLabel.append(repeatInput);
  priorityFormControl.append(priorityLabel, priorityInput);
  middleDiv.append(dueDateInput, priorityFormControl, repeatLabel);

  //   Bottom div
  state.currentUser.projects.forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.title;
    projectOption.textContent = project.title;

    projectInput.append(projectOption);
  });
  cancelButton.type = "button";
  cancelButton.classList.add("cancel-btn");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", DOM.closeDialog);
  submitButton.type = "submit";
  submitButton.classList.add("confirm-btn");
  submitButton.textContent = "Add task";
  submitButton.addEventListener("click", () =>
    DOM.createNewTask({
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      priority: priorityInput.value,
      isRepeatable: repeatInput.checked,
      parentProject: projectInput.value,
    })
  );
  actionDiv.classList.add("actions");
  projectFormControl.append(projectInput);
  actionDiv.append(cancelButton, submitButton);
  bottomDiv.append(projectFormControl, actionDiv);
  form.append(topDiv, middleDiv, bottomDiv);
  return form;
}
