import pkg from './package.json'
import {minify} from 'uglify-es'
import rpi_uglify from 'rollup-plugin-uglify'
import rpi_jsy from 'rollup-plugin-jsy-babel'

const external = ['react']
const sourcemap = 'inline'
const plugins = [rpi_jsy()]

const ugly = { warnings: true, output: {comments: false, max_line_len: 256}}
const prod_plugins = plugins.concat([ rpi_uglify(ugly, minify) ])

export default [
	{ input: 'code/index.jsy',
		output: [
      { file: pkg.main, format: 'cjs', sourcemap, exports: 'named' },
      { file: pkg.module, format: 'es', sourcemap },
    ],
    external, plugins },

  { input: 'code/index.default.jsy',
    output: { file: `umd/react-subscription-view.js`, format: 'umd', sourcemap, name:'react-subscription-view' },
    external, plugins },

  prod_plugins &&
    { input: 'code/index.default.jsy',
      output: { file: pkg.browser, format: 'umd', name:'react-subscription-view' },
      external: [], plugins: prod_plugins },


  { input: 'test/browser/test.jsy',
    output: { file: `test/browser/test.umd.js`, format: 'iife' },
    external, plugins },

].filter(e => e)

