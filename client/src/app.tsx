import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { FormInstance, notification } from 'antd'

import routes from './routes'
import { Layout, Authenticate } from './components'
import { UserStore, VideoStore } from './stores'
import { cookies, websocket } from './utils'
import { getAccountInfoApi, loginApi } from './apis'

const App = () => {
  const [user, setUser] = useContext(UserStore)
  const [, setVideos] = useContext(VideoStore)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Re-login if token exists in cookie
    const token = cookies.get('token')
    if (token) {
      getAccountInfoApi(token)
        .then((result) => {
          setUser(result.data)
        })
        .catch((error) => {
          console.error(error)
          // Clear Cookie if the token is not expire or not valid
          cookies.remove('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    //Listen Websocket For New Video
    if (user) {
      websocket.on('message', (data) => {
        if (user.email !== data.email) {
          setVideos((preState: any) => {
            const clone: any[] = JSON.parse(JSON.stringify(preState))
            clone.unshift(data)
            return clone
          })
          notification.info({
            message: data.title,
            description: `Shared by ${data.email}`,
            placement: 'bottomRight'
          })
        }
      })
    }
    return () => {
      websocket.removeListener('message')
    }
  }, [user])

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
        <Route element={<Layout user={user} loading={loading} onLogout={onLogout} onLogin={onLogin} />}>
          {routes.map((route, i) => (
            <Route
              path={route.path}
              key={i}
              element={
                !route.authenticate ? (
                  route.component
                ) : (
                  <Authenticate options={route.authenticate}>{route.component}</Authenticate>
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
