import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Glasses from "./Glasses.js"
import ParticleSystem from "./Particles.js"

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    

    // Objects
    this.floor = new Floor();
    this.glasses = new Glasses();
    this.environment = new Environment();
    this.particleSystem = new ParticleSystem(this.glasses);

    // Wait for resources
    this.ready = false;
    this.resources.on("ready", () => {
      // Setup
      console.log("resources ready");

      this.ready = true;
      
      console.log(this.ready)
    });
  }
  update() {
    this.glasses.floatingAnimation()
    this.particleSystem.updatePositions()
  }
}
