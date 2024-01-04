import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import NodeSelect from '../nodeSelect/NodeSelect'
import styles from './NodeGraph.module.scss'

const NodeGraph: React.FC<NodeProps> = ({ id, data, isConnectable }) => {
  return (
    <div
      className={`${styles.customNode} ${data.selected ? 'selected' : ''}`}
      id={id}
    >
      {id !== '0' && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={{ visibility: 'hidden' }}
        />
      )}
      <div className={styles.nodeHeader}>{data.label}</div>
      <div className={styles.nodeContent}>
        <textarea className={styles.nodeTextarea} />
        <NodeSelect
          options={data.options}
          selectedValues={data.selectedValues}
          placeholder={data.placeholder}
          id={id}
        />
      </div>
      <Handle
        type="source"
        position={id === '0' ? Position.Bottom : Position.Right}
        style={
          id !== '0'
            ? { top: 115, background: '#ADB5BD' }
            : { top: 'none', background: '#ADB5BD' }
        }
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default NodeGraph
