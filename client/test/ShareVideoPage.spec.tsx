import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import ShareVideoPage from '../src/pages/ShareVideo'

const server = setupServer(
  rest.post('/video', (req, res, ctx) => {
    const { url } = req.body as any

    if (url === 'https://www.youtube.com/watch?v=no-exist') {
      return res(
        ctx.status(400),
        ctx.json({
          error: {
            message: ''
          }
        })
      )
    }

    return res(
      ctx.json({
        data: {
          message: ''
        }
      })
    )
  })
)

describe('renders Share Video Page ', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Get Title Form', async () => {
    render(<ShareVideoPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      const linkElement = screen.getByText(/Share Video/)
      expect(linkElement).toBeInTheDocument()
    })
  })

  test('ShareVideo with youtube url are correct', async () => {
    render(<ShareVideoPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Youtube URL'), {
        target: { value: 'https://www.youtube.com/watch?v=cfsU5_vNuuM' }
      })
      expect(screen.getByLabelText('Youtube URL')).toHaveValue('https://www.youtube.com/watch?v=cfsU5_vNuuM')
      fireEvent.click(screen.getByText('Share'))
    })
  })

  test('ShareVideo with youtube url are incorrect', async () => {
    render(<ShareVideoPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Youtube URL'), {
        target: { value: 'https://www.youtube.com/watch?v=no-exist' }
      })
      expect(screen.getByLabelText('Youtube URL')).toHaveValue('https://www.youtube.com/watch?v=no-exist')
      fireEvent.click(screen.getByText('Share'))
      expect(screen.getByLabelText('Youtube URL')).toHaveValue('')
    })
  })

  test('ShareVideo with youtube url are invalid', async () => {
    render(<ShareVideoPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Youtube URL'), {
        target: { value: 'https://www.youtube.com' }
      })

      expect(screen.getByText('Youtube URL is invalid!')).toBeInTheDocument()
    })
  })
})
