import * as THREE from "three";
import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from './Utils/Time.js'
import Resources from "./Utils/Resources.js";
import Mouse from "./Utils/Mouse.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import sources from "./sources.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import Controllers from "./Controllers.js";

// import Cube from "./World/Cube.js";
// import Dini from "./World/Gini.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    // Global access
    window.experience = this;
    this.canvas = canvas;
    
    this.sampleBoolean = true;
    this.sampleNumber = 5;

    // this.debug = new Debug();
    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("experience");
    //   const debugObject = {
    //     sampleBoolean: this.sampleBoolean,
    //     sampleNumber: this.sampleNumber,
    //   };
    //   this.debugFolder.add(debugObject, "sampleBoolean").onChange((value) => {
    //     this.sampleBoolean = value;
    //     console.log(this.sampleBoolean);
    //   });
    //   this.debugFolder
    //     .add(debugObject, "sampleNumber")
    //     .min(0.5)
    //     .max(15)
    //     .onChange((value) => {
    //       this.sampleNumber = value;
    //       console.log(this.sampleNumber);
    //     });
    // }

    this.time = new Time();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.mouse = new Mouse();

    /**
     * Clock
     */
    this.clock = new THREE.Clock();
    this.clock.start();

    this.renderer.instance.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(this.renderer.instance));
    this.renderer.instance.setAnimationLoop(() => {
      this.time.tick();
      this.world.update();
      this.renderer.instance.render(this.scene, this.camera.instance);
    });

    this.controllers = new Controllers();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.INTERSECTED = null;
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    });
    window.addEventListener("click", () => {
      if (this.INTERSECTED) {
        // do something here if there is something in this.INTERSECTED
      }
    });
    this.sizes.on("resize", () => {
      this.resize();
      this.camera.resize();
      this.renderer.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    console.log("resized occured");
    this.camera.resize();
  }
  update() {
    this.camera.update();
    this.world.update();

    //change this to be controller if controller is active
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
  }
  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
