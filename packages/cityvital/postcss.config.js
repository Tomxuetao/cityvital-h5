module.exports = {
  plugins: {
    autoprefixer: {
      grid: false,
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions'
      ]
    },
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375
    }
  }
}
