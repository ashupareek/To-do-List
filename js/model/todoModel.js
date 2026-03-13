const BASE_URL = "https://dummyjson.com/todos";

export default class TodoModel {
  constructor() {
    this.todos = [];
  }

  async fetchTodos() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    this.todos = data.todos;
    return this.todos;
  }

  getTodos() {
    return this.todos;
  }
}