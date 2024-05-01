import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.setInstance();
    this.setOrbitControls();
    // this.setAudio
    // this.setupClickEvent();

  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(3, 3, 3);
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.target = new THREE.Vector3(0, 1, 1);
    this.controls.target = new THREE.Vector3(0, 0, 0);
  }

  // setAudio(){
  //   if(!this.interacted) {
  //     // create an AudioListener and add it to the camera
  //     this.listener = new THREE.AudioListener();

  //     // // create a global audio source
  //     this.sound = new THREE.Audio( this.listener );

  //     this.audioLoader = new THREE.AudioLoader();

  //     // // create an AudioAnalyser, passing in the sound and desired fftSize
  //     this.analyser = new THREE.AudioAnalyser( this.sound, 32 );
  //     console.log(this.analyser.data)

  //     // // get the average frequency of the sound
  //     // const data = analyser.getAverageFrequency();
  //   }
  // }
  // setupClickEvent() {
  //   // Bind this to the click event listener function to access the Camera instance
  //   document.addEventListener('click', () => {
      
  //     this.interacted = true
  //     this.setAudio();

  //   });
  // }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
    // this.setAudio();
  }

}
