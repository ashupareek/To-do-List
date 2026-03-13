import TodoModel from "./model/todoModel.js";

const model = new TodoModel();

async function startApp() {
  const todos = await model.fetchTodos();
  console.log("Fetched todos:", todos);
}

startApp();