import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/react-haki/',
  publicPath: '/react-haki/',
  outputPath: 'docs-dist',
  favicons: ['/react-haki/favicon.ico'],
  themeConfig: {
    name: 'react haki',
    logo: '/react-haki/logo.png',
    footer:
      '<strong>React Haki</strong> | Open-source MIT Licensed | Powered by <a href="https://d.umijs.org/" target="_blank">dumi</a> 😘',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'hook', dir: 'src/hooks' },
    ],
  },
});
