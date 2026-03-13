import TodoModel from "./model/todoModel.js";
import TodoView from "./view/todoView.js";
import TodoController from "./controller/todoController.js";

const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);

controller.init();