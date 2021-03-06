// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { isIndexRedirected } from '~routes/utils'

//
// @path (admin) /
//
export default store => ({
  path: '/',

  indexRoute: {
    onEnter: isIndexRedirected(store)
  },

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./container').default)
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./not-authenticated').default(store),
        require('./authenticated').default(store)
      ])
    })
  }
})
