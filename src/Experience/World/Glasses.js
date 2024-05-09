import * as THREE from 'three'
<<<<<<< Updated upstream
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// create and import shaders

export default class Glasses{
    constructor(){
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        let mixer = null

        gltfLoader.load(
            'models/glasses/glasses.gltf',
            (gltf) =>
            {
                console.log(gltf)
            }
        )

        // make all glasses into a group
        // have a separate child, animation, shaders for lens, frames, and framedupes
=======
import Experience from '../Experience.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import lensVertexShaders from '../../shaders/lens/vertex.glsl'
import lensFragmentShaders from '../../shaders/lens/fragment.glsl'
console.log('lensVertexShaders')

export default class Glasses{
    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('/draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        let mixer = null

        const cloneCount = 1
        const deltaY = 0
        this.playFloatingAnimation = true
        
        // make all glasses into a group
        // have a separate child, animation, shaders for lens, frames, and framedupes
        this.setMaterial()
        this.setGlasses()
        this.setFrameDupes(cloneCount, deltaY, true, true)
        console.log(this.frameDupes)

        const axesHelper = new THREE.AxesHelper()
        this.scene.add(axesHelper)
    }

    setMaterial(){

        this.frameMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            side: THREE.DoubleSide,
            metalness: 0.7,
            roughness: 0.1,
            envMapIntensity: 1,
            envmap: this.scene.environment,
            blending: THREE.NoBlending,
        })

        // this.lensMaterial = new THREE.MeshNormalMaterial({
        //     color: 0xbbbbbb,
        //     side: THREE.DoubleSide,
        //     envMapIntensity: 1,
        //     transparent: true,
        //     opacity: 0.5,
        //     depthWrite: false ,
        //     envmap: this.scene.environment
        // })

        this.lensMaterial = new THREE.MeshNormalMaterial({
            vertexShader: lensVertexShaders,
            fragmentShader: lensFragmentShaders,
            transparent: true,
            envMapIntensity: 1,
            side: THREE.DoubleSide,
            depthWrite: true
        })
    }

    setLens() {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                '/models/Glasses/lens.gltf',
                (gltf) => {
                    const lens = new THREE.Group();
                    const mirror = gltf.scene.clone();
                    mirror.scale.z = -1;
                    lens.add(gltf.scene, mirror);
    
                    lens.traverse((child) => {
                        if (child.isMesh) {
                            child.material = this.lensMaterial;
                        }
                    });
                    this.lens = lens;
                    resolve();
                },
                undefined,
                reject
            );
        });
    }
    
    setFrame() {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                '/models/Glasses/frame.gltf',
                (gltf) => {
                    const frame = new THREE.Group();
                    const mirror = gltf.scene.clone();
                    mirror.scale.z = -1;
                    frame.add(gltf.scene, mirror);
    
                    frame.traverse((child) => {
                        if (child.isMesh) {
                            child.material = this.frameMaterial;
                        }
                    });
                    this.frame = frame;
                    resolve();
                },
                undefined,
                reject
            );
        });
    }
    
    async setGlasses() {
        try {
            await Promise.all([this.setLens(), this.setFrame()]);
            this.glasses = new THREE.Group();
            this.glasses.add(this.frame);
            this.glasses.add(this.lens);
            this.scene.add(this.glasses);
        } catch (error) {
            console.error('Error loading glasses:', error);
        }
    }
    

    setFrameDupes(count, cloneSpacing, mirroredZ, mirroredY){

        this.gltfLoader.load(
            '/models/Glasses/framedupe.gltf',
            (gltf) =>
            {
                this.frameDupes = new THREE.Group()
                this.frameDupes.add(gltf.scene);

                this.mirroredFrameDupes = new THREE.Group()
                // for (let i = 0; i < count; i++) {

                //     const clonedFrameDupe = gltf.scene.clone();
                //     clonedFrameDupe.position.y = i * cloneSpacing;
                //     // clonedFrameDupe.scale.x = (i+1) * 1.2;
                //     clonedFrameDupe.rotation.x = -Math.PI * i * 0.05;
                //     clonedFrameDupe.scale.z = Math.pow(1.1,(i));
                //     this.frameDupes.add(clonedFrameDupe);
                // }

                this.frameDupes.traverse((child =>{
                    if (child.isMesh) {
                        child.material = this.frameMaterial
                    }
                }));

                if (mirroredZ){
                    this.frameDupes.traverse((child =>{
                        if (child instanceof THREE.Mesh) {
                            const childClone = child.clone()
                            childClone.scale.z = -1
                            this.frameDupes.add(childClone)
                        }
                    }))
                }

                if (mirroredY){
                    this.frameDupes.traverse((child =>{
                        if (child instanceof THREE.Mesh) {
                            const childClone = child.clone()
                            childClone.position.y *= -1
                            childClone.scale.y = -1
                            childClone.scale.y += 0.5
                            this.mirroredFrameDupes.add(childClone)
                        }
                    }))
                }

                
                this.scene.add(this.frameDupes)
                this.scene.add(this.mirroredFrameDupes)
                console.log(this.frameDupes)
                
            }
        )
    }
    
    floatingAnimation(){

        const animSpeed = this.experience.time.elapsed * 0.0015
        if (this.frameDupes && this.playFloatingAnimation) { // Check if frameDupes is initialized
            
            const yPosition = Math.sin(animSpeed);
            const zPosition = Math.cos(animSpeed);
            const scaleFactor = 1.1 + Math.sin(animSpeed) * 0.1
            
            this.frameDupes.position.y = 0.2 * yPosition 
            this.mirroredFrameDupes.position.y = - 0.2* yPosition
        }

        
        if (this.glasses) {
            const yPosition = - Math.sin(animSpeed) * 2;
            this.glasses.position.y = -0.25 - (0.1 * yPosition)
        }
>>>>>>> Stashed changes
    }
}