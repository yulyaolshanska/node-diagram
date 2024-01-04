import { PayloadAction } from '@reduxjs/toolkit'
import { Position } from 'reactflow'
import { modifyOptions } from '../../helpers/modifyOptions'
import { INodes } from '../../types/interface'

export const addNodeReducer = (
  state: { nodes: INodes[]; edges: any[] },
  actions: PayloadAction<{ str: string[]; id: string }>,
) => {
  const nodeIds = actions.payload.str.map((el) => el.split(' ')[1])
  const edgeIds = nodeIds.map((id) => `${state.nodes.length}-${id}`)
  const currentNode = state.nodes.find((node) => node.id === actions.payload.id)

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
      options: modifyOptions(actions.payload.str[index].split(' ')[1]),
      placeholder: 'Вибрати значення',
      selectedValues: [],
    },
  }))

  const newEdge = edgeIds.map((id, index) => ({
    id,
    source: actions.payload.id,
    target: `${nodeIds[index]}`,
  }))

  state.nodes = [...state.nodes, ...newNode]
  state.edges = [...state.edges, ...newEdge]
}
