import * as THREE from 'three'
import createCvartal from './scripts/createMiniCvartal'

import {
  sizes,
  cameraX,
  widthFloor,
  lineValueCvartal,
  gapCvartalZ,
} from './scripts/constants'
import { createCameraGoal } from './scripts/helper'
import { createFloor } from './scripts/createFloor'

let countCvartal = 0
let allCubes = []
const cameraStandart = {
  y: 40,
  x: cameraX,
}
const cursor = {
  x: 0,
  y: 0,
}

////SCENE///////////////////////////////////////
////SCENE///////////////////////////////////////
////SCENE///////////////////////////////////////

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdddddd)
scene.fog = new THREE.Fog('grey', 0.002, 200)

////////////////////////////////////////////////////////////CAMERA//////////////////////////////////////////
////////////////////////////////////////////////////////////CAMERA//////////////////////////////////////////
////////////////////////////////////////////////////////////CAMERA//////////////////////////////////////////
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 0
camera.position.y = 40
camera.position.x = cameraX
scene.add(camera)

const cameraGoal = createCameraGoal(cameraX, 0, -100)
scene.add(cameraGoal)

///////////////////////////////LIGHT/////////////////////
///////////////////////////////LIGHT/////////////////////
///////////////////////////////LIGHT/////////////////////
const ambientLight = new THREE.AmbientLight('white', 0.2)

const light = new THREE.PointLight('orange', 500000, 1000)
light.castShadow = true
light.position.set(cameraX + 100, 100, -200)

scene.add(ambientLight)
scene.add(light)

//////////////////////////////////////////////////GEOMETRY//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////GEOMETRY//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////GEOMETRY//////////////////////////////////////

initCvartal(2)

/////////////////////////////////RENDERER/////////////////////////////////////////
/////////////////////////////////RENDERER/////////////////////////////////////////
/////////////////////////////////RENDERER/////////////////////////////////////////

const canvas = document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

renderer.render(scene, camera)

const clock = new THREE.Clock()
const loop = () => {
  const elepsedTime = clock.getElapsedTime
  const delta = 0.5

  camera.position.z -= delta
  camera.position.x = cameraStandart.x - cursor.x * 200
  camera.position.y = cameraStandart.y + cursor.y * 90
  light.position.z -= delta
  cameraGoal.position.z -= delta

  camera.lookAt(cameraGoal.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)

  if (
    -camera.position.z + 200 >=
    countCvartal * lineValueCvartal + gapCvartalZ * countCvartal
  ) {
    allCubes.forEach((cube) => {
      if (camera.position.z < cube.position.z) {
        scene.remove(cube)
      }
    })
    addCvartal(countCvartal)
    countCvartal++
  }
}
loop()

//////////////////////////////////////////////////////

// document.addEventListener('keydown', function (event) {
//   switch (event.key) {
//     case 'ArrowLeft':
//       camera.position.x -= 1
//       break
//     case 'ArrowRight':
//       camera.position.x += 1
//       break
//     case 'ArrowUp':
//       camera.position.y += 1
//       break
//     case 'ArrowDown':
//       camera.position.y -= 1
//       break

//     default:
//       break
//   }
// })

function initCvartal(cvartals) {
  for (let i = 0; i < cvartals; i++) {
    addCvartal(i)
    countCvartal++
  }
}

function addCvartal(orderCvartal) {
  const startCvartalZ =
    orderCvartal * lineValueCvartal + gapCvartalZ * orderCvartal

  const cityBlocks = createCvartal(
    {
      startCvartalZ,
      startCvartalX: Math.floor(Math.random() * 3),
      countCvartalX: 2,
      countCvartalZ: 1,
      widthBigCvartal: widthFloor,
      lineValueBigCvartal: lineValueCvartal,
      gapBetweenCvartalsX: 8,
      gapBetweenCvartalsZ: 5,
    },
    { gapX: 3, gapY: 3, countX: 4, countY: 4, height: 12 }
  )

  allCubes = [...allCubes, ...cityBlocks]
  scene.add(...cityBlocks)
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
