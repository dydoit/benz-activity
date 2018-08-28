module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')({
      browsers: [
        "last 2 versions",
        "> 1%",
        "iOS >= 8",
        "Firefox >= 20",
        "Android > 4.4"
      ]
    }),
  ]
}
