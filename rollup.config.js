const compiler = require('rollup-plugin-closure-compiler');
const common = require('rollup-plugin-commonjs');
const node = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'inject/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    dir: 'inject-build'
  },
  plugins: [
    //node(),
    //common(),
    compiler({
      //compilation_level: 'SIMPLE',
      compilation_level: 'ADVANCED',
      warning_level: 'QUIET',
      jscomp_off: ['checkVars']
    }),
  ],
};