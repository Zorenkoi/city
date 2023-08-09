import { createFloor } from './createFloor'
import {
  movingBlock,
  complexBlock,
  createHouse1,
  createHouse2,
  createHouse3,
  createHouse4,
  simpleBlock,
} from './createHouses'
import { widthFloor, lineValueCvartal, gapCvartalZ } from './constants'
import { createLight } from './createLight'
import { createBasicObjBlocks } from './createHouses'
import { Group } from './createCube'
import createCube from './createCube'

function createMiniCvartal({
  startMiniCvartalX,
  startMiniCvartalZ,
  widthMiniCvartal,
  lineValueMiniCvartal,
  heightHouse,
  countHouseX,
  countHouseY,
  gapBetweenHouseX,
  gapBetweenHouseY,
}) {
  let objBlocks = createBasicObjBlocks()

  const widthHouse =
    (widthMiniCvartal + gapBetweenHouseX) / countHouseX - gapBetweenHouseX
  const lineValueHouse =
    (lineValueMiniCvartal + gapBetweenHouseY) / countHouseY - gapBetweenHouseY

  for (let i = 0; i < countHouseX; i++) {
    for (let j = 0; j < countHouseY; j++) {
      const x = widthHouse * i + gapBetweenHouseX * i + startMiniCvartalX
      const z = lineValueHouse * j + gapBetweenHouseY * j + startMiniCvartalZ
      const randomHeight = Math.floor(Math.random() * 20) + 9

      const arrObjHouseBlocks = getArrHouseBlocks(
        {
          width: widthHouse,
          lineValue: lineValueHouse,
          height: randomHeight,
        },
        { startX: x, startZ: z }
      )

      objBlocks = constructObjBlocks(objBlocks, arrObjHouseBlocks)
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  const floor = createFloor({
    startCvartalX: startMiniCvartalX - 2,
    startCvartalZ: startMiniCvartalZ - 2,
    widthCvartal: widthMiniCvartal + 4,
    lineValueCvartal: lineValueMiniCvartal + 4,
    height: 0.6,
    color: 'gray',
  })
  objBlocks.arrSimpleBlock.push(simpleBlock(floor))
  /////////////////////////////////////////////////////////////////////////////
  const objLightning = createLightning({
    startMiniCvartalX,
    startMiniCvartalZ,
    lineValueMiniCvartal,
    widthMiniCvartal,
    heightLight: 5,
    radiusCircle: 0.4,
  })
  objBlocks = constructObjBlocks(objBlocks, objLightning)
  ///////////////////////////////////////////////////////////////////////////////
  const objCar = createCar(
    { width: 1.5, lineValue: 4, height: 1 },
    {
      startX: startMiniCvartalX - 5,
      startZ: startMiniCvartalZ,
      startY: 0.8,
    }
  )
  objBlocks = constructObjBlocks(objBlocks, objCar)

  return objBlocks
}

///////////////////////////////////////

function createCvartal(
  {
    startCvartalZ,
    startCvartalX,
    countCvartalX,
    countCvartalZ,
    widthBigCvartal,
    lineValueBigCvartal,
    gapBetweenCvartalsX,
    gapBetweenCvartalsZ,
  },
  { gapX, gapY, countX, countY, height }
) {
  let objBlocks = createBasicObjBlocks()

  const widthMiniCvartal =
    (widthBigCvartal + gapBetweenCvartalsX) / countCvartalX -
    gapBetweenCvartalsX

  const lineValueMiniCvartal =
    (lineValueBigCvartal + gapBetweenCvartalsZ) / countCvartalZ -
    gapBetweenCvartalsZ

  for (let i = 0; i < countCvartalX; i++) {
    for (let j = 0; j < countCvartalZ; j++) {
      const startMiniCvartalX = widthMiniCvartal * i + gapBetweenCvartalsX * i
      const startMiniCvartalZ =
        lineValueMiniCvartal * j + gapBetweenCvartalsZ * j + startCvartalZ

      const objCvartalBlocks = createMiniCvartal({
        startMiniCvartalX,
        startMiniCvartalZ,
        widthMiniCvartal,
        lineValueMiniCvartal,
        heightHouse: height,
        countHouseX: countX,
        countHouseY: countY,
        gapBetweenHouseX: gapX,
        gapBetweenHouseY: gapY,
      })

      objBlocks = constructObjBlocks(objBlocks, objCvartalBlocks)
    }
  }

  const floor = createFloor({
    startCvartalX: 0,
    startCvartalZ,
    widthCvartal: widthFloor,
    lineValueCvartal: lineValueCvartal + gapCvartalZ,
    height: 0.1,
    color: 'black',
  })

  objBlocks.arrSimpleBlock.push(simpleBlock(floor))

  return objBlocks
}

function getArrHouseBlocks(...houseValue) {
  if (Math.random() < 0.02) {
    return createHouse3(...houseValue)
  } else if (Math.random() < 0.4) {
    return createHouse2(...houseValue)
  } else if (Math.random() < 0.02) {
    return createHouse4(...houseValue)
  } else {
    return createHouse1(...houseValue)
  }
}
function createLightning({
  startMiniCvartalX,
  startMiniCvartalZ,
  lineValueMiniCvartal,
  widthMiniCvartal,
  heightLight,
  radiusCircle,
}) {
  let objBlocks = createBasicObjBlocks()

  const lightning1 = createLight({
    height: heightLight,
    x: startMiniCvartalX - 1.7,
    y: 0,
    z: startMiniCvartalZ - 1.7,
    radius: radiusCircle,
  })
  const lightning2 = createLight({
    height: heightLight,
    x: startMiniCvartalX + widthMiniCvartal + 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal / 2,
    radius: radiusCircle,
  })
  const lightning3 = createLight({
    height: heightLight,
    x: startMiniCvartalX - 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal / 2,
    radius: radiusCircle,
  })
  const lightning4 = createLight({
    height: heightLight,
    x: startMiniCvartalX + widthMiniCvartal + 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal + 1.7,
    radius: radiusCircle,
  })

  objBlocks = constructObjBlocks(objBlocks, lightning1)
  objBlocks = constructObjBlocks(objBlocks, lightning2)
  objBlocks = constructObjBlocks(objBlocks, lightning3)
  objBlocks = constructObjBlocks(objBlocks, lightning4)

  return objBlocks
}
function createCar({ width, lineValue, height }, { startX, startZ, startY }) {
  const objBlocks = createBasicObjBlocks()

  const mainCube = createCube(
    { width, lineValue, height },
    { x: startX, y: startY, z: startZ },
    'orange',
    false
  )
  const roof = createCube(
    { width: width * 0.8, lineValue: lineValue * 0.5, height: height * 0.6 },
    {
      x: startX + (width * 0.2) / 2,
      y: startY + height,
      z: startZ + (lineValue * 0.6) / 2,
    },
    'orange',
    false
  )

  const moveCar = (mesh) => {
    mesh.position.z += 0.4
  }

  objBlocks.arrMovingBlock.push(movingBlock(mainCube, moveCar, 200, 200, 200))
  objBlocks.arrMovingBlock.push(movingBlock(roof, moveCar, 200, 200, 200))

  return objBlocks
}
export function constructObjBlocks(parentObj, childObject) {
  parentObj.arrSimpleBlock = [
    ...parentObj.arrSimpleBlock,
    ...childObject.arrSimpleBlock,
  ]
  parentObj.arrComplexBlock = [
    ...parentObj.arrComplexBlock,
    ...childObject.arrComplexBlock,
  ]
  parentObj.arrMovingBlock = [
    ...parentObj.arrMovingBlock,
    ...childObject.arrMovingBlock,
  ]

  return parentObj
}

export default createCvartal
