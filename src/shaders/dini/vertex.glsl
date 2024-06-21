uniform float uTime;
uniform float totalRadians;
uniform float width;

const float PI = 3.14159265358979323846;
const float e = exp(1.0);

varying vec3 vPosition;

void main()
{

    vPosition = position.xyz + 0.5;

    float a = width * sin(uTime * 0.0002);
    float b = 0.2;
    float u = 
        vPosition.x 
        * totalRadians * PI 
        * abs(sin(uTime * 0.0002));
    float v = 
        vPosition.y;

    vec4 diniParams = vec4(a, b, u, v);

    float x = diniParams.x * cos(diniParams.z) * sin(diniParams.w);
    float z = diniParams.x * sin(diniParams.z) * sin(diniParams.w);
    float y = 
        (cos(diniParams.w) 
        + (log(tan(diniParams.w * 0.5)))/log(e)) 
        + diniParams.y * diniParams.z;

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
}
