import * as THREE from 'three';

export default class Audio
{
    constructor()
    {
        this.audio = new THREE.Audio(listener);

        // Create a new AudioAnalyser
        this.analyser = new THREE.AudioAnalyser(audio, 32);

        // Load an audio file and set it as the Audio object's buffer
        this.audioLoader = new THREE.AudioLoader();
        audioLoader.load('example_audio.mp3', function(buffer) {
            audio.setBuffer(buffer);
            audio.setLoop(true);
            audio.setVolume(0.5);
            audio.play();
        });
    }        
}