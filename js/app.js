import TodoModel from "./model/todoModel.js";
import TodoView from "./view/todoView.js";

const model = new TodoModel();
const view = new TodoView();

async function startApp() {
  const todoItems = await model.fetchTodos();
  view.render(todoItems);
}

startApp();