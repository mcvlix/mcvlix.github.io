import * as THREE from 'three'
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
    }
}