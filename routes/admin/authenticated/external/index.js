// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./background.connected').default)
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./community-list').default(store),
        require('./community-new').default(store)
      ])
    })
  }
})
