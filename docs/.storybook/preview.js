import { SparkProvider } from '@spark-web/core';

export const decorators = [
  Story => (
    <SparkProvider>
      <div style={{ margin: '1em' }}>
        <Story />
      </div>
    </SparkProvider>
  ),
];
