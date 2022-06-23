import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';

export type EmojiProps = {
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /** Label used to describe the symbol that will be announced to screen readers. */
  label?: string;
  /** Emoji symbol. */
  symbol: string;
};

export const Emoji = ({ data, label, symbol }: EmojiProps) => (
  <span
    aria-hidden={label ? undefined : true}
    aria-label={label}
    role="img"
    {...(data ? buildDataAttributes(data) : undefined)}
  >
    {symbol}
  </span>
);
