import * as THREE from 'three'
import createCube from './createCube'
import { constructObjBlocks } from './createMiniCvartal'
import { cameraX } from './constants'
const radiusCamera = 100

export const createHouse1 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  const objBlocks = createBasicObjBlocks()
  const mainColor = 'white'
  const countLine = 7
  const xLine = width / countLine
  const zLine = lineValue / countLine

  const mainCube = createCube(
    { width, lineValue, height },
    { x: startX, y: 0, z: startZ },
    'black'
  )
  const center = createCube(
    { width: width - 1, lineValue: lineValue - 1, height: 0.5 },
    { x: startX + 0.5, y: height, z: startZ + 0.5 },
    'gray'
  )

  objBlocks.arrSimpleBlock = [simpleBlock(mainCube), simpleBlock(center)]

  //////////////////////////////////////////////
  if (isInWiew(radiusCamera, cameraX, startX)) {
    for (let i = 0; i < countLine; i++) {
      if (i % 2 !== 0) {
        const line = createCube(
          { width: xLine, lineValue: 1, height: height - 0.5 },
          { x: startX + i * xLine, y: 0, z: startZ - 0.15 },
          mainColor
        )
        objBlocks.arrComplexBlock.push(complexBlock(line, 100, 50, 50))
      }
    }
    for (let i = 0; i < countLine; i++) {
      if (i % 2 !== 0) {
        const line = createCube(
          { width: width + 0.5, lineValue: zLine, height: height - 0.5 },
          { x: startX - 0.15, y: 0, z: startZ + i * zLine },
          mainColor
        )
        objBlocks.arrComplexBlock.push(complexBlock(line, 100, 50, 50))
      }
    }
  }

  return objBlocks
}
export const createHouse2 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  const objBlocks = createBasicObjBlocks()
  const mainCube = createCube(
    { width, lineValue, height },
    { x: startX, y: 0, z: startZ },
    'white'
  )

  const countCard = 20
  const heightCard = height / countCard

  if (isInWiew(radiusCamera, cameraX, startX)) {
    for (let i = 0; i <= countCard; i++) {
      if (i % 2 === 0) {
        const card = createCube(
          { width: width + 1, lineValue: lineValue + 1, height: heightCard },
          { x: startX - 0.5, y: i * heightCard, z: startZ - 0.5 },
          'black'
        )
        objBlocks.arrComplexBlock.push(complexBlock(card, 100, 50, 50))
      }
    }
  }

  objBlocks.arrSimpleBlock.push(simpleBlock(mainCube))
  return objBlocks
}
export const createHouse3 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  let objBlocks = createBasicObjBlocks()

  const workWidth = width < lineValue ? width : lineValue
  const workLineValue = width < lineValue ? width : lineValue
  let totalHeight = 0
  let prewWidth = workWidth
  let prewLineValue = workLineValue
  let prewHeight = 13

  for (let i = 0; i < 4; i++) {
    const mozaicWidth = i === 3 ? prewWidth * 0.6 : prewWidth * 0.75
    const mozaicLineValue = i === 3 ? prewLineValue * 0.6 : prewLineValue * 0.75
    const mozaicHeight = i === 3 ? prewHeight * 0.8 : prewHeight * 0.9
    const mozaicX = (workWidth - mozaicWidth) / 2 + startX
    const mozaicZ = (workLineValue - mozaicLineValue) / 2 + startZ

    const objMozaicBlocks = createMozaic(
      mozaicWidth,
      mozaicLineValue,
      mozaicHeight,
      mozaicX,
      mozaicZ,
      totalHeight
    )
    totalHeight += mozaicHeight
    prewWidth = mozaicWidth
    prewLineValue = mozaicLineValue
    prewHeight = mozaicHeight

    objBlocks = constructObjBlocks(objBlocks, objMozaicBlocks)
  }

  return objBlocks
}
export const createHouse4 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  const objBlocks = createBasicObjBlocks()
  const { PI } = Math
  const mainCube = createCube(
    { width, lineValue, height },
    { x: startX, y: 0, z: startZ },
    'orange'
  )
  const roof = createCube(
    { width: width + 1, lineValue: lineValue + 1, height: 1 },
    { x: startX - 0.5, y: height, z: startZ - 0.5 },
    'black'
  )

  const hlebGeometry = new THREE.TorusGeometry(width / 3, width / 6)
  const hlebMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 })
  const hleb = new THREE.Mesh(hlebGeometry, hlebMaterial)
  hleb.position.set(
    startX + width / 2,
    height + width / 3 + width / 6,
    -startZ - lineValue / 2
  )
  hleb.rotation.set(-PI * 0.15, PI * 0.25, 0)

  const rotateDonut = (donut) => {
    donut.rotation.y += 0.01 * PI
  }

  objBlocks.arrSimpleBlock.push(simpleBlock(mainCube))
  objBlocks.arrSimpleBlock.push(simpleBlock(roof))
  objBlocks.arrMovingBlock.push(movingBlock(hleb, rotateDonut, 100, 100, 100))

  return objBlocks
}

function createMozaic(width, line, height, x, z, y) {
  const objBlocks = createBasicObjBlocks()
  const widthBlock = width / 3
  const lineBlock = line / 3
  const centerCof = 2
  const centerX = widthBlock - (widthBlock * centerCof - widthBlock) / 2 + x
  const centerZ = lineBlock - (lineBlock * centerCof - lineBlock) / 2 + z

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const sum = i + j
      if (sum === 0 || sum === 2 || sum === 4) {
        if (j === 1 && i === 1) {
          const centerblock = createCube(
            {
              width: widthBlock * centerCof,
              lineValue: lineBlock * centerCof,
              height,
            },
            { x: centerX, y, z: centerZ },
            'gray'
          )
          objBlocks.arrSimpleBlock.push(simpleBlock(centerblock))
        } else {
          const block = createCube(
            { width: widthBlock, lineValue: lineBlock, height },
            { x: i * widthBlock + x, y, z: j * lineBlock + z },
            'white'
          )

          objBlocks.arrComplexBlock.push(complexBlock(block, 100, 100, 100))
        }
      }
    }
  }

  return objBlocks
}
function isInWiew(radiusCamera, cameraX, blockX) {
  const start = cameraX - 50
  const end = cameraX + 50

  if (blockX > start && blockX < end) {
    return true
  } else {
    return false
  }
}

export function simpleBlock(mesh) {
  return { mesh, isAdded: false }
}
export function complexBlock(
  mesh,
  distanceZ,
  distanceX = 'none',
  distanceY = 'none'
) {
  return {
    mesh,
    distanceX,
    distanceZ,
    distanceY,
    isAdded: false,
  }
}
export function movingBlock(
  mesh,
  moveFu,
  distanceZ,
  distanceX = 'none',
  distanceY = 'none'
) {
  return {
    mesh,
    movingFunction: moveFu,
    distanceX,
    distanceZ,
    distanceY,
    isAdded: false,
  }
}

export function createBasicObjBlocks() {
  return {
    arrSimpleBlock: [],
    arrComplexBlock: [],
    arrMovingBlock: [],
  }
}
