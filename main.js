import * as THREE from 'three'
import createCvartal, { constructObjBlocks } from './scripts/createMiniCvartal'

import {
  sizes,
  cameraX,
  cameraY,
  widthFloor,
  lineValueCvartal,
  gapCvartalZ,
} from './scripts/constants'
import { createCameraGoal } from './scripts/helper'
import {
  complexBlock,
  createBasicObjBlocks,
  simpleBlock,
} from './scripts/createHouses'

let countCvartal = 0
let objBlocks = createBasicObjBlocks()
const cursor = {
  x: 0,
  y: 0,
}

////SCENE//////////////////////
////SCENE//////////////////////
////SCENE//////////////////////

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdddddd)
// scene.fog = new THREE.Fog('grey', 0.002, 200)

///////////////////////CAMERA//////////////////////////////////////////
///////////////////////CAMERA//////////////////////////////////////////
///////////////////////CAMERA//////////////////////////////////////////
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 0
camera.position.y = cameraY
camera.position.x = cameraX
scene.add(camera)

const cameraGoal = createCameraGoal(cameraX, 0, -100)
scene.add(cameraGoal)

////////////////////////////////////////////////////////////LIGHT/////////////////////
////////////////////////////////////////////////////////////LIGHT/////////////////////
////////////////////////////////////////////////////////////LIGHT/////////////////////
const ambientLight = new THREE.AmbientLight('white', 0)
const directionLight = new THREE.DirectionalLight('rgb(235, 115, 111)', 50)
directionLight.position.set(1, 1, -1)

const light = new THREE.PointLight('orange', 0, 1000)
light.castShadow = true
light.position.set(cameraX + 100, 100, -200)

// scene.add(ambientLight)
// scene.add(light)
scene.add(directionLight)

/////INIT//////////////////////////////////////
/////INIT//////////////////////////////////////
/////INIT//////////////////////////////////////

initCvartal(2)

///////////////////////////////////////////////////////////////////////////RENDERER/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////RENDERER/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////RENDERER/////////////////////////////////////////

const canvas = document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

renderer.render(scene, camera)

let counter = 0
const delta = 0.5

///////////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const loop = () => {
  counter += delta

  moveCamera(delta)
  moveLight(delta)
  moveBlock(objBlocks)

  ///////////////////////////
  const isTimeToAddCvartal =
    -camera.position.z + 200 >=
    countCvartal * lineValueCvartal + gapCvartalZ * countCvartal

  if (isTimeToAddCvartal) {
    addCvartal(countCvartal)
    countCvartal++
  }
  //////////////////////////
  const time = counter % 5

  if (time === 0) {
    objBlocks = filterObjBlocks(objBlocks, camera)
  }

  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////

function moveCamera(delta) {
  camera.position.z -= delta
  camera.position.x = cameraX - cursor.x * 100
  camera.position.y = cameraY + cursor.y * 90

  cameraGoal.position.z -= delta

  camera.lookAt(cameraGoal.position)
}
function moveLight(delta) {
  light.position.z -= delta
}
function moveBlock(objBlocks) {
  objBlocks.arrMovingBlock.forEach(({ mesh, movingFunction }) => {
    movingFunction(mesh)
  })
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function initCvartal(cvartals) {
  for (let i = 0; i < cvartals; i++) {
    addCvartal(i)
    countCvartal++
  }
}

function addCvartal(orderCvartal) {
  const startCvartalZ =
    orderCvartal * lineValueCvartal + gapCvartalZ * orderCvartal

  const objCityBlock = createCvartal(
    {
      startCvartalZ,
      startCvartalX: Math.floor(Math.random() * 3),
      countCvartalX: 8,
      countCvartalZ: 1,
      widthBigCvartal: widthFloor,
      lineValueBigCvartal: lineValueCvartal,
      gapBetweenCvartalsX: 8,
      gapBetweenCvartalsZ: 5,
    },
    { gapX: 3, gapY: 3, countX: 4, countY: 4, height: 12 }
  )

  objBlocks = constructObjBlocks(objBlocks, objCityBlock)
  objBlocks.arrSimpleBlock.forEach(({ mesh }) => scene.add(mesh))
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = e.clientY / sizes.height - 0.5
})

function filterObjBlocks(objBlocks, camera) {
  const zCamera = camera.position.z
  const xCamera = camera.position.x
  const yCamera = camera.position.y

  objBlocks.arrSimpleBlock = objBlocks.arrSimpleBlock.filter(({ mesh }) => {
    if (mesh.position.z - 50 > zCamera) {
      scene.remove(mesh)
      return false
    }
    return true
  })

  objBlocks.arrComplexBlock = objBlocks.arrComplexBlock.filter((block) => {
    const { mesh, distanceX, distanceZ, distanceY, isAdded } = block

    if (mesh.position.z > zCamera) {
      scene.remove(mesh)
      return false
    }

    if (
      !isAdded &&
      meshInRange(xCamera, mesh.position.x, distanceX) &&
      meshInRange(yCamera, mesh.position.y, distanceY) &&
      mesh.position.z + distanceZ > zCamera
    ) {
      block.isAdded = true
      scene.add(mesh)
    }

    if (
      (isAdded && !meshInRange(xCamera, mesh.position.x, distanceX)) ||
      !meshInRange(yCamera, mesh.position.y, distanceY) ||
      mesh.position.z + distanceZ < zCamera
    ) {
      block.isAdded = false
      scene.remove(mesh)
    }

    return true
  })

  objBlocks.arrMovingBlock = objBlocks.arrMovingBlock.filter((block) => {
    const { mesh, distanceX, distanceZ, distanceY, isAdded } = block

    if (mesh.position.z > zCamera) {
      scene.remove(mesh)
      return false
    }

    if (
      !isAdded &&
      meshInRange(xCamera, mesh.position.x, distanceX) &&
      meshInRange(yCamera, mesh.position.y, distanceY) &&
      mesh.position.z + distanceZ > zCamera
    ) {
      block.isAdded = true
      scene.add(mesh)
    }

    if (
      (isAdded && !meshInRange(xCamera, mesh.position.x, distanceX)) ||
      !meshInRange(yCamera, mesh.position.y, distanceY) ||
      mesh.position.z + distanceZ < zCamera
    ) {
      block.isAdded = false
      scene.remove(mesh)
    }

    return true
  })

  return objBlocks
}

function meshInRange(cameraPos, meshPos, range) {
  const start = cameraPos - range
  const end = cameraPos + range
  if (meshPos > start && meshPos < end) {
    return true
  }

  return false
}
