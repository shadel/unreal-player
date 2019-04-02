module.exports = {
  mode: "development",
  entry: {
    'ureal-player': './src/index.ts',
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    library: 'ureal-player',
    libraryTarget: 'umd'
  },
  externals: {
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.map$/, loader: 'ignore-loader' },
      { test: /\.d.ts$/, loader: 'ignore-loader' },
      { test: /\.tsx?$/, exclude: /\.d.ts$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
          },
        },
      ],},
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
      },
    ]
  }
};