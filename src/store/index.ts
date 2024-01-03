import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ReactFlowNode } from '../types/ReactFlowNode'

interface AppState {
  elements: ReactFlowNode[]
  selectedNodeValue: string
}

const initialState: AppState = {
  elements: JSON.parse(localStorage.getItem('nodePositions') || '[]'),
  selectedNodeValue: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<ReactFlowNode[]>) => {
      state.elements = action.payload
    },
    setSelectedNodeValue: (state, action: PayloadAction<string>) => {
      state.selectedNodeValue = action.payload
    },
  },
})

export const { setElements, setSelectedNodeValue } = appSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useStoreSelector = (state: RootState) => state.app
export const useAppDispatch = () => useDispatch<AppDispatch>()

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})

export default store
