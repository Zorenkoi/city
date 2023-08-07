import createCube from './createCube'

export const createFloor = ({
  widthCvartal,
  lineValueCvartal,
  startCvartalX,
  startCvartalZ,
  height,
  color,
}) => {
  const floor = createCube(
    {
      width: widthCvartal,
      lineValue: lineValueCvartal,
      height,
    },
    { x: startCvartalX, y: 0, z: startCvartalZ },
    color,
    false
  )
  return floor
}
