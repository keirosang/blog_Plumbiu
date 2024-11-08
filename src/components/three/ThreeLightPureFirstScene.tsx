import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const White = 0xffffff

function LightPureFirstScence() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    const size = container.clientWidth
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    // 设置渲染器渲染阴影
    renderer.shadowMap.enabled = true

    renderer.pixelRatio = window.devicePixelRatio
    renderer.setSize(size, size)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const geometry = new THREE.BoxGeometry(4, 4, 4)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    material.emissive = new THREE.Color(0x48211a)
    const cube = new THREE.Mesh(geometry, material)
    // 表示 cube 可以投射阴影
    cube.castShadow = true
    // 平面几何
    const planeGeometry = new THREE.PlaneGeometry(20, 20)
    const planeMaterial = new THREE.MeshStandardMaterial({ color: White })
    // 材质的放射光颜色，不受其他光照影响的固有颜色，默认为黑色
    planeMaterial.emissive = new THREE.Color(0x444444)
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    planeMesh.rotation.x = -0.5 * Math.PI
    planeMesh.position.set(0, -6, 0)
    // 接受投射的阴影
    planeMesh.receiveShadow = true
    // 方向光
    const directionalLight = new THREE.DirectionalLight(White, 0.5)
    // 设置方向（根据源点设置）
    directionalLight.position.set(15, 15, 15)
    // 表示该方向会投射阴影效果
    directionalLight.castShadow = true

    scene.add(directionalLight)
    scene.add(planeMesh)
    scene.add(cube)

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    const axis = new THREE.AxesHelper(5)
    scene.add(axis)
    const camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000)
    camera.position.set(15, 15, 15)
    camera.lookAt(0, 0, 0)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    const cancleFaf = animate()

    return cancleFaf
  }, [])

  return <div ref={containerRef}></div>
}

export default LightPureFirstScence