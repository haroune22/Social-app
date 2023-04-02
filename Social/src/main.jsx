import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './Context/AuthContext'
import { DarkmodeContextProvider } from './Context/DarkmodeContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <DarkmodeContextProvider>
    <App />
    </DarkmodeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
