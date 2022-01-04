import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript({ sourceMap: false, inlineSources: false }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  terser(),
];

export default [
  {
    input: 'src/card.ts',
    output: {
      file: './dist/uptime-card.js',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
