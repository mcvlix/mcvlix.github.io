varying vec3 vPosition;
uniform float uTime;

void main() {

    float distancex = distance(vPosition.x, 0.0);
    float centercolor = 1.2 * abs(1.0 - distancex);
    float topcolor = 0.6 * vPosition.y;
    float bottomcolor = 1.0 - 0.6 * vPosition.y;

    gl_FragColor = vec4( topcolor, centercolor, bottomcolor, 1.0);
}