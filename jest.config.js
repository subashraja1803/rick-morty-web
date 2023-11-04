module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/src/**/(*.)test.{js, jsx}'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js, jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/config/*',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '@babel/preset-react',
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/FileStub.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
