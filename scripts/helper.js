import * as THREE from 'three'
import createCircle from './createCircle'

export function createCameraGoal(x, y, z) {
  const geometry = new THREE.BoxGeometry(0, 0, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 'white',
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)

  return mesh
}

export function createSunMoon(zDistance) {
  const sun = createCircle({ x: -6, y: 0, z: zDistance }, 1, 'yellow', true)
  const sunLight = new THREE.PointLight('orange', 50000, 1000)
  sunLight.position.z = -zDistance

  const moon = createCircle({ x: 6, y: 0, z: zDistance }, 1, 'blue', true)
  const moonLight = new THREE.PointLight('white', 2500, 1000)
  moonLight.position.z = -zDistance

  return { sun, sunLight, moon, moonLight }
}

export function moveSunMoon(
  { sun, sunLight, moon, moonLight },
  delta,
  cof,
  countSun,
  countMoon,
  cameraPosition
) {
  sun.position.x = Math.cos(countSun) * cof + cameraPosition.x
  sun.position.y = Math.sin(countSun) * cof
  sunLight.position.x = Math.cos(countSun) * cof + cameraPosition.x
  sunLight.position.y = Math.sin(countSun) * cof

  moon.position.x = Math.cos(countMoon) * cof + cameraPosition.x
  moon.position.y = Math.sin(countMoon) * cof
  moonLight.position.x = Math.cos(countMoon) * cof + cameraPosition.x
  moonLight.position.y = Math.sin(countMoon) * cof

  sun.position.z -= delta
  sunLight.position.z -= delta
  moon.position.z -= delta
  moonLight.position.z -= delta
}
