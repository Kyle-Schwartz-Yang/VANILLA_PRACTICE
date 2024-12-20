import "./main.scss";
// ------------------------------------------

const todoList = document.getElementById("task-app-list");
const todoButton = document.getElementById("task-app-button");
const todoInput = document.getElementById("task-app-input");

function fnTodoList() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.classList.add("task-app-item");

  li.innerHTML = `
    <span>${taskText}</span>
    <button type="button" class='task-app-button'>Delete</button>
  `;

  // Стилізація виконаної задачи
  li.addEventListener("click", (e) => {
    // Якщо клік був по кнопці видалення — не робимо нічого
    if (e.target.classList.contains("task-app-button")) return;
    li.classList.toggle("active");
  });

  // Add delete functionality
  const deleteButton = li.querySelector(".task-app-button");
  deleteButton.addEventListener("click", () => li.remove());

  todoList.append(li);

  todoInput.value = "";
}

todoButton.addEventListener("click", fnTodoList);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fnTodoList();
});

/*
  Зверни уважу що нам не потрібно, робити код складніше та брати всі кнопки .task-app-button / Коли ми використовуємо li.querySelector тоді 
  ми створіємо для кожного li власний слухач подій

  const delteButtons = document.querySelectorAll('.remove-btn').
  delteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.parentElement.remove();
      });
  });


*/
