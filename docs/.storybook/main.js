module.exports = {
  stories: ['../../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
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
