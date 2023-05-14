import React from 'react'
import { render, screen } from '@testing-library/react'
import { RegistryPage } from '../src/pages'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => {},
}))

describe('renders RegistryPage', () => {
  test('Get Title Form', () => {
    render(<RegistryPage />)
    const linkElement = screen.getByText(/Registry/i)
    expect(linkElement).toBeInTheDocument()
  })
})
