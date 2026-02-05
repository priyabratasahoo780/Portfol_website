import { render, screen } from '@testing-library/react'
import App from './App'
import { vi, describe, it, expect } from 'vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('App', () => {
  it('renders loading screen initially', () => {
    render(<App />)
    expect(screen.getByText('PRIYABRATA')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument()
  })
})
