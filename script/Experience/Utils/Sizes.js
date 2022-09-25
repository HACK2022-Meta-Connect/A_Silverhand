import { EventEmitter } from "https://registry.yarnpkg.com/events/-/events-3.3.0.tgz#31a95ad0a924e2d2c419a813aeb2c4e878ea7400";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.device = this.width < 980 ? "mobile" : "desktop";

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");

      if (this.width < 980 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("deviceswitch", this.device);
      } else if (this.width >= 980 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("deviceswitch", this.device);
      }
    });
  }
}
