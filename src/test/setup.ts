import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

function createStorageMock(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear() {
      store = {};
    },
    getItem(key: string) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    key(index: number) {
      return Object.keys(store)[index] ?? null;
    },
    removeItem(key: string) {
      delete store[key];
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
  };
}

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  writable: true,
  value: createStorageMock(),
});

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});
