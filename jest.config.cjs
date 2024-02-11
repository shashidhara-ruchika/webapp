module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    // globalSetup: './tests/setup.js',
    // globalTeardown: './teardown.js',
    testEnvironmentOptions: {
      "detectOpenHandles": true
    }
  };