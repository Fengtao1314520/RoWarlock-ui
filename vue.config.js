const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  lintOnSave: false,
  // publicPath: './', // elint有报错依然可以编译,github需要打开
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment'
      },
      resolve: { extensions: ['.js', '.vue', '.json', '.ts'] },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      plugins: [new MonacoWebpackPlugin()],
      devServer: {
        proxy: {
          '/api': {
            // 此处的写法，目的是为了 将 /api 替换成
            target: 'http://127.0.0.1:7788/',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      }
    }
  }
}
