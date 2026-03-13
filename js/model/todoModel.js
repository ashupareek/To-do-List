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

  async toggleTodo(todoId) {
    const selectedTodo = this.todos.find((todoItem) => todoItem.id === todoId);

    if (!selectedTodo) return;

    const updatedCompletedValue = !selectedTodo.completed;

    await fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: updatedCompletedValue
      })
    });

    selectedTodo.completed = updatedCompletedValue;
  }

  async deleteTodo(todoId) {
    await fetch(`${API_URL}/${todoId}`, {
      method: "DELETE"
    });

    this.todos = this.todos.filter((todoItem) => todoItem.id !== todoId);
  }

  async updateTodo(todoId, updatedText) {
    const selectedTodo = this.todos.find((todoItem) => todoItem.id === todoId);

    if (!selectedTodo || !updatedText) return;

    await fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: updatedText
      })
    });

    selectedTodo.todo = updatedText;
  }
}