import initARJS from './initAR'


// const addFlamingoObject = async (scene, onRenderFcts) => {
//   const root = new THREE.Object3D()
//   scene.add(root)
//   /**
//    * add an object in the scene
//    */
//   const threeGLTFLoader = new THREE.GLTFLoader()
//   const mixers = []
//   await threeGLTFLoader.load('resources/Flamingo.glb', (gltf) => {
//     const model = gltf.scene.children[0]
//     model.name = 'Flamingo'

//     const animation = gltf.animations[0]
//     const mixer = new THREE.AnimationMixer(model)
//     mixers.push(mixer)
//     onRenderFcts.push((delta) => {
//       if (mixers.length > 0) {
//         // eslint-disable-next-line no-plusplus
//         for (let i = 0; i < mixers.length; i++) {
//           mixers[i].update(delta)
//         }
//       }
//     })
//     const action = mixer.clipAction(animation)
//     action.play()

//     root.matrixAutoUpdate = false
//     root.add(model)

//     model.position.z = -200
//     model.position.x = 100
//     model.position.y = 100
//   })
// }

const init = async () => {
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

  const root = new THREE.Object3D()
  scene.add(root)
  /**
   * add an object in the scene
   */
  const threeGLTFLoader = new THREE.GLTFLoader()
  const mixers = []
  threeGLTFLoader.load('resources/Flamingo.glb', (gltf) => {
    const model = gltf.scene.children[0]
    model.name = 'Flamingo'

    const animation = gltf.animations[0]
    const mixer = new THREE.AnimationMixer(model)
    mixers.push(mixer)
    const action = mixer.clipAction(animation)
    action.play()

    root.matrixAutoUpdate = false
    root.add(model)

    model.position.z = -200
    model.position.x = 100
    model.position.y = 100
    const animate = () => {
      requestAnimationFrame(animate)
      onRenderFcts.forEach(onRenderFct => onRenderFct(clock.getDelta()))
      if (mixers.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < mixers.length; i++) {
          mixers[i].update(clock.getDelta())
        }
      }
      renderer.render(scene, camera)
    }
    requestAnimationFrame(animate)
  })
}

export default init
