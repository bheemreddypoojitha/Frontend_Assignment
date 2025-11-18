import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom'; // extends expect with toBeInTheDocument etc.
import { server } from './src/mocks/server';

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock window.scrollTo for tests that trigger scrolling (pagination etc.)
if (!window.scrollTo) {
  window.scrollTo = vi.fn();
}

// Optional: for better TypeScript support with jest-dom
// Vitest will now know about toBeInTheDocument()
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    interface Assertion extends jest.Matchers<HTMLElement> {}
  }
}

