import { PayloadAction } from '@reduxjs/toolkit'
import { Position } from 'reactflow'
import { modifyOptions } from '../../helpers/modifyOptions'
import { INodes } from '../../types/interface'

export const addNodeReducer = (
  state: { nodes: INodes[]; edges: any[] },
  action: PayloadAction<{ str: string[]; id: string }>,
) => {
  const { str, id } = action.payload
  const nodeIds = str.map((el) => el.split(' ')[1])
  const edgeIds = nodeIds.map((id) => `${state.nodes.length}-${id}`)
  const currentNode = state.nodes.find((node) => node.id === id)

  const nodeSpacing = 250

  const newNode = nodeIds.map((id, index) => ({
    id,
    type: 'customNode',
    position: {
      x: currentNode ? currentNode.position.x + (index + 1) * nodeSpacing : 0,
      y: currentNode ? currentNode.position.y + 190 : 0,
    },
    targetPosition: Position.Top,
    data: {
      options: modifyOptions(str[index].split(' ')[1]),
      placeholder: 'Вибрати значення',
      selectedValues: [],
    },
  }))

  const newEdge = edgeIds.map((id, index) => ({
    id,
    source: id,
    target: `${nodeIds[index]}`,
  }))

  return {
    nodes: [...state.nodes, ...newNode],
    edges: [...state.edges, ...newEdge],
  }
}
