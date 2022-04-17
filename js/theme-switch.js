const radioButtons = document.querySelectorAll("input[name='theme'");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  document.getElementById("theme-light").checked = true;
  document.body.dataset.theme = "light";
}

// Enable transitions after page loads
setTimeout(() => {
  document.querySelectorAll(".prevent-transition").forEach((el) => {
    el.classList.remove("prevent-transition");
  });
}, 100);

function handleClick(e) {
  const theme = e.target.value;
  document.body.dataset.theme = theme;
}

radioButtons.forEach((btn) => btn.addEventListener("click", handleClick));
