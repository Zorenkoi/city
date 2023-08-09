import * as THREE from 'three'
import createCircle from './createCircle'
import createCube from './createCube'
import { createBasicObjBlocks } from './createHouses'
import { complexBlock } from './createHouses'

export const createLight = ({ height, x, y, z, radius }) => {
  const objBlocks = createBasicObjBlocks()

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

  const pointLight = new THREE.PointLight('gold', 50, 40)
  pointLight.position.set(x, height, -z)

  objBlocks.arrComplexBlock.push(complexBlock(cube, 50, 50, 50))
  objBlocks.arrComplexBlock.push(complexBlock(circle, 100, 50, 50))
  // objBlocks.arrComplexBlock.push(complexBlock(pointLight, 80, 80, 80))

  return objBlocks
}
