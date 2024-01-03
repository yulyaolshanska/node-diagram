import { PayloadAction } from '@reduxjs/toolkit'
import { INodes } from '../../types/interface'

export const removeNodeReducer = (
  state: { nodes: INodes[]; edges: any[] },
  action: PayloadAction<string>,
) => {
  const nodeId = action.payload
  const removedNode = state.nodes.find((node) => node.id === nodeId)

  if (removedNode) {
    const nodeIdsToRemove: string[] = []
    const edgeIdsToRemove: string[] = []

    const traverseBranch = (nodeId: string) => {
      const nodeIndex = state.nodes.findIndex((node) => node.id === nodeId)

      if (nodeIndex !== -1) {
        nodeIdsToRemove.push(state.nodes[nodeIndex].id)

        const connectedEdges = state.edges.filter(
          (edge) => edge.source === nodeId,
        )

        connectedEdges.forEach((edge) => {
          const edgeIndex = state.edges.findIndex(
            (e) => e.source === edge.source && e.target === edge.target,
          )
          if (edgeIndex !== -1) {
            edgeIdsToRemove.push(state.edges[edgeIndex].id)
            traverseBranch(edge.target)
          }
        })
      }
    }

    traverseBranch(nodeId)

    state.nodes = state.nodes.filter(
      (node) => !nodeIdsToRemove.includes(node.id),
    )
    state.edges = state.edges.filter(
      (edge) => !edgeIdsToRemove.includes(edge.id),
    )
  }
}
