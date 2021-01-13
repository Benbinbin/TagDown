module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup',
    },
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
      title: 'Options',
    },
    override: {
      template: 'public/browser-extension.html',
      entry: './src/override/main.js',
      title: 'Override',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js',
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js',
            ],
          },
        },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/_variables.scss";',
      },
    },
  },
};
