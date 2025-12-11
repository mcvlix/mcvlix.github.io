uniform float uTime;
const float PI = 3.14159265358979323846;

varying vec3 vPosition;


void main() {
    
    vec3 color = vec3(
        vPosition.y - cos(uTime * 0.003),
        vPosition.z + sin(uTime * 0.003) - vPosition.y * 0.5,
        vPosition.x 
        );

    gl_FragColor = vec4(
        color.rgb,
        1.0);
}
