varying vec3 vPosition;
uniform float uTime;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Extracting the vertex position
    vec3 pos = modelPosition.xyz;

    // // Split the cube horizontally into quarters
    // float quarterHeight = 0.0;
    // if (pos.y > quarterHeight) {
    //     pos.y -= quarterHeight;
    // } else {
    //     pos.y += quarterHeight; // Move the bottom two quarters up
    // }
    
    
    // float normalizedTime = 10.0 * sin(uTime / 1200.0);
    float normalizedTime = (uTime / 480.0);

    // Rotate each quarter independently
    float rotationSpeedOuter = 0.25;
    float rotationSpeedInner = 0.5;
    float rotationAngleOuter = normalizedTime * rotationSpeedOuter;
    float rotationAngleInner = normalizedTime * rotationSpeedInner;

    if (pos.y > 0.0) {
        if (pos.y > 1.0){
        pos.xz = mat2(cos(rotationAngleOuter), sin(rotationAngleOuter), -sin(rotationAngleOuter), cos(rotationAngleOuter)) * pos.xz;
        } else {
        pos.xz = mat2(cos(rotationAngleInner), sin(rotationAngleInner), -sin(rotationAngleInner), cos(rotationAngleInner)) * pos.xz * 0.8 ;
        }
    } else {
        if (pos.y < - 1.0){
        pos.xz = mat2(cos(-rotationAngleOuter), sin(-rotationAngleOuter), -sin(-rotationAngleOuter), cos(-rotationAngleOuter)) * pos.xz;
        } else {
        pos.xz = mat2(cos(-rotationAngleInner), sin(-rotationAngleInner), -sin(-rotationAngleInner), cos(-rotationAngleInner)) * pos.xz * 0.8; // param here
        }

    }

    modelPosition.xyz = pos;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vPosition = viewPosition.xyz;
}