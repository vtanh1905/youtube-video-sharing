import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../src/app'
import { UserStoreProvider } from '../src/stores/UserContext'
import { VideoContextProvider } from '../src/stores/VideoContext'
import { cookies } from '../src/utils/cookies'

jest.mock('../src/routes', () => [
  {
    path: '/',
    authenticate: {
      mustLogin: true
    },
    component: <></>
  },
  {
    path: '*',
    component: <></>
  }
])

const server = setupServer(
  rest.post('/account/info', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          email: 'admin@gmail.com'
        }
      })
    )
  }),
  rest.post('/account/login', (req, res, ctx) => {
    const { email } = req.body as any
    if (email === 'no-account@gmail.com') {
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
          token: 'token'
        }
      })
    )
  })
)

describe('renders App', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show video', async () => {
    render(
      <UserStoreProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </UserStoreProvider>
    )
    await waitFor(() => {
      expect(screen.getByText(/Funny Movies/)).toBeInTheDocument()
    })
  })

  test('login', async () => {
    render(
      <UserStoreProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </UserStoreProvider>
    )
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'admin@gmail.com' } })
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123123' } })

      expect(screen.getByPlaceholderText('Email')).toHaveValue('admin@gmail.com')
      expect(screen.getByPlaceholderText('Password')).toHaveValue('123123')

      fireEvent.click(screen.getByText('Login'))
    })
  })

  // Test 'login' must be run before this test
  test('user re-login', async () => {
    render(
      <UserStoreProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </UserStoreProvider>
    )
    await waitFor(() => {
      expect(screen.getByText(/admin@gmail.com/)).toBeInTheDocument()
    })
  })

  test('logout', async () => {
    render(
      <UserStoreProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </UserStoreProvider>
    )
    await waitFor(() => {
      fireEvent.click(screen.getByText('Logout'))

      expect(screen.getByPlaceholderText('Email')).toHaveValue('')
      expect(screen.getByPlaceholderText('Password')).toHaveValue('')
    })
  })

  test('login with email and pass is incorrect', async () => {
    cookies.remove('token')
    render(
      <UserStoreProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </UserStoreProvider>
    )
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'no-account@gmail.com' } })
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123123' } })

      fireEvent.click(screen.getByText('Login'))

      expect(screen.getByPlaceholderText('Email')).toHaveValue('')
      expect(screen.getByPlaceholderText('Password')).toHaveValue('')
    })
  })
})
