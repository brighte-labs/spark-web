import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactNode, VFC } from 'react';
import { forwardRef } from 'react';

export type FieldsetProps = {
  /** The form fields that comprise the set. */
  children?: ReactNode;
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;
  /** An identifier which must be unique in the whole document. */
  id?: string;
  /**
   * Provide a caption that describes the set of form fields.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
   */
  legend?: string;
  /** Sets the size of the gap between the legend and children. */
  gap?: 'small' | 'medium' | 'large';
};

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, data, id, legend, gap = 'small' }, ref) => (
    <Box data={data} as="fieldset" ref={ref} id={id}>
      {legend && (
        <>
          <Text as="legend" inline tone="neutral" weight="semibold">
            {legend}
          </Text>
          <Gap gap={gap} />
        </>
      )}
      {children}
    </Box>
  )
);

Fieldset.displayName = 'Fieldset';

/**
 * Hack to get around `<fieldset/>` not supporting `display: flex`.
 * @see https://www.chromestatus.com/feature/5962796351094784
 */
const Gap: VFC<{ gap: 'small' | 'medium' | 'large' }> = ({ gap }) => {
  const { spacing } = useTheme();
  return <Box aria-hidden className={css({ height: spacing[gap] })} />;
};
