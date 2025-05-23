/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: ['**/__tests__/**', '**/*.test.ts'],
  moduleNameMapper: {
    // Handle path aliases
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  setupFiles: ['./jestSetup.js'],
};
