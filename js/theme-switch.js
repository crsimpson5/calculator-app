const themeSwitch = document.querySelector(".theme-switch");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  setTheme("light");
}

function setTheme(theme) {
  themeSwitch.dataset.theme = theme;
  document.body.dataset.theme = theme;
}

themeSwitch.addEventListener("click", () => {
  const theme = themeSwitch.dataset.theme;
  let newTheme = "dark";

  if (theme === "dark") {
    newTheme = "light";
  } else if (theme === "light") {
    newTheme = "purple";
  }

  setTheme(newTheme);
});
