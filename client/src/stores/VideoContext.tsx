import React, { createContext, useState } from 'react'

export const VideoStore = createContext([])

export const VideoContextProvider = ({ children }: any) => {
  const [videos, setVideo] = useState([])

  return <VideoStore.Provider value={[videos, setVideo]}>{children}</VideoStore.Provider>
}
