import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/favicon.ico'],
  themeConfig: {
    name: 'react haki',
    logo: '/logo.png',
    footer: '<strong>React Haki</strong> | Open-source MIT Licensed | Powered by <a href="https://d.umijs.org/" target="_blank">dumi</a> 😘',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'hook', dir: 'src/hooks' }
    ]
  }
});
