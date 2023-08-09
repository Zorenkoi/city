import * as THREE from 'three'

function createCube(
  { width, lineValue, height },
  { x, y, z },
  color = 'black',
  wireframe = false
) {
  const geometry = new THREE.BoxGeometry(width, height, lineValue)
  const material = new THREE.MeshStandardMaterial({
    color,
    wireframe,
  })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(x + width / 2, y + height / 2, -z - lineValue / 2)
  mesh.receiveShadow = true
  mesh.castShadow = true

  return mesh
}

export const { Group } = THREE

export default createCube
