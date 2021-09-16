varying vec2 vUv;
uniform vec2 uResolution;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}