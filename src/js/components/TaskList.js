import TaskItem from "./Task";

export default function TaskList(tasks) {
  return tasks.map((task) => TaskItem(task));
}
