varying vec2 vUv;
uniform float progress;
float PI = 3.141529;

void main() {
  vec2 newUV = vUv;
  float bottom = 1. - progress;
  float curveStrength = 1.;
  float waveStrength = 1.;
  // float curve = progress + sin(newUV.x * PI * waveStrength) * progress * bottom;
  float curve = progress + (sin(newUV.x * PI * waveStrength) * progress - progress) * bottom * curveStrength;
  float color = step(curve,newUV.y);
  gl_FragColor = vec4(color,color,color,1.);
}