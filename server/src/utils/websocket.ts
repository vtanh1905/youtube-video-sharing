import { Server as WebSocket } from 'socket.io'
import { Server } from 'http'

import { eventEmitter } from './eventEmitter'

export const webSocketListen = (server: Server) => {
  const io = new WebSocket(server, {
    cors: {
      origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN
    }
  })

  // To Fix: MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 NEW_VIDEO listeners added to [EventEmitter].
  // Use emitter.setMaxListeners() to increase limit
  process.setMaxListeners(0)

  io.on('connection', (socket) => {
    eventEmitter.on('NEW_VIDEO', (data) => {
      socket.emit('message', data)
    })
  })
}
