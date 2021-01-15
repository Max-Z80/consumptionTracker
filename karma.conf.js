module.exports = function(config) {
  config.set({
    browsers: ["Firefox"],
    //singleRun: true, //just run once by default
    frameworks: ["mocha", "snapshot", "mocha-snapshot"], //use the mocha test framework
    files: [
      "**/__snapshots__/**/*.md",
      "tests.webpack.js" //just load this file
    ],
    preprocessors: {
      "**/__snapshots__/**/*.md": ["snapshot"],
      "tests.webpack.js": ["webpack"] //preprocess with webpack and our sourcemap loader
    },
    reporters: ["mocha"], //report results in this format
    webpack: {
      mode: "development",
      //kind of a copy of your webpack config
      output: {
        filename: "[name]"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader" }
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    snapshot: {
      update: !!process.env.UPDATE,
      prune: !!process.env.PRUNE
    },
    mochaReporter: {
      showDiff: true
    },

    client: {
      mocha: {
        reporter: "html",
        ui: "bdd"
      }
    }
  });
};
