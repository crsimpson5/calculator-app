const savedTheme = localStorage.getItem("theme");
const radioButtons = document.querySelectorAll("input[name='theme'");

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

if (savedTheme) {
  setTheme(savedTheme);
  document.getElementById(`theme-${savedTheme}`).checked = true;
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  document.getElementById("theme-light").checked = true;
  setTheme("light");
}

// Enable transitions after page loads
setTimeout(() => {
  document.querySelectorAll(".prevent-transition").forEach((el) => {
    el.classList.remove("prevent-transition");
  });
}, 100);

function handleClick(e) {
  const theme = e.target.value;
  setTheme(theme);
}

radioButtons.forEach((btn) => btn.addEventListener("click", handleClick));
