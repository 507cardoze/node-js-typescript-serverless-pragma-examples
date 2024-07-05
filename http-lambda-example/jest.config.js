/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');

const baseConfig = (compilerOptions, setupTestsPaths) => ({
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  setupFilesAfterEnv: Array.isArray(setupTestsPaths) ? setupTestsPaths : [setupTestsPaths],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'd.ts'],
});

const { compilerOptions } = require('./tsconfig.json');

module.exports = baseConfig(compilerOptions, ['./setup-tests.js']);
