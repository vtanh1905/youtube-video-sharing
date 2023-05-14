import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, notification } from 'antd'
import './style.scss'

import { Video } from '../../components'
import { getVideosApi } from '../../apis'
import { VideoStore } from '../../stores';

const HomePage = () => {
  const [videos, setVideos] = useContext(VideoStore)
  const [disabledButton, setDisabledButton] = useState(false)

  // Call API to get videos
  useEffect(() => {
    getVideosApi(3, 0)
      .then((res) => {
        const { data } = res
        setVideos(data)
      })
      .catch(console.error)
  }, [])

  const onMoreButtonClick = async () => {
    const { data } = await getVideosApi(3, videos.length)

    if (data.length === 0) {
      notification.info({
        message: 'Note',
        description: 'No more videos',
        placement: 'bottomRight'
      })
      setDisabledButton(true)
      return
    }

    const clone: any[] = JSON.parse(JSON.stringify(videos))
    clone.push(...data)
    setVideos(clone)
  }

  return (
    <div className='home-page'>
      <div className='videos'>
        {videos.map((value: any) => (
          <Card key={value.id}>
            <Video videoId={value.id} title={value.title} shareBy={value.email} description={value.description} />
          </Card>
        ))}
        <div className='more-button'>
          <Button onClick={onMoreButtonClick} disabled={disabledButton} block>
            ...
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
