import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['test/**/*.test.ts'],
  plugins: [esbuildPlugin({ ts: true })],
};
