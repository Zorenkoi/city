import * as THREE from 'three'
import createCircle from './createCircle'
import createCube from './createCube'

export const createLight = ({ height, x, y, z, radius }) => {
  const cube = createCube(
    { width: 0.1, lineValue: 0.1, height },
    { x, z, y },
    'black',
    false
  )
  const circle = createCircle(
    { x: x + 0.05, y: height, z: z + 0.05 },
    radius,
    'gold',
    true
  )

  const pointLight = new THREE.PointLight('gold', 30, 40)
  pointLight.position.set(x, height, -z)

  return [circle, cube, pointLight]
}
