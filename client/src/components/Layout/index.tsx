import React from 'react'
import { Layout as LayoutAntd, Button } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import './style.scss'

import Login from '../Login'

const { Header, Content } = LayoutAntd

const Layout = (props: any) => {
  return (
    <LayoutAntd>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className='header-content'>
          <Link to='/'>
            <h1 className='header-text-logo'>
              <HomeOutlined /> Funny Movies
            </h1>
          </Link>

          <div className='login-form'>
            <Login />
            <Button>Registry</Button>
          </div>
        </div>
      </Header>
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 380 }}>{props.children}</div>
      </Content>
    </LayoutAntd>
  )
}

export default Layout
