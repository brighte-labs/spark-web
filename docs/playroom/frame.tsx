import { SparkProvider } from '@spark-web/core';
import type { ReactNode } from 'react';

export default function FrameComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <SparkProvider>{children}</SparkProvider>;
}
