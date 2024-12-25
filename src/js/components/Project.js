{
  /* <li>
<button type="button">
  <i class="fa-solid fa-hashtag fa-fw"></i>
  Fitness
</button>
</li> */
}

export default function Project({ title }) {
  const container = document.createElement("li");
  const button = document.createElement("button");
  const hashIcon = document.createElement("i");

  button.type = "button";
  hashIcon.classList.add("fa-solid");
  hashIcon.classList.add("fa-hashtag");
  hashIcon.classList.add("fa-fw");
  button.textContent = title;
  container.append(button);
  button.prepend(hashIcon);
  return container;
}
