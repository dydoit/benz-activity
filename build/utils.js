import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'

export function cssLoaders (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
      // modules: true
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap
        }
      })
    }

    if (options.extract) {
      return ExtractTextWebpackPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    scss: generateLoaders('sass')
  }
}

export function styleLoaders (options) {
  const loaders = cssLoaders(options)

  return Object.keys(loaders).reduce((finalLoaders, extension) => {
    return [ ...finalLoaders, {
      test: new RegExp('\\.' + extension + '$'),
      use: loaders[extension]
    } ]
  }, [])
}
