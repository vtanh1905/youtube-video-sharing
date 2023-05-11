import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Layout } from './components'
import { HomePage, RegistryPage, ShareVideoPage } from './pages';

const routes = [
  {
    path: '/',
    component: (props?: any) => <HomePage {...props} />
  },
  {
    path: '/registry',
    component: (props?: any) => <RegistryPage {...props} />
  },
  {
    path: '/share-video',
    component: (props?: any) => <ShareVideoPage {...props} />
  }
]

const App = () => {
  return (
    <Router>
      <Layout>
        <div>
          <Routes>
            {routes.map((route, i) => (
              <Route path={route.path} key={i} element={route.component()} />
            ))}
          </Routes>
        </div>
      </Layout>
    </Router>
  )
}

export default App
