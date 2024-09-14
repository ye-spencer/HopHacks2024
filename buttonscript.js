const buttons = document.querySelectorAll(".nav-section-right .btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //if active already, we remove active
    if (button.classList.contains("active")) {
      button.classList.remove("active");
      return;
    } else {
      //if not active remove the previous active to ensure each button is independent
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    }
  });
});
