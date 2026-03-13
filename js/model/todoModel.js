const API_URL = "https://dummyjson.com/todos";
const STORAGE_KEY = "todo-mvc-items";

export default class TodoModel {
  constructor() {
    this.todos = [];
    this.localIdSeed = Date.now();
  }

  async fetchTodos() {
    const savedTodos = this.getTodosFromStorage();

    if (savedTodos.length > 0) {
      this.todos = savedTodos;
      return this.todos;
    }

    const response = await fetch(API_URL);
    const data = await response.json();

    this.todos = data.todos;
    this.saveTodosToStorage();

    return this.todos;
  }

  getTodos() {
    return this.todos;
  }

  getTodosFromStorage() {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) return [];

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("Could not parse todos from localStorage", error);
      return [];
    }
  }

  saveTodosToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
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
    this.saveTodosToStorage();

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
    this.saveTodosToStorage();
  }

  async deleteTodo(todoId) {
    await fetch(`${API_URL}/${todoId}`, {
      method: "DELETE"
    });

    this.todos = this.todos.filter((todoItem) => todoItem.id !== todoId);
    this.saveTodosToStorage();
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
    this.saveTodosToStorage();
  }
}