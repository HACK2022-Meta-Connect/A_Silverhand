import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js";
import Floor from "./Floor.js";
import Theme from "./Theme.js";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.theme = new Theme();

    this.resources.on("ready", () => {
      this.room = new Room();
      this.environment = new Environment();
      this.floor = new Floor();
      this.experience.preloader.on("roomintrodone", () => {
        this.controls = new Controls();
      });

      this.emit("worldready");
    });

    this.theme.on("theme_change", (theme) => {
      if (this.environment) this.environment.themeSwitched(theme);
      if (this.room) this.room.themeSwitched(theme);
    });
  }

  createHelpers() {
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  resize() {}

  update() {
    if (this.room) this.room.update();
    if (this.controls) this.controls.update();
    if (this.floor) this.floor.update();
  }
}
