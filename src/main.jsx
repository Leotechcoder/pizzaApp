import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { Provider } from 'react-redux'
import { store } from './shared/infrastructure/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <SocketProvider>
      <App />
    
    </SocketProvider>
    </Provider>
  </StrictMode>,
)
