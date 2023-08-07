import { createFloor } from './createFloor'
import {
  createHouse1,
  createHouse2,
  createHouse3,
  createHouse4,
} from './createHouses'
import { widthFloor, lineValueCvartal, gapCvartalZ } from './constants'
import { createLight } from './createLight'

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
  const arrCvartalBlocks = []

  const widthHouse =
    (widthMiniCvartal + gapBetweenHouseX) / countHouseX - gapBetweenHouseX
  const lineValueHouse =
    (lineValueMiniCvartal + gapBetweenHouseY) / countHouseY - gapBetweenHouseY

  for (let i = 0; i < countHouseX; i++) {
    for (let j = 0; j < countHouseY; j++) {
      const x = widthHouse * i + gapBetweenHouseX * i + startMiniCvartalX
      const z = lineValueHouse * j + gapBetweenHouseY * j + startMiniCvartalZ
      const randomHeight = Math.floor(Math.random() * 20) + 9

      const arrHouseBlocks = getArrHouseBlocks(
        {
          width: widthHouse,
          lineValue: lineValueHouse,
          height: randomHeight,
        },
        { startX: x, startZ: z }
      )

      arrHouseBlocks.forEach((block) => arrCvartalBlocks.push(block))
    }
  }

  /////////////////////////////////////////////////////////////
  const floor = createFloor({
    startCvartalX: startMiniCvartalX - 2,
    startCvartalZ: startMiniCvartalZ - 2,
    widthCvartal: widthMiniCvartal + 4,
    lineValueCvartal: lineValueMiniCvartal + 4,
    height: 0.6,
    color: 'gray',
  })
  /////////////////////////////////////////////////////////////
  const lightning1 = createLight({
    height: 5,
    x: startMiniCvartalX - 1.7,
    y: 0,
    z: startMiniCvartalZ - 1.7,
    radius: 0.4,
  })
  const lightning2 = createLight({
    height: 5,
    x: startMiniCvartalX + widthMiniCvartal + 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal / 2,
    radius: 0.4,
  })
  ///////
  const lightning3 = createLight({
    height: 5,
    x: startMiniCvartalX - 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal / 2,
    radius: 0.4,
  })
  const lightning4 = createLight({
    height: 5,
    x: startMiniCvartalX + widthMiniCvartal + 1.7,
    y: 0,
    z: startMiniCvartalZ + lineValueMiniCvartal + 1.7,
    radius: 0.4,
  })
  const lightning = [...lightning1, ...lightning2, ...lightning3, ...lightning4]

  return [...arrCvartalBlocks, floor, ...lightning]
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
  let arrAllBlocksFromCvartals = []

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

      const arrCvartalBlocks = createMiniCvartal({
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

      arrAllBlocksFromCvartals = [
        ...arrAllBlocksFromCvartals,
        ...arrCvartalBlocks,
      ]
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

  return [...arrAllBlocksFromCvartals, floor]
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

export default createCvartal
