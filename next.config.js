const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }
  
  require('dotenv').config();
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const path = require('path');
  const Dotenv = require('dotenv-webpack');
  const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
  const withTM = require("next-plugin-transpile-modules");
  
  return withBundleAnalyzer(
    withTM({
      analyzeServer: ["server", "both"].includes(
        process.env.BUNDLE_ANALYZE
      ),
      analyzeBrowser: ["browser", "both"].includes(
        process.env.BUNDLE_ANALYZE
      ),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "./bundles/client.html"
        }
      },
      transpileModules: ["lodash-es", "gsap"],
      webpack: (config, { dev, isServer }) => {
        config.module.rules.push(
          {
            test: /\.less$/,
            use: [
              {
                loader: (!isServer && dev) ? 'style-loader' : MiniCssExtractPlugin.loader },
              { loader: 'css-loader' },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              }
            ]
          },
        );
        
        config.plugins = config.plugins || [];
        
        config.plugins.push(
          new MiniCssExtractPlugin({
            filename: '[name].css',
          })
        );
        
        config.plugins = [
          ...config.plugins,
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
          })
        ];
        
        return config
      }
    })
  );
};
