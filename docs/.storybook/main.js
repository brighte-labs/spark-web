module.exports = {
  stories: ['../../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.output.publicPath = '/storybook/';
    return config;
  },
  managerWebpack: async config => {
    config.output.publicPath = '/storybook/';
    return config;
  },
};
