import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { buildRenderer } from './utils'

function PureLine() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const renderer = buildRenderer(containerRef)
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const points = []
    points.push(
      ...[
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(5, 0, 0),
      ],
    )
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(10, 10, 10)
    camera.lookAt(0, 0, 0)
    const scene = new THREE.Scene()

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render)
    controls.update()

    scene.add(line)
    function render() {
      renderer.render(scene, camera)
    }
    render()

    return () => {
      controls.removeEventListener('change', render)
    }
  }, [])

  return <div ref={containerRef} />
}

export default PureLine
