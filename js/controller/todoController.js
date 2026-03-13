export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    const todoItems = await this.model.fetchTodos();
    this.view.render(todoItems);

    this.view.bindAddTodo(this.handleAddTodo.bind(this));
  }

  async handleAddTodo(todoText) {
    await this.model.addTodo(todoText);
    this.view.render(this.model.getTodos());
  }
}