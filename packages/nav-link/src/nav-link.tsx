import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useLinkComponent } from '@spark-web/core';
import type { IconProps } from '@spark-web/icon/src';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactElement } from 'react';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';

type NavLinkChildren =
  | string
  // Strict tuple type to allow only 1 icon and 1 string
  | [ReactElement<IconProps>, string]
  | [string, ReactElement<IconProps>];

export type NavLinkProps = Pick<HTMLAnchorElement, 'href'> & {
  children: NavLinkChildren;
  isCurrent?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, href, isCurrent }, forwardedRef) => {
    const linkComponent = useLinkComponent(forwardedRef);
    const styles = useNavLinkStyles();

    return (
      <Box
        as={linkComponent}
        asElement="a"
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        // styles
        background={isCurrent ? 'primaryMuted' : undefined}
        display="inline-flex"
        alignItems="center"
        gap="small"
        paddingY={{ mobile: 'large', tablet: 'medium' }}
        paddingX={{ mobile: 'xlarge', tablet: 'large' }}
        borderRadius={{ tablet: 'small' }}
        className={css(styles)}
      >
        {resolveNavLinkChildren({ children })}
      </Box>
    );
  }
);
NavLink.displayName = 'NavLink';

function useNavLinkStyles() {
  const theme = useTheme();
  return {
    ':hover': {
      backgroundColor: theme.color.background.surfaceMuted,
    },
  } as const;
}

function resolveNavLinkChildren({ children }: { children: NavLinkChildren }) {
  return Children.map(children, child => {
    if (typeof child === 'string') {
      return (
        <Text
          as="span"
          baseline={false}
          overflowStrategy="nowrap"
          weight="strong"
          // size={mapTokens.fontSize[size]}
          // tone={variant?.textTone}
        >
          {child}
        </Text>
      );
    }

    if (isValidElement(child)) {
      return cloneElement(child, {
        size: child.props.size === 'xxsmall' ? child.props.size : 'xsmall',
      });
    }

    return null;
  });
}
