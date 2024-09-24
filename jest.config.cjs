module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.tsx'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
  transform: {
    '\\.(css|scss)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'esbuild-jest',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': 'jest-transform-stub',

  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@layout(.*)$': '<rootDir>/src/components/layout/$1',
    '^@images(.*)$': '<rootDir>/src/assets/images/$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
  },
  transformIgnorePatterns: [
    'antd$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'png', 'jpeg', 'jpg', 'gif', 'svg'],

};
