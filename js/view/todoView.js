export default class TodoView {
  constructor() {
    this.pendingList = document.getElementById("pending-list");
    this.completedList = document.getElementById("completed-list");
  }

  createTodoItem(todoItem) {
    const listItem = document.createElement("li");

    listItem.className = "todo-item";
    listItem.dataset.id = todoItem.id;
    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todoItem.todo;

    listItem.append(todoText);

    return listItem;
  }

  render(todoItems){
    this.pendingList.replaceChildren();
    this.completedList.replaceChildren();

    todoItems.forEach((todoItem) => {
      const todoElement = this.createTodoItem(todoItem);

      if (todoItem.completed) {
        this.completedList.append(todoElement);
      } else {
        this.pendingList.append(todoElement);
      }
    });
  }
}