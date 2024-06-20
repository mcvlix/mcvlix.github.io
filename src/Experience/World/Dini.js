import * as THREE from 'three'
import Experience from '../Experience.js'

import diniVertexShaders from '../../shaders/dini/vertex.glsl'
import diniFragmentShaders from '../../shaders/dini/fragment.glsl'

// import Audio from '../Utils/Audio.js'

export default class Gini
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry()
    {
        this.geometry = new THREE.BoxGeometry(1,1,1,100, 20, 20)
        // this.geometry = new THREE.PlaneGeometry(1,1,100,100)
    }

    setTextures()
    {
        this.textures = {}
    }

    setMaterial()
    {
        // this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide, wireframe: true})
        this.material = new THREE.ShaderMaterial({
            vertexShader: diniVertexShaders,
            fragmentShader: diniFragmentShaders,
            uniforms:{
                uTime: {value: 0},
                // animSpeed: {value: 10},
                // 
                width: {value: 2.0},
                totalRadians: {value: 6.0},
            },
            wireframe: false,
            transparent: true
        })
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)

        this.mesh.scale.y = 1.0
        this.mesh.position.y = -1
    }
    
    update() 
    {
        this.material.uniforms.uTime.value = this.experience.time.elapsed
    }

    setParams(animSpeed, width, radians)
    {
    }
}