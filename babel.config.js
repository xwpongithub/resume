module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'usage',
      polyfills: [
        'es6.array.find-index',
        'es6.array.map',
        'es6.promise',
        'es7.promise.finally',
        'es6.map',
        'es6.set'
      ]
    }]
  ]
}
