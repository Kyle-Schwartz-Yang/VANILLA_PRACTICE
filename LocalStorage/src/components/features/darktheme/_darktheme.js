export const initDarkMode = () => {
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  themeSwitch.addEventListener("click", () => {
    body.classList.toggle("darkmode");

    if (body.classList.contains("darkmode")) {
      localStorage.setItem("darkmode", "enabled");
    } else {
      localStorage.setItem("darkmode", "disabled");
    }
  });

  let darkmote = localStorage.getItem("darkmode");

  if (darkmote === "enabled") {
    body.classList.add("darkmode");
  } else {
    body.classList.remove("darkmode");
  }
};
