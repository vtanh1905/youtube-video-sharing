import React from 'react'
import { Card, Form, Input, Button } from 'antd'
import './style.scss'

const RegistryPage = () => {
  return (
    <div className='registry-page'>
      <Card title='Registry' style={{ width: '20vw' }}>
        <Form layout='vertical' labelCol={{ span: 8 }}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, type: 'email', message: 'Email is invalid!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Password is invalid!', min: 6, max: 15 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default RegistryPage
