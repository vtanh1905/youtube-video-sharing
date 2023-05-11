import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'
import HomePage from './Home'
import RegistryPage from './Registry'
import ShareVideoPage from './ShareVideo'

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

const Index = () => {
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

export default Index
