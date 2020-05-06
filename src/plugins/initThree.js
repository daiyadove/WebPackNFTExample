import initARJS from './initAR'

const addFlamingoObject = (scene, onRenderFcts) => {
  const root = new THREE.Object3D()
  scene.add(root)
  /**
   * add an object in the scene
   */
  const threeGLTFLoader = new THREE.GLTFLoader()

  threeGLTFLoader.load('resources/Flamingo.glb', (gltf) => {
    const model = gltf.scene.children[0]
    model.name = 'Flamingo'

    const animation = gltf.animations[0]
    const mixer = new THREE.AnimationMixer(model)
    onRenderFcts.push(mixer)
    const action = mixer.clipAction(animation)
    action.play()

    root.matrixAutoUpdate = false
    root.add(model)

    model.position.z = -200
    model.position.x = 100
    model.position.y = 100
  })
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
  addFlamingoObject(smoothedRoot, onRenderFcts)
  onRenderFcts.push(() => renderer.render(scene, camera))

  const animate = () => {
    // keep looping
    requestAnimationFrame(animate)
    onRenderFcts.forEach(onRenderFct => onRenderFct(clock.getDelta()))
  }
  requestAnimationFrame(animate)
}

export default init
