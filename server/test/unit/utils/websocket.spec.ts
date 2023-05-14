/// <reference types="@types/jest" />;
import express from 'express'
import http from 'http'
import { webSocketListen } from '../../../src/utils'


describe('Unit Test - WebSocketListen utils', () => {
  test('webSocketListen should call', () => {
    const app = express()
    const server = http.createServer(app)
    expect(webSocketListen(server)).toEqual(undefined)
  })
})
