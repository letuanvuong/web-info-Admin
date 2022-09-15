module.exports = {
  testRegex: '.*\\.test\\.(j|t)sx?$',
  moduleNameMapper: {
    '\\.(css|less|svg)$': 'identity-obj-proxy'
  },
  setupFiles: ['jest-canvas-mock', './tests/setup.ts'],
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './fileTransformer.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node']
}
