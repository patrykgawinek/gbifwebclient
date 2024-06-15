import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App root', () => {
  test('renders home page', () => {
    const homepage = render(<App />);
    expect(homepage).toMatchSnapshot();
  });
});
