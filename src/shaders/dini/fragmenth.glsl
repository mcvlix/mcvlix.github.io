uniform float uTime;

varying vec3 vPosition;

void main() {
    
    vec3 color = vec3(
        vPosition.y - cos(uTime * 0.003),
        vPosition.z + sin(uTime * 0.003) - vPosition.y * 0.5,
        vPosition.x 
        );

    gl_FragColor = vec4(
        1.0 - color.rgb,
        1.0);
}