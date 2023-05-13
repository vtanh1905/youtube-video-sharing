import { io } from 'socket.io-client'

export const websocket = io(process.env.WEBSOCKET_URL)
