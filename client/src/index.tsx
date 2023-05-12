import * as React from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './style.scss';

import App from './app'
import { UserStoreProvider } from './stores'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStoreProvider>
      <App />
    </UserStoreProvider>
  </React.StrictMode>
)
