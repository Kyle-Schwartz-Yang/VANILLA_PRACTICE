const form = document.getElementById("localform");
const nameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const checkboxField = document.getElementById("subscribe");

// Загрузка сохраненных данных при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("user");
  if (savedData) {
    const user = JSON.parse(savedData);
    nameField.value = user.name || "";
    passwordField.value = user.password || "";
    checkboxField.checked = user.checkbox || false;
  }
});

// Сохранение данных в localStorage при изменениях
form.addEventListener("input", () => {
  const user = {
    name: nameField.value,
    password: passwordField.value,
    checkbox: checkboxField.checked,
  };
  localStorage.setItem("user", JSON.stringify(user));
});

// Очистка localStorage и полей после отправки
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Очистка localStorage
  localStorage.removeItem("user"); // Удаление данных из localStorage якщо потрібно

  // Очистка полей формы
  form.reset();

  alert("Форма отправлена и очищена!");
});
