import * as React from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './style.scss'

import App from './app'
import { UserStoreProvider, VideoContextProvider } from './stores'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStoreProvider>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </UserStoreProvider>
  </React.StrictMode>
)
