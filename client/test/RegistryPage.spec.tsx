import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom'
import RegistryPage from '../src/pages/Registry'

const server = setupServer(
  rest.post('/account/registry', (req, res, ctx) => {
    const { email } = req.body as any

    if (email === 'noaccount@gmail.com') {
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

describe('renders RegistryPage', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Get Title Form', async () => {
    render(<RegistryPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      const linkElement = screen.getByText(/Registry/)
      expect(linkElement).toBeInTheDocument()
    })
  })

  test('Registry with email and password are correct', async () => {
    render(<RegistryPage />, { wrapper: BrowserRouter })
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'admin@gmail.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123123' } })

      expect(screen.getByLabelText('Email')).toHaveValue('admin@gmail.com')
      expect(screen.getByLabelText('Password')).toHaveValue('123123')

      fireEvent.click(screen.getByText('Submit'))
    })
  })

  test('Registry with email and password are incorrect', async () => {
    render(<RegistryPage />, { wrapper: BrowserRouter })
    await waitFor(async () => {
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'noaccount@gmail.com' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123123' } })

      expect(screen.getByLabelText('Email')).toHaveValue('noaccount@gmail.com')
      expect(screen.getByLabelText('Password')).toHaveValue('123123')

      fireEvent.click(screen.getByText('Submit'))

      expect(screen.getByLabelText('Email')).toHaveValue('')
      expect(screen.getByLabelText('Password')).toHaveValue('')
    })
  })

  test('Registry with email and password are invalid', async () => {
    render(<RegistryPage />, { wrapper: BrowserRouter })
    await waitFor(async () => {
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid' } })
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } })

      expect(screen.getByText('Email is invalid!')).toBeInTheDocument()
      expect(screen.getByText('Password is invalid!')).toBeInTheDocument()
    })
  })
})
