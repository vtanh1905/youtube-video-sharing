import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import HomePage from '../src/pages/Home'
import { VideoContextProvider } from '../src/stores/VideoContext'

let timeCall = 0

const server = setupServer(
  rest.get('/video', (req, res, ctx) => {
    ++timeCall
    if (timeCall === 1) {
      return res(
        ctx.json({
          data: [
            {
              id: 'bWu9O8jHEuE',
              email: 'admin@gmail.com',
              title: 'Một Ngày Chẳng Nắng',
              description: 'Một Ngày Chẳng Nắng - Description'
            }
          ]
        })
      )
    } else if (timeCall === 2) {
      return res(
        ctx.json({
          data: [
            {
              id: 'fRb8Ch6cN_w',
              email: 'vtanh1905@gmail.com',
              title: 'LỜI CÓ CÁNH',
              description: 'LỜI CÓ CÁNH - OSAD '
            }
          ]
        })
      )
    } else if (timeCall === 3) {
      return res(
        ctx.json({
          data: [
            {
              id: 'MOnfauz-6Do',
              email: 'sogoku@gmail.com',
              title: 'Bàn tăng giảm chiều cao ',
              description: 'Bàn tăng giảm chiều cao vo '
            }
          ]
        })
      )
    }
    return res(
      ctx.json({
        data: []
      })
    )
  })
)

describe('renders Home Page ', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show video', async () => {
    render(<HomePage />, { wrapper: VideoContextProvider })
    await waitFor(() => {
      expect(screen.getByText(/admin@gmail.com/)).toBeInTheDocument()
    })
  })

  test('get more video', async () => {
    render(<HomePage />, { wrapper: VideoContextProvider })
    await waitFor(() => {
      fireEvent.click(screen.getByText('...'))
      expect(screen.getByText(/sogoku@gmail.com/)).toBeInTheDocument()
    })
  })

  test('get more video and not more video then disable button', async () => {
    render(<HomePage />, { wrapper: VideoContextProvider })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { value: '...' }))
      expect(screen.getByRole('button', { value: '...' })).toBeDisabled()
    })
  })
})
