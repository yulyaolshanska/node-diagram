import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ReactFlow, { OnNodesChange } from 'reactflow'
import { RootState, useAppDispatch } from './redux/store'
import NodeGraph from './components/nodeGraph/NodeGraph'
import 'reactflow/dist/style.css'
import { nodeChanged } from './redux/slices/nodeSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { nodes, edges } = useSelector((state: RootState) => state.nodes)

  const nodeTypes = useMemo(() => ({ customNode: NodeGraph }), [])

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => dispatch(nodeChanged(changes)),
    [dispatch],
  )

  return (
    <div className="app" style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
      />
    </div>
  )
}

export default App
