export default class TodoView {
  constructor() {
    this.form = document.getElementById("todo-form");
    this.input = document.getElementById("todo-input");
    this.pendingList = document.getElementById("pending-list");
    this.completedList = document.getElementById("completed-list");
  }

  createActionButton(className, buttonText) {
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.textContent = buttonText;

    return button;
  }

  createTodoItem(todoItem) {
    const listItem = document.createElement("li");

    listItem.className = "todo-item";
    listItem.dataset.id = todoItem.id;

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todoItem.todo;

    const actionsContainer = document.createElement("div");
    actionsContainer.className = "todo-actions";

    const toggleButton = this.createActionButton(
      "toggle-btn",
      todoItem.completed ? "<-" : "->",
    );

    const deleteButton = this.createActionButton("delete-btn", "Delete");

    actionsContainer.append(toggleButton, deleteButton);
    listItem.append(todoText, actionsContainer);

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

  bindAddTodo(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputValue = this.input.value.trim();

      if (!inputValue) return;

      handler(inputValue);
      this.input.value = "";
    });    
  }
  
  bindTodoActions(handler) {
    const clickHandler = (event) => {
      const clickedElement = event.target;
      const todoItemElement = clickedElement.closest(".todo-item");

      if (!todoItemElement) return;

      const todoId = Number(todoItemElement.dataset.id);

      if (clickedElement.classList.contains("toggle-btn")) {
        handler("toggle", todoId);
      }

      if (clickedElement.classList.contains("delete-btn")) {
        handler("delete", todoId);
      }
    };

    this.pendingList.addEventListener("click", clickHandler);
    this.completedList.addEventListener("click", clickHandler);
  }
}
