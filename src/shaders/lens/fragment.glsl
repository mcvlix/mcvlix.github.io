varying vec3 vPosition;
varying vec2 vUv;

void main() {
    // Calculate alpha value based on the y-component of the position vector
    float s = clamp(normalize(vPosition).y, 0.0, 1.0);

    // Output a white color with the calculated alpha value
    gl_FragColor = vec4(1.0, 1.0, 1.0, s);
}
