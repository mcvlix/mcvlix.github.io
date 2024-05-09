import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
// import Dini from "./Dini.js";
<<<<<<< Updated upstream
=======
import Glasses from "./Glasses.js"
>>>>>>> Stashed changes

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    

    // Objects
    this.floor = new Floor();
<<<<<<< Updated upstream
=======
    this.glasses = new Glasses();
    this.environment = new Environment();

>>>>>>> Stashed changes
    // this.dini = new Dini();

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
    console.log('hello')
    // // Bug in the ready function
<<<<<<< Updated upstream
    
=======
    this.glasses.floatingAnimation()
>>>>>>> Stashed changes
      // this.dini.update();
    
  }
}
