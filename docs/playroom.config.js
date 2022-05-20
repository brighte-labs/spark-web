const babelConfig = require('../babel.config');

module.exports = {
  title: 'Playroom | Brighte Spark',
  components: './playroom/components.ts',
  outputPath: './public/playroom/',
  baseUrl: '/playroom/',
  exampleCode: `<Text>Hello world</Text>`,
  frameComponent: './playroom/frame.tsx',
  port: 9000,
  typeScriptFiles: [
    '../packages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '!**/node_modules',
  ],
  widths: [320, 768, 1024],
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  }),
};
