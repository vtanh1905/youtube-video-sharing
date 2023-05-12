import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { FormInstance, notification } from 'antd'

import { Layout, Authenticate } from './components'
import { HomePage, RegistryPage, ShareVideoPage } from './pages'
import { UserStore } from './stores'
import { cookies } from './utils'
import { loginApi } from './apis'

const routes = [
  {
    path: '/',
    component: <HomePage />
  },
  {
    path: '/registry',
    component: <RegistryPage />
  },
  {
    path: '/share-video',
    component: <ShareVideoPage />,
    authenticate: true
  }
]

const App = () => {
  const [user, setUser] = useContext(UserStore)

  const onLogin = async (values: any, form: FormInstance) => {
    const { email, password } = values
    try {
      const { data } = await loginApi(email, password)
      // Set User
      setUser({
        email
      })
      // Set Token to Cookie
      cookies.set('token', data.token)
    } catch (error) {
      notification.error({
        message: `Error`,
        description: error.response.data.error.message || 'Login Failed',
        placement: 'bottomRight'
      })
      form.resetFields()
    }
  }

  const onLogout = () => {
    setUser(null)
    cookies.remove('token')
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout user={user} onLogout={onLogout} onLogin={onLogin} />}>
          {routes.map((route, i) => (
            <Route
              path={route.path}
              key={i}
              element={!route.authenticate ? route.component : <Authenticate>{route.component}</Authenticate>}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
