import * as THREE from 'three'
import Experience from '../Experience.js'

export default class ParticleSystem
{
    constructor(meshGroup) {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.parameters = {}
        this.parameters.count = 20000

        this.setGeometry(meshGroup)
        this.setParticles()
        this.updatePositions()
    }
    setGeometry(glasses){
        if(glasses){
        console.log(glasses)
        }
    }
    updatePositions()
    {
        this.positions = this.basePositions
        for(let i= 0; i < this.parameters.count; i++)
            {
                const i3 = i * 3
                const pSpeed = Math.random()
                this.positions[i3    ] = this.basePositions[i3    ]
                this.positions[i3 + 1] = this.basePositions[i3 + 1] 
                this.positions[i3 + 2] = this.basePositions[i3 + 2] 
            }
            this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))

    }
    setParticles(mesh)
    {
        
        this.geometry = new THREE.BufferGeometry()
        this.basePositions = new Float32Array(this.parameters.count * 3)
        for(let i= 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3

            this.basePositions[i3    ] = (Math.random() - 0.5) * 80 
            this.basePositions[i3 + 1] = (Math.random() - 0.5) * 80
            this.basePositions[i3 + 2] = (Math.random() - 0.5) * 80
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.basePositions, 3))
        
        this.material = new THREE.PointsMaterial({
            size: 0.5
        })

        this.particles = new THREE.Points(this.geometry, this.material)
        
        this.scene.add(this.particles)
        console.log(this.particles)
    }
}