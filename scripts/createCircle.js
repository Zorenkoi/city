import * as THREE from 'three'

function createCircle({ x, y, z }, radius, color, isCentered = true) {
  const geometry = new THREE.SphereGeometry(radius, 64, 64)
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: false,
  })
  const mesh = new THREE.Mesh(geometry, material)

  if (isCentered) {
    mesh.position.set(x, y, -z)
  } else {
    mesh.position.set(x + radius, y + radius, -z - radius)
  }

  return mesh
}

export default createCircle
