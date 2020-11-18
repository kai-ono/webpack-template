const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const STYLELINT = ['./src/scss/**.scss'];

module.exports = env => {
  const mode = env.development ? "development" : "production"
  const enabledSourceMap = mode === "development";
  return {
    mode: mode,
    plugins: [new StylelintPlugin({
      files: STYLELINT,
      syntax: 'scss',
      fix: true,
    })],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          enforce: 'pre',
          options: {
            fix: true,
          }
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: enabledSourceMap,
              },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  sourceMap: enabledSourceMap,
                  fiber: require("fibers"),
                },
                additionalData: async (content) => {
                  return (
                    "@use './global-imports' as *;" + content
                  );
                },
              },
            },
          ],
        },
        {
          // 対象となるファイルの拡張子
          test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
          // 画像をBase64として取り込む
          type: "asset/inline",
        },
      ],
    },
    target: ["web", "es5"],
  }
};