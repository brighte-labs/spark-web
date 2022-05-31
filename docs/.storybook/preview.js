import { AesteticoStylesheet, SparkProvider } from '@spark-web/core';

export const decorators = [
  Story => (
    <SparkProvider>
      <AesteticoStylesheet />
      <Story />
    </SparkProvider>
  ),
];
