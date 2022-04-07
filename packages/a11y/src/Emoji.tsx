export type EmojiProps = {
  /** Label used to describe the symbol that will be announced to screen readers. */
  label?: string;
  /** Emoji symbol. */
  symbol: string;
};

export const Emoji = ({ label, symbol }: EmojiProps) => (
  <span aria-hidden={label ? undefined : true} aria-label={label} role="img">
    {symbol}
  </span>
);
