import React from 'react'
import { Card, Form, Input, Button } from 'antd'
import './style.scss'

const RegistryPage = () => {
  return (
    <div className='registry-page'>
      <Card title='Registry'>
        <Form layout='vertical' className='registry-form'>
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

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' style={{ width: '30%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default RegistryPage
