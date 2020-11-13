module.exports = () => ({
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '.ts': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts$',
  roots: ['<rootDir>/tests'],
  collectCoverage: false,
  verbose: false,
  notify: true,
  testURL: 'http://localhost/',
});
