import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ReactFlow from 'reactflow'
import { RootState } from './redux/store'
import NodeGraph from './components/nodeGraph/NodeGraph'
import 'reactflow/dist/style.css'

const App: React.FC = () => {
  const { nodes, edges } = useSelector((state: RootState) => state.nodes)

  const nodeTypes = useMemo(() => ({ customNode: NodeGraph }), [])

  return (
    <div className="app" style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} />
    </div>
  )
}

export default App
