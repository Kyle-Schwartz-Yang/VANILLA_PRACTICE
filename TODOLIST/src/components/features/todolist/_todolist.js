export const initTodoList = () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  let todoArray = getFromLocalStorage();
  updateTodoList();

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const todoObject = {
      text: todoText,
      completed: false,
    };

    todoArray.push(todoObject);
    // ------------------------------------------------------------
    updateTodoList();

    // localStorage.setItem("user", JSON.stringify(todoArray));
    saveToLocalStorage();
    // ------------------------------------------------------------
    todoInput.value = "";
  }

  function updateTodoList() {
    todoList.innerHTML = "";
    todoArray.forEach((todo, idx) => {
      const element = createTodoElement(todo, idx);
      todoList.appendChild(element);
    });
  }

  function createTodoElement(todo, idx) {
    const Li = document.createElement("li");
    Li.classList.add("todo__item");
    Li.id = "unique-" + idx;

    // ------------------------------------------------------------
    const Span = document.createElement("span");
    Span.classList.add("todo__text");
    Span.textContent = todo.text;
    // ------------------------------------------------------------
    const Button = document.createElement("button");
    Button.classList.add("todo__button--delete");
    Button.textContent = "Delete";
    // ------------------------------------------------------------

    Li.appendChild(Span);
    Li.appendChild(Button);

    // ------------------------------------------------------------
    Li.addEventListener("click", (e) => {
      if (e.target.classList.contains("todo__button--delete")) return;
      // -----------------------------
      Li.classList.toggle("active");
      todo.completed = !todo.completed;
      saveToLocalStorage();
      // -----------------------------
    });

    if (todo.completed) {
      Li.classList.add("active");
    }
    // ------------------------------------------------------------
    Button.addEventListener("click", () => {
      deleteTodoElement(idx);
    });

    return Li;
  }

  function deleteTodoElement(idx) {
    todoArray = todoArray.filter((_, index) => index !== idx);
    saveToLocalStorage();
    updateTodoList();
  }

  function saveToLocalStorage() {
    localStorage.setItem("user", JSON.stringify(todoArray));
  }

  function getFromLocalStorage() {
    const todos = localStorage.getItem("user") || "[]";
    return JSON.parse(todos);
  }
};
