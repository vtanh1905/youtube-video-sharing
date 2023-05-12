import React from 'react'
import { Layout as LayoutAntd, Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import './style.scss'
import { useNavigate } from 'react-router-dom'

import Login from '../Login'

const { Header, Content } = LayoutAntd

const Layout = (props: any) => {
  const { user, onLogin, onLogout } = props

  const navigate = useNavigate()

  return (
    <LayoutAntd className='layout'>
      <Header className='header'>
        <div className='header-content'>
          <Link to='/'>
            <h1 className='header-text-logo'>
              <HomeOutlined /> Funny Movies
            </h1>
          </Link>

          {!user ? (
            <div className='login-form'>
              <Login onSubmit={onLogin} />
              <Button onClick={() => navigate('/registry')}>Registry</Button>
            </div>
          ) : (
            <div className='user-info'>
              <Space wrap>
                <span>
                  Welcome <b>{user.email}</b>
                </span>
                <Button type='primary' onClick={() => navigate('/share-video')}>
                  Share Video
                </Button>
                <Button type='primary' danger onClick={onLogout}>
                  Logout
                </Button>
              </Space>
            </div>
          )}
        </div>
      </Header>
      <Content>
        <div className='content'>{props.children}</div>
      </Content>
    </LayoutAntd>
  )
}

export default Layout
