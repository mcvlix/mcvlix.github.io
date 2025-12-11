varying vec3 vPosition;

void main() {
    vec3 color = vec3(1.0);
    
    // Calculate screen-space derivatives for anti-aliasing
    vec2 coord = vPosition.xy;
    vec2 derivative = fwidth(coord);
    
    // Grid calculation with automatic anti-aliasing
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / derivative;
    float line = min(grid.x, grid.y);
    
    // Convert to opacity with sharp cutoff
    float opacity = 1.0 - min(line, 1.0);
    
    // Optional: Add major grid lines every 5 units
    vec2 majorGrid = abs(fract(coord * 0.2 - 0.5) - 0.5) / (derivative * 0.2);
    float majorLine = min(majorGrid.x, majorGrid.y);
    float majorOpacity = (1.0 - min(majorLine, 1.0)) * 0.5;
    
    // Combine regular and major grid lines
    opacity = max(opacity * 0.2, majorOpacity);
    
    // Distance-based fade for performance
    float dist = length(vPosition);
    float fade = 1.0 - smoothstep(10.0, 30.0, dist);
    opacity *= fade;
    
    gl_FragColor = vec4(color, opacity);
}
