import initARJS from './initAR'

const addDefaultObject = (scene, onRenderFcts) => {
  // add a torus knot
  const cubeGeometry = new THREE.CubeGeometry(100, 100, 100)
  const cubeMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  })
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.position.y = cubeGeometry.parameters.height / 2
  scene.add(cubeMesh)
}

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: 'mediump',
  })

  const clock = new THREE.Clock()

  const onRenderFcts = []

  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.setClearColor(new THREE.Color('lightgrey'), 0)
  renderer.setSize(640, 480)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0px'
  renderer.domElement.style.left = '0px'
  document.body.appendChild(renderer.domElement)

  // init scene and camera
  const scene = new THREE.Scene()

  // Create a camera
  const camera = new THREE.Camera()
  scene.add(camera)

  // Create a light
  const light = new THREE.AmbientLight(0xffffff)
  scene.add(light)

  const smoothedRoot = initARJS(scene, camera, onRenderFcts, renderer)
  addDefaultObject(smoothedRoot, onRenderFcts)
  onRenderFcts.push(() => renderer.render(scene, camera))

  const animate = () => {
    // keep looping
    requestAnimationFrame(animate)
    onRenderFcts.forEach(onRenderFct => onRenderFct(clock.getDelta()))
  }
  requestAnimationFrame(animate)
}

export default init
