import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ReactFlowProvider } from 'reactflow'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store, { persistor } from './redux/store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>,
)

reportWebVitals()
