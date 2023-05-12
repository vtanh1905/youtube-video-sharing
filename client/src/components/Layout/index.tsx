import React from 'react'
import { Layout as LayoutAntd, Button, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import './style.scss'
import { useNavigate } from "react-router-dom";

import Login from '../Login'

const { Header, Content } = LayoutAntd

const Layout = (props: any) => {
  const { user, onLogin, onLogout } = props

  const navigate = useNavigate();


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
            {!user ? (
              <>
                <Login onSubmit={onLogin} />
                <Button onClick={() => navigate('/registry')}>Registry</Button>
              </>
            ) : (
              <>
                <Dropdown
                  dropdownRender={() => {
                    return (
                      <div style={{ float: 'right' }}>
                        <Button type='primary' danger onClick={onLogout} >
                          Logout
                        </Button>
                      </div>
                    )
                  }}
                >
                  <Button>vtanh1905@gmail.com</Button>
                </Dropdown>
              </>
            )}
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
