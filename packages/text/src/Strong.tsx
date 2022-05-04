import { css } from '@emotion/css';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

export type StrongProps = {
  children: ReactNode;
};

export const Strong = ({ children }: StrongProps) => {
  const { typography } = useTheme();
  const styles = { fontWeight: typography.fontWeight.semibold };
  return <strong className={css(styles)}>{children}</strong>;
};
