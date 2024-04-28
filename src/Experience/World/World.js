import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Cube from "./Cube.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Objects
    this.floor = new Floor();
    this.cube = new Cube();

    // Wait for resources
    this.ready = false;
    this.resources.on("ready", () => {
      // Setup
      console.log("resources ready");

      this.environment = new Environment();
      this.ready = true;
      
      console.log(this.ready)
    });
  }
  update() {
    // Bug in the ready function
    // if (this.ready) {
    this.cube.update();
      // this.butterflies.update();
      // this.butterfly.update();
    // }
  }
}
