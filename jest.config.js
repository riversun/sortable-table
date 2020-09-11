module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '**/test/**/*.test.js'
  ],
  testTimeout: 5000,
  moduleDirectories: [
    'node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@riversun/event-emitter)/)'
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true
};
