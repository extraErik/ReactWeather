var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/foundation-sites/dist/foundation.min.js',
            'app/tests/**/*.test.jsx'
        ],
        preprocessors: {
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
            // 'app/app.jsx': ['webpack', 'sourcemap', 'coverage'],
            // 'app/components/*.jsx': ['webpack', 'sourcemap', 'coverage']
        },
        reporters: ['mocha', 'coverage'],
        client: {
            mocha: {
                timeout: '5000'
            }
        },
        //webpack: webpackConfig,
        webpack: { //kind of a copy of your webpack config
              devtool: 'inline-source-map', //just do inline source maps instead of the default
              resolve: {
                  root: __dirname,
                  modulesDirectories: [
                      'node_modules',
                      './app/components',
                      './app/api'
                  ],
                  alias: {
                      app: 'app',
                      applicationStyles: 'app/styles/app.scss'
                  },
                  extensions: ['', '.js', '.jsx']
              },
              module: {
                preLoaders: [
                    {
                        test: /\.jsx?$/, loader: "eslint-loader", exclude: /(node_modules|bower_components)/
                    }
                ],
                loaders: [
                  {
                      loader: 'babel-loader',
                      query: {
                          presets: ['react', 'es2015', 'stage-0']
                      },
                      test: /\.jsx?$/,
                      exclude: /(node_modules|bower_components)/
                  },
                  {
                      loader: 'json-loader',
                      test: /\.json$/
                  }
                ],
                postLoaders: [
                    { //delays coverage til after tests are run, fixing transpiled source coverage error
                        test: /\.jsx?$/,
                        exclude: /(test|node_modules|bower_components)\//,
                        loader: 'istanbul-instrumenter'
                    }
                ]
            }
        },

        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};
