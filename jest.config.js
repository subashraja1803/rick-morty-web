module.exports = {
  testMatch: ['<rootDir>/src/**/(*.)test.{js, jsx}'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/config/*',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Ignore certain directories from testing
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],

  // An array of test framework scripts that should run before each test
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/FileStub.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
