// const form = document.getElementById("localform");
// const formFiels = form.elements;

export const initLocalForm = () => {
  const form = document.getElementById("localform");
  const inputs = form.querySelectorAll("input, textarea");

  // Load saved data from localStorage
  inputs.forEach((input) => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      if (input.type === "checkbox") {
        input.checked = savedValue === "true";
      } else {
        input.value = savedValue;
      }
    }
  });

  // Save data to localStorage on input change
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.type === "checkbox") {
        localStorage.setItem(input.id, input.checked);
      } else {
        localStorage.setItem(input.id, input.value);
      }
    });
  });

  // Очіщення після відправки форми
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Запобігає оновленню сторінки
    inputs.forEach((input) => {
      localStorage.removeItem(input.id);
      if (input.type === "checkbox") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });

    // Можна додати сповіщення про успішне надсилання
    alert("Форма відправлена та очищена!");
  });

  // Clear localStorage on form reset
  form.addEventListener("reset", () => {
    inputs.forEach((input) => {
      localStorage.removeItem(input.id);
    });
  });
};

// ------------------------------------------------------------
