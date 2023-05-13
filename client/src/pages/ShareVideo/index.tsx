import React from 'react'
import { Card, Form, Input, Button, notification } from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { postVideosApi } from '../../apis'

const ShareVideoPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onShareVideo = async (values: any) => {
    const { url } = values
    try {
      const result = await postVideosApi(url)
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
    <div className='share-video-page'>
      <Card title='Share Video'>
        <Form className='share-video-form' form={form} onFinish={onShareVideo}>
          <Form.Item
            label='Youtube URL'
            name='url'
            rules={[
              {
                required: true,
                message: 'Youtube URL is require!'
              },
              {
                pattern: new RegExp(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/watch\?v=[0-9a-zA-Z_-]+$/),
                message: 'Youtube URL is invalid!'
              }
            ]}
          >
            <Input placeholder='https://www.youtube.com/watch?v=videoId' />
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
