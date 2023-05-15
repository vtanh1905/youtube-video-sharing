import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import NotFound from '../src/pages/NotFound'

describe('renders Not Found Page', () => {
  test('Get Message 404', async () => {
    render(<NotFound />)
    await waitFor(() => {
      const linkElement = screen.getByText(/Oops! 404 Page Not Found/)
      expect(linkElement).toBeInTheDocument()
    })
  })
})
