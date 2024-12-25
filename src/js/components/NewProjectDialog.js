import { DOM, state } from "../../index";
{
  /* <form class="new-project-form">
  <h2>New Project</h2>
  <div>
    <label for="new-project-title">Title</label>
    <input type="text" id="new-project-title" required autofocus />
  </div>
  <div>
    <button type="button" id="cancel-new-task">
      Cancel
    </button>
    <button type="submit" id="add-task-btn">
      Add project
    </button>
  </div>
</form>; */
}
export default function NewProjectDialog() {
  const form = document.createElement("form");
  const formTitle = document.createElement("h2");
  const titleFormControl = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const actionDiv = document.createElement("div");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");

  form.classList.add("new-project-form");
  form.id = "new-project-form";
  form.addEventListener("click", (e) => e.stopPropagation());
  form.addEventListener("submit", (e) => e.preventDefault());

  titleLabel.for = "new-project-title";
  titleLabel.textContent = "Title";
  formTitle.textContent = "New Project";
  titleInput.type = "text";
  titleInput.id = "new-project-title";
  titleInput.required = true;
  titleInput.autofocus = true;
  titleFormControl.append(titleLabel, titleInput);

  cancelButton.type = "button";
  cancelButton.classList.add("cancel-btn");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", DOM.closeDialog);
  submitButton.type = "submit";
  submitButton.classList.add("confirm-btn");
  submitButton.textContent = "Add Project";
  submitButton.addEventListener("click", () =>
    DOM.createNewProject({
      title: titleInput.value,
    })
  );
  actionDiv.classList.add("actions");
  actionDiv.append(cancelButton, submitButton);
  form.append(formTitle, titleFormControl, actionDiv);
  return form;
}
