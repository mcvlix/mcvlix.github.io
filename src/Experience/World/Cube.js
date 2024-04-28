import * as THREE from 'three'
import Experience from '../Experience.js'
// import Hydra from 'hydra-synth';

// const hydra = new Hydra({ detectAudio: false })

export default class Cube
{
    constructor(hydra)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        // Save reference to Hydra Synth instance
        // this.hydra = hydra;
        // console.log(this.hydra)
    }

    setGeometry()
    {
        this.geometry = new THREE.BoxGeometry(1,1,1)
    }

    setTextures()
    {
        this.textures = {}
    }

    setMaterial()
    {
        this.material = new THREE.MeshNormalMaterial()
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
        this.mesh.position.y = 0
    }

    update() 
    {

        // Update the scale of the mesh based on audio input from Hydra Synth
        // const scaleY = this.hydra.fft[0]; // Assuming the first frequency bin value represents the audio amplitude
        // this.mesh.scale.y = scaleY;
    }
}