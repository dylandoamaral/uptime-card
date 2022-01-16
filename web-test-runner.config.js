import { esbuildPlugin } from '@web/dev-server-esbuild';
import { chromeLauncher } from '@web/test-runner';

export default {
  browsers: [chromeLauncher({ launchOptions: { args: ['--no-sandbox'] } })],
  files: ['test/**/*.test.ts'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
};
