import { IinitialState } from '../../types/interface'

export const setSelectedValuesReducer = (
  state: IinitialState,
  action: { payload: { id: string; updatedSelectedValues: string[] } },
) => {
  const currentNode = state.nodes.find((node) => node.id === action.payload.id)
  if (currentNode) {
    currentNode.data.selectedValues = action.payload.updatedSelectedValues

    const restNodes = state.nodes.filter(
      (node) => node.id !== action.payload.id,
    )

    state.nodes = [...restNodes, currentNode]
  }
}
