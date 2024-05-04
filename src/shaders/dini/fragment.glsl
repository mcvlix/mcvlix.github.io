uniform float uTime;

varying vec3 vPosition;

void main() {

    // float osc = distance(vPosition.xz, vec2(0))*10.0;

    // float r = sin(osc+1.33333) ;
    // float g = sin(osc+0.6666);
    // float b = sin(osc);

    // vec3 color = vec3(r,g,b) * sin(uTime);
    // color += 0.3;

    // Modulo to improve performance
    float modTime = mod(uTime, 10000.0);

    vec3 color = vec3(
        vPosition.y - cos(modTime * 0.003),
        vPosition.z + sin(modTime * 0.003) - vPosition.y * 0.5,
        vPosition.x 
        );

    gl_FragColor = vec4(
        color.rgb,
        1.0);
}