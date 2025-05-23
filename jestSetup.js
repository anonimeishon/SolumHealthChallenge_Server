const jestFetchMock = require('jest-fetch-mock');
jestFetchMock.enableMocks();

// This helps with ES modules in Jest tests
// It ensures that file extensions are properly handled
// and that import/export statements work as expected
Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
});

Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
});
