import React from 'react'
import { Card } from 'antd'
import './style.scss'

import { Video } from '../../components'

const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='videos'>
        {new Array(1, 2, 3).fill(null).map((value, index) => (
          <Card key={index}>
            <Video videoId='niPkap1ozUA' title='Movie Title' shareBy='vtanh1905@gmail.com' description='This is a video' />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomePage
