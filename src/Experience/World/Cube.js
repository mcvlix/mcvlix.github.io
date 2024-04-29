import * as THREE from 'three'
import Experience from '../Experience.js'

import cubeVertexShaders from '../../shaders/cube/vertex.glsl'
import cubeFragmentShaders from '../../shaders/cube/fragment.glsl'

// import Audio from '../Utils/Audio.js'

export default class Cube
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry()
    {
        this.geometry = new THREE.BoxGeometry(1,1,1, 3, 3, 3)
    }

    setTextures()
    {
        this.textures = {}
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: cubeVertexShaders,
            fragmentShader: cubeFragmentShaders,
            uniforms:{
                uTime: {value: 0},
            },
            wireframe: true,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.y = 4
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
    
    update() 
    {
        this.material.uniforms.uTime.value = this.experience.time.elapsed
        this.mesh.scale.z = Math.sin(this.experience.time.elapsed / 1000)
        this.mesh.scale.x = Math.sin(this.experience.time.elapsed / 1000)
    }
}