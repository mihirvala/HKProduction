import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // framer-motion's whileInView relies on IntersectionObserver,
  // which jsdom does not implement.
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (global as any).IntersectionObserver = MockIntersectionObserver;
});

test('renders the brand name', () => {
  render(<App />);
  expect(screen.getAllByText(/HK Production/i).length).toBeGreaterThan(0);
});

test('renders the curated portfolio photographs', () => {
  const { container } = render(<App />);
  const shots = container.querySelectorAll('#portfolio img');
  expect(shots.length).toBe(12);
  // Every shot must come from the optimised folder, not the full-size originals
  shots.forEach((img) => {
    expect(img.getAttribute('src')).toMatch(/^\/portfolio\//);
  });
});

test('renders all three wedding packages with their prices', () => {
  render(<App />);
  expect(screen.getByText('Silver Package')).toBeInTheDocument();
  expect(screen.getByText('Gold Package')).toBeInTheDocument();
  expect(screen.getByText('Diamond Package')).toBeInTheDocument();

  expect(screen.getByText('₹ 75,000')).toBeInTheDocument();
  expect(screen.getByText('₹ 1,75,000')).toBeInTheDocument();
  expect(screen.getByText('₹ 2,55,000')).toBeInTheDocument();
});
