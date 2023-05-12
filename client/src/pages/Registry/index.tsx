import React from 'react'
import { Card, Form, Input, Button, notification } from 'antd'
import './style.scss'
import { registryApi } from '../../apis'
import { useNavigate } from 'react-router-dom'

const RegistryPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onRegistry = async (values: any) => {
    const { email, password } = values
    try {
      const result = await registryApi(email, password)
      notification.success({
        message: `Success`,
        description: result.message || 'Successful',
        placement: 'bottomRight'
      })
      navigate('/')
    } catch (error) {
      notification.error({
        message: `Error`,
        description: error.response.data.error.message || 'Login Failed',
        placement: 'bottomRight'
      })
      form.resetFields()
    }
  }

  return (
    <div className='registry-page'>
      <Card title='Registry'>
        <Form layout='vertical' className='registry-form' form={form} onFinish={onRegistry}>
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
