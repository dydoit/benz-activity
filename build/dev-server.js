import opn from 'opn'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.dev.conf'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const port = 4000

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  quiet: true
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
})

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.use('/assets', express.static('src/assets'))

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

app.listen(port)
