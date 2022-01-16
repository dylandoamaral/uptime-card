import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  nodeResolve(),
  typescript({ sourceMap: true }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  serve({
    contentBase: './dist',
    host: '0.0.0.0',
    port: 5555,
    allowCrossOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
  terser(),
];

export default {
  input: ['src/card.ts'],
  output: {
    sourcemap: true,
    file: './dist/uptime-card.js',
    format: 'es',
  },
  plugins: plugins,
};
