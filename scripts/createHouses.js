import * as THREE from 'three'
import createCube from './createCube'

export const createHouse1 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
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

  const arrBlocksHouse = [mainCube, center]

  //////////////////////////////////////////////

  for (let i = 0; i < countLine; i++) {
    if (i % 2 !== 0) {
      const line = createCube(
        { width: xLine, lineValue: 1, height: height - 0.5 },
        { x: startX + i * xLine, y: 0, z: startZ - 0.15 },
        mainColor
      )
      arrBlocksHouse.push(line)
    }
  }
  for (let i = 0; i < countLine; i++) {
    if (i % 2 !== 0) {
      const line = createCube(
        { width: width + 0.5, lineValue: zLine, height: height - 0.5 },
        { x: startX - 0.15, y: 0, z: startZ + i * zLine },
        mainColor
      )
      arrBlocksHouse.push(line)
    }
  }

  arrBlocksHouse.push(center)

  return arrBlocksHouse
}
export const createHouse2 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  const mainCube = createCube(
    { width, lineValue, height },
    { x: startX, y: 0, z: startZ },
    'white'
  )

  const houseBlocks = [mainCube]

  const countCard = 20
  const heightCard = height / countCard

  for (let i = 0; i <= countCard; i++) {
    if (i % 2 === 0) {
      const card = createCube(
        { width: width + 1, lineValue: lineValue + 1, height: heightCard },
        { x: startX - 0.5, y: i * heightCard, z: startZ - 0.5 },
        'black'
      )
      houseBlocks.push(card)
    }
  }

  ///////////////////////////////////////////////
  // const center = createCube(
  //   { width: width - 1, lineValue: lineValue - 1, height: 0.5 },
  //   { x: startX + 0.5, y: height, z: startZ + 0.5 },
  //   'green'
  // )

  return houseBlocks
}
export const createHouse3 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
  const workWidth = width < lineValue ? width : lineValue
  const workLineValue = width < lineValue ? width : lineValue
  let rez = []
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

    const mozaic = createMozaic(
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

    rez = [...rez, ...mozaic]
  }

  return rez
}
export const createHouse4 = (
  { width, lineValue, height },
  { startX, startZ }
) => {
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

  const hlebGeometry = new THREE.TorusGeometry(width / 2.5, width / 5)
  const hlebMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 })
  const hleb = new THREE.Mesh(hlebGeometry, hlebMaterial)
  hleb.position.set(
    startX + width / 2,
    height + width / 2.5 + width / 5,
    -startZ - lineValue / 2
  )
  hleb.rotation.set(-PI * 0.15, PI * 0.25, 0)

  const widthPalka = 0.5
  const palka1 = createCube(
    { width: widthPalka, lineValue: widthPalka, height: 4 },
    { x: startX + width / 6, y: height, z: startZ + lineValue / 6 },
    'orange'
  )
  const palka2 = createCube(
    { width: widthPalka, lineValue: widthPalka, height: 4 },
    {
      x: startX + (width / 6) * 5 - widthPalka / 2,
      y: height,
      z: startZ + (lineValue / 6) * 5 - widthPalka / 2,
    },
    'orange'
  )
  return [mainCube, roof, hleb, palka1, palka2]
}

function createMozaic(width, line, height, x, z, y) {
  const arr = []
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
          arr.push(centerblock)
        } else {
          const block = createCube(
            { width: widthBlock, lineValue: lineBlock, height },
            { x: i * widthBlock + x, y, z: j * lineBlock + z },
            'white'
          )

          arr.push(block)
        }
      }
    }
  }

  return arr
}
