export const refVertexShader = `
varying vec3 localPosition;
varying vec4 worldPosition;

uniform vec3 worldCamProjPosition;
uniform vec3 worldPlanePosition;
uniform float fadeDistance;
uniform bool infiniteGrid;
uniform bool followCamera;

uniform int coord0;
uniform int coord1;
uniform int coord2;

void main() {
    localPosition = vec3(
        position[coord0],
        position[coord1],
        position[coord2]
    );

    if (infiniteGrid) {
        localPosition *= 1.0 + fadeDistance;
    }

    worldPosition = modelMatrix * vec4(localPosition, 1.0);
    if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
    }

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const vertexShader = `
uniform vec3 spotlight;
uniform float elevation;
uniform float fadeDistance;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
void main() {
    gl_fragColor =
}
`;
