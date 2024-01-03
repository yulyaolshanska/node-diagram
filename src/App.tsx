import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import NodeGraph from './components/nodeGraph/NodeGraph'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <NodeGraph />
      </div>
    </Provider>
  )
}

export default App
