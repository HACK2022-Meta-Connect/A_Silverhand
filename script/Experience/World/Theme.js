import { EventEmitter } from "https://registry.yarnpkg.com/events/-/events-3.3.0.tgz#31a95ad0a924e2d2c419a813aeb2c4e878ea7400";

export default class Theme extends EventEmitter {
  constructor() {
    super();
    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle = document.querySelector(".toggle-circle");

    this.setEventListeners();
  }

  setEventListeners() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => {
        this.theme = this.theme === "light" ? "dark" : "light";
        this.toggleCircle.classList.toggle("slide");
        document
          .querySelector("body")
          .classList.toggle("dark-theme", this.theme === "dark");

        this.emit("theme_change", this.theme);
      });
    }
  }
}
