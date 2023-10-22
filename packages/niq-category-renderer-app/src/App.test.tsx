import * as React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  test('renders RootApp text', () => {
    render(<App />)
    const linkElement = screen.getByText(/RootApp/i)
    expect(linkElement).toBeInTheDocument()
  })
})
