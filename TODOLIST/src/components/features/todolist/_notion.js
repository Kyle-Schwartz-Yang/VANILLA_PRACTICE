// ------------------------------------------

//1. Ініціалізація HTML-елементів
const todoInput = document.getElementById("task-app-input");
const todoList = document.getElementById("task-app-list");
const form = document.getElementById("todo-form");

//2. Ініціалізація масиву завдань
let todoArray = JSON.parse(localStorage.getItem("user")) || [];

//3. Виведення списку завдань на сторінку
updateTodoList();

//2. Додавання нового завдання, після нажаття на кнопку "Add"
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fnTodoList();
});

// --------------------------------------------------
/*
3. fnTodoList()

  Після відправки форми (submit) викликається функція fnTodoList(), яка:
  Зчитує текст з todoInput.
  Перевіряє, чи поле вводу не порожнє.
  Створює новий об'єкт завдання з унікальним id, текстом і статусом isDone (чи виконане).
  Додає нове завдання до масиву todoArray.
  Зберігає оновлений масив у localStorage.
  Додає нове завдання у список на сторінці.
  Очищає поле вводу.
*/

// --------------------------------------------------
function fnTodoList() {
  const inputTxt = todoInput.value.trim();
  if (inputTxt === "") return; // if input is empty

  const newTask = {
    id: Date.now(),
    text: inputTxt,
    isDone: false,
  };

  todoArray.push(newTask); // add new task to array
  localStorage.setItem("user", JSON.stringify(todoArray)); // save to local storage

  createTodoItem(newTask); // add new task to list
  todoInput.value = ""; // clear input
  updateTodoList(); // update list
}

//
/*
5. Оновлення списку завдань
- Спочатку очищує список завдань у HTML.
- Потім проходить по масиву todoArray, створюючи новий <li> для кожного завдання за допомогою createTodoItem().
*/
function updateTodoList() {
  todoList.innerHTML = ""; // Clear current list
  todoArray.forEach((task) => {
    let li = createTodoItem(task);

    todoList.append(li);
  });
}

/*
6.  Створення елемента списку завдань
Створює <li> з текстом завдання і кнопкою для видалення.
Додає клас active, якщо завдання виконане.

*/
function createTodoItem(task) {
  const Li = document.createElement("li");
  Li.classList.add("task-app-item");

  if (task.isDone) {
    Li.classList.add("active");
  }

  Li.innerHTML = `
    <span>${task.text}</span>
    <button type="button" class='task-app-button'>Delete</button>
  `;

  //! a. Перемикання статусу завдання
  Li.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-app-button")) return;
    Li.classList.toggle("active");
    task.isDone = !task.isDone;
    localStorage.setItem("user", JSON.stringify(todoArray));
  });

  //! b. Видалення завдання
  // Знаходимо кнопку видалення всередині елемента списку
  const deleteButton = Li.querySelector(".task-app-button");

  // Фільтруємо масив завдань, видаляючи завдання з відповідним id
  deleteButton.addEventListener("click", () => {
    // Фільтруємо масив завдань, видаляючи завдання з відповідним id
    todoArray = todoArray.filter((item) => item.id !== task.id);
    // Оновлюємо локальне сховище з новим масивом завдань
    localStorage.setItem("user", JSON.stringify(todoArray));
    // Оновлюємо список завдань на сторінці
    updateTodoList();
    // Li.remove(); //Альтернативний спосіб видалення елемента зі списку
  });

  return Li;
}

/*
7. Завантаження сторінки
При завантаженні сторінки:

Дані завантажуються з localStorage.
Всі завдання відображаються у списку за допомогою updateTodoList().

*/

// --------------------------------------------------
// ==================================================
