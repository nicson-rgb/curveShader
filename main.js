import * as THREE from 'three'
import frag from './shader/main.frag?raw'
import vert from './shader/main.vert?raw'
import gsap from 'gsap'



export default class main {
  constructor(webgl) {
    this.webgl = webgl
    this.scene = new THREE.Scene()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    this.renderer.setClearColor( new THREE.Color( 0xCCCCCCC ))
    this.renderer.setSize(this.width,this.height)
    this.geometry = null
    this.material = null
    this.mesh = null
    this.camera = null

    this.init()
  }

  init() {
    this.setting()
    this.onRaf()
    this.tl = gsap.timeline()
    .to(this.material.uniforms.progress, {
      value:1,
      duration:1,
      delay:1.,
      ease:'circ.inOut'
    })
    .to('.text span', {
      y:'0%',
      duration:0.9,
      stagger:0.05,
      ease:'circ.inOut'
    },'-=0.4')
  }

  setting() {

    this.webgl.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      2 * Math.atan((this.height / 2) / 100) * 180 / Math.PI,
      this.width / this.height,
      1,
      1000
    )    

    this.camera.position.set(
      0,
      0,
      100
    )
    this.camera.updateProjectionMatrix()

    this._setMesh()

  }

  _setMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(this.width,this.height,100,100)
    this.material = new THREE.ShaderMaterial({
      vertexShader:vert,
      fragmentShader:frag,
      transparent:true,
      uniforms: {
        progress: {
          value:0.0
        },
      }
    })

    this.mesh = new THREE.Mesh(this.geometry,this.material);
    this.scene.add(this.mesh);
  }

  onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.mesh.scale.x = this.width
    this.mesh.scale.y = this.height
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.renderer.setSize( window.innerWidth,window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    this.camera.updateProjectionMatrix()
  }

  onRaf() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.onRaf();
    })
  }
}

window.addEventListener('load', () => {
    const gl = new main(document.querySelector('#canvas'));
    window.addEventListener('resize',() => {
      gl.onResize();
    })
});