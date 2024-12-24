import "./main.scss";
// ------------------------------------------
const todoInput = document.getElementById("task-app-input");
const todoList = document.getElementById("task-app-list");

const form = document.getElementById("todo-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fnTodoList();
});

// todoButton.addEventListener("click", fnTodoList);

let todoArray = JSON.parse(localStorage.getItem("user")) || [];
console.log(todoArray);

updateTodoList();

function fnTodoList() {
  const inputTxt = todoInput.value.trim();
  if (inputTxt === "") return; // if input is empty

  const newTask = {
    id: Date.now(),
    text: inputTxt,
    isDone: false,
  };

  todoArray.push(newTask); // add new task to array

  createTodoItem(newTask); // add new task to list

  todoInput.value = ""; // clear input

  localStorage.setItem("user", JSON.stringify(todoArray)); // save to local storage
  updateTodoList(); // update list
}

function updateTodoList() {
  todoList.innerHTML = "";
  todoArray.forEach((task) => {
    let li = createTodoItem(task);

    todoList.append(li);
  });
}

function createTodoItem(task) {
  const Li = document.createElement("li");
  Li.classList.add("task-app-item");

  Li.innerHTML = `
    <span>${task.text}</span>
    <button type="button" class='task-app-button'>Delete</button>
  `;

  Li.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-app-button")) return;
    Li.classList.toggle("active");
  });

  const deleteButton = Li.querySelector(".task-app-button");
  deleteButton.addEventListener("click", () => {
    todoArray = todoArray.filter((item) => item.id !== task.id);

    localStorage.setItem("user", JSON.stringify(todoArray));
    updateTodoList();
    // _Li.remove();
  });

  return Li;
}
