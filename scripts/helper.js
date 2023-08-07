import * as THREE from 'three'

export function createCameraGoal(x, y, z) {
  const geometry = new THREE.BoxGeometry(0, 0, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 'white',
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)

  return mesh
}

function addNewCwartal(startCvartalX) {}
