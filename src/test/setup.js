import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; // Imports all custom matchers

// Runs a cleanup function after each test case to reset the JSDOM environment
afterEach(() => {
  cleanup();
});