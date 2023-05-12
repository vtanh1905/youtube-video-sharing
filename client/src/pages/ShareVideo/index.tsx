import React from 'react'
import { Card, Form, Input, Button } from 'antd'
import './style.scss'

const ShareVideoPage = () => {
  return (
    <div className='share-video-page'>
      <Card title='Share Video'>
        <Form className='share-video-form'>
          <Form.Item label='Youtube URL' name='url' rules={[{ required: true, message: 'Youtube URL is invalid!' }]}>
            <Input />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' style={{ width: '30%' }}>
              Share
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ShareVideoPage
