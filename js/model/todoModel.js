const API_URL = "https://dummyjson.com/todos";

export default class TodoModel {
  constructor() {
    this.todos = [];
    this.localIdSeed = Date.now();
  }

  async fetchTodos() {
    const response = await fetch(API_URL);
    const data = await response.json();

    this.todos = data.todos;
    return this.todos;
  }

  getTodos() {
    return this.todos;
  }

  async addTodo(todoText) {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: todoText,
        completed: false,
        userId: 1
      })
    });

    const data = await response.json();

    const newTodo = {
      ...data,
      id: this.localIdSeed++
    };

    this.todos.unshift(newTodo);

    return newTodo;
  }
}