export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    const todoItems = await this.model.fetchTodos();
    this.view.render(todoItems);

    this.view.bindAddTodo(this.handleAddTodo.bind(this));
    this.view.bindTodoActions(this.handleTodoAction.bind(this));
  }

  async handleAddTodo(todoText) {
    await this.model.addTodo(todoText);
    this.view.render(this.model.getTodos());
  }

  async handleTodoAction(actionType, todoId, todoItemElement) {
    if (actionType === "toggle") {
      await this.model.toggleTodo(todoId);
      this.view.render(this.model.getTodos());
      return;
    }

    if (actionType === "delete") {
      await this.model.deleteTodo(todoId);
      this.view.render(this.model.getTodos());
      return;
    }

    if (actionType === "edit") {
      const todoTextElement = todoItemElement.querySelector(".todo-text");
      const editInputElement = todoItemElement.querySelector(".edit-input");
      const editButtonElement = todoItemElement.querySelector(".edit-btn");

      const isEditing = !editInputElement.classList.contains("hidden");

      if (!isEditing) {
        todoTextElement.classList.add("hidden");
        editInputElement.classList.remove("hidden");
        editInputElement.focus();
        editButtonElement.textContent = "Save";
        return;
      }

      const updatedValue = editInputElement.value.trim();

      if (!updatedValue) {
        editInputElement.value = todoTextElement.textContent;
        todoTextElement.classList.remove("hidden");
        editInputElement.classList.add("hidden");
        editButtonElement.textContent = "Edit";
        return;
      }

      await this.model.updateTodo(todoId, updatedValue);
      this.view.render(this.model.getTodos());
    }
  }
}