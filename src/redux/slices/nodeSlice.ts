import { createSlice } from '@reduxjs/toolkit'
import { applyNodeChanges } from 'reactflow'
import { nodeInitialState } from '../../nodes/customNodeConfig'
import { addNodeReducer } from '../reducers/addNodeReducer'
import { IinitialState } from '../../types/interface'
import { removeNodeReducer } from '../reducers/removeNodeReducer'
import { setSelectedValuesReducer } from '../reducers/setSelectedValues'

const initialState: IinitialState = {
  nodes: [nodeInitialState],
  edges: [],
}

export const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: addNodeReducer,
    removeNode: removeNodeReducer,
    setSelectedValues: setSelectedValuesReducer,
    nodeChanged(state, action) {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
  },
})

export const { addNode, nodeChanged, removeNode, setSelectedValues } =
  nodeSlice.actions

export default nodeSlice.reducer
