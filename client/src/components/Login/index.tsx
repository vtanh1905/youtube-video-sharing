import React from 'react'
import { Button, Form, Input } from 'antd'

const Login = (props: any) => {
  const { onSubmit } = props

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    onSubmit(values, form)
  }

  return (
    <Form layout={'inline'} onFinish={onFinish} form={form}>
      <Form.Item name='email' rules={[{ required: true, message: '', type: 'email' }]}>
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: '', min: 6, max: 15 }]}>
        <Input.Password placeholder='Password' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
