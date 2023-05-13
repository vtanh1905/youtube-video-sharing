import React from 'react'
import { HomePage, RegistryPage, ShareVideoPage, NotFound } from './pages'

export default [
  {
    path: '/',
    component: <HomePage />
  },
  {
    path: '/registry',
    component: <RegistryPage />,
    authenticate: {
      mustLogin: false
    }
  },
  {
    path: '/share-video',
    component: <ShareVideoPage />,
    authenticate: {
      mustLogin: true
    }
  },
  {
    path: '*',
    component: <NotFound />
  }
]
