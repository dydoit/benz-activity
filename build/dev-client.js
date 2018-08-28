require('eventsource-polyfill')
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true'

hotClient.subscribe(event => {
  console.log(event)
  if (event.action === 'reload') {
    window.location.reload()
  }
})
