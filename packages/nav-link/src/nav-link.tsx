import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import { useLinkComponent } from '@spark-web/link';
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
  inline?: boolean;
  isSelected?: boolean;
  size?: 'medium' | 'large';
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { children, href, inline, isSelected = false, size = 'medium' },
    forwardedRef
  ) => {
    const linkComponent = useLinkComponent(forwardedRef);
    const styles = useNavLinkStyles(isSelected);

    return (
      <Box
        as={linkComponent}
        asElement="a"
        href={href}
        aria-current={isSelected ? 'page' : undefined}
        // styles
        background={isSelected ? 'primaryMuted' : undefined}
        display={inline ? 'inline-flex' : 'flex'}
        alignItems="center"
        gap="small"
        paddingY="small"
        paddingX="medium"
        borderRadius={{ tablet: 'small' }}
        className={css(styles)}
      >
        {resolveNavLinkChildren({ children, isSelected, size })}
      </Box>
    );
  }
);
NavLink.displayName = 'NavLink';

export function useNavLinkStyles(isSelected: boolean) {
  const theme = useTheme();

  return {
    ':hover': {
      backgroundColor: isSelected
        ? theme.backgroundInteractions.primaryLowHover
        : theme.color.background.surfaceMuted,

      '> *': {
        color: isSelected ? theme.color.foreground.primaryHover : undefined,
        stroke: isSelected ? theme.color.foreground.primaryHover : undefined,
      },
    },

    ':active': {
      backgroundColor: isSelected
        ? theme.backgroundInteractions.positiveLowActive
        : theme.color.background.surfacePressed,

      '> *': {
        color: isSelected ? theme.color.foreground.primaryActive : undefined,
        stroke: isSelected ? theme.color.foreground.primaryActive : undefined,
      },
    },
  } as const;
}

export function resolveNavLinkChildren({
  children,
  isSelected,
  size,
}: {
  children: NavLinkProps['children'];
  isSelected: NonNullable<NavLinkProps['isSelected']>;
  size: NonNullable<NavLinkProps['size']>;
}) {
  return Children.map(children, child => {
    if (typeof child === 'string') {
      return (
        <Text
          as="span"
          baseline={false}
          overflowStrategy="nowrap"
          weight="medium"
          size={mapTextSize[size]}
          tone={isSelected ? 'primaryActive' : 'muted'}
        >
          {child}
        </Text>
      );
    }

    if (isValidElement(child)) {
      return cloneElement(child, {
        size: 'xxsmall',
        tone: isSelected ? 'primaryActive' : 'muted',
      });
    }

    return null;
  });
}

const mapTextSize = {
  medium: 'small',
  large: 'standard',
} as const;
