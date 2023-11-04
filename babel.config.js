module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  // env: {
  //   test: {
  //     plugins: [
  //       '@babel/plugin-transform-module-commonjs',
  //       'dynamic-import-node',
  //     ],
  //     presets: [
  //       [
  //         '@babel/prest-env',
  //       ],
  //     ],
  //   },
  // },
};
