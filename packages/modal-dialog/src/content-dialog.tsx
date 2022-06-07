import { css, keyframes } from '@emotion/css';
import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogTitleProps,
} from '@radix-ui/react-dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Heading } from '@spark-web/heading';
import { XIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

const MAX_HEIGHT = '85vh';
const CONTENT_PADDING = 'xlarge';

// Dialog Overlay
// ------------------------------
const showOverlay = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});
const hideOverlay = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, forwardedRef) => {
    const theme = useTheme();
    return (
      <DialogPrimitive.Overlay asChild>
        <Box
          ref={forwardedRef}
          background="backdrop"
          position="fixed"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex="modalBlanket"
          className={css({
            '@media screen and (prefers-reduced-motion: no-preference)': {
              '&[data-state="open"]': {
                animation: `${showOverlay} ${theme.animation.standard.duration}ms ${theme.animation.standard.easing}`,
              },
              '&[data-state="closed"]': {
                animation: `${hideOverlay} ${theme.animation.standard.duration}ms ${theme.animation.standard.easing}`,
              },
            },
          })}
        />
      </DialogPrimitive.Overlay>
    );
  }
);
DialogOverlay.displayName = 'DialogOverlay';

// Dialog Content
// ------------------------------

const DialogContent = forwardRef<
  HTMLDivElement,
  DialogContentProps & { size?: ContentDialogProps['size'] }
>(({ children, size = 'small', ...rest }, forwardedRef) => {
  const theme = useTheme();
  const gutter = theme.spacing.large;
  const showContent = keyframes({
    from: {
      opacity: 0,
      transform: `translate3d(0, ${theme.spacing.xxlarge}px, 0) scale(.96)`,
    },
    to: {
      opacity: 1,
      transform: `translate3d(0, 0, 0) scale(1)`,
    },
  });
  const hideContent = keyframes({
    from: {
      opacity: 1,
      transform: `translate3d(0, 0, 0) scale(1)`,
    },
    to: {
      opacity: 0,
      transform: `translate3d(0, -${theme.spacing.xxlarge}px, 0) scale(.96)`,
    },
  });
  return (
    <Box
      display="flex"
      position="fixed"
      width="full"
      zIndex="modal"
      className={css({
        top: '50%',
        left: '50%',
        padding: gutter,
        transform: 'translate(-50%, -50%)',
        maxHeight: MAX_HEIGHT,
        // Account for padding on left and right so that dialog doesn't go edge-to-edge on mobile
        maxWidth: theme.contentWidth[size] + gutter * 2,
        willChange: 'transform',
        ':focus': {
          // using a transparent outline to ensure focused elements are visible for Windows high contrast mode users.
          outline: '2px solid transparent',
          outlineOffset: '2px',
        },
      })}
    >
      <DialogPrimitive.Content {...rest} asChild>
        <Box
          ref={forwardedRef}
          background="surface"
          display="flex"
          flexDirection="column"
          flex={1}
          position="relative"
          shadow="large"
          width="full"
          className={css({
            maxHeight: MAX_HEIGHT,
            '@media screen and (prefers-reduced-motion: no-preference)': {
              '&[data-state="open"]': {
                animation: `${showContent} ${theme.animation.standard.duration}ms ${theme.animation.standard.easing}`,
              },
              '&[data-state="closed"]': {
                animation: `${hideContent} ${theme.animation.standard.duration}ms ${theme.animation.standard.easing}`,
              },
            },
          })}
        >
          {children}
        </Box>
      </DialogPrimitive.Content>
    </Box>
  );
});
DialogContent.displayName = 'DialogContent';

// Dialog Wrapper
// ------------------------------
function DialogWrapper({
  children,
  ...rest
}: DialogContentProps & { size?: ContentDialogProps['size'] }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogContent {...rest}>{children}</DialogContent>
    </DialogPrimitive.Portal>
  );
}

// Dialog Title
// ------------------------------
function DialogTitle({ children, ...rest }: DialogTitleProps) {
  const theme = useTheme();
  return (
    <Box
      as="header"
      background="surface"
      paddingX={CONTENT_PADDING}
      paddingTop="xlarge"
      position="sticky"
      top={0}
      // Account for Capsize causing top of words getting hidden behind sticky header
      className={css({ paddingBottom: theme.spacing.large + 2 })}
    >
      <DialogPrimitive.Title {...rest} asChild>
        <Heading level="2">{children}</Heading>
      </DialogPrimitive.Title>
    </Box>
  );
}

// Dialog Description
// ------------------------------
function DialogDescription({ children, ...rest }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description {...rest} asChild>
      <Heading level="3">{children}</Heading>
    </DialogPrimitive.Description>
  );
}

// Dialog Close
// ------------------------------
function DialogClose() {
  const focusRingStyles = useFocusRing();
  return (
    <DialogPrimitive.Close asChild>
      <Box
        as="button"
        type="button"
        background="primary"
        padding="small"
        borderRadius="full"
        position="absolute"
        top={0}
        right={0}
        zIndex="modal"
        className={css({
          cursor: 'pointer',
          transform: 'translate(33%, -33%)',
          ':focus': focusRingStyles,
        })}
      >
        <VisuallyHidden>Close</VisuallyHidden>
        <XIcon size="xsmall" />
      </Box>
    </DialogPrimitive.Close>
  );
}

// Dialog Close Button
// ------------------------------
export function DialogCloseButton(): JSX.Element {
  return <DialogPrimitive.Close />;
}

// Content Dialog
// ------------------------------
export type ContentDialogProps = {
  children: ReactNode;
  data?: DataAttributeMap;
  size?: keyof BrighteTheme['contentWidth'];
  title: string;
  description?: string;
} & (
  | {
      isOpen: boolean;
      onToggle: () => void;
      trigger?: ReactNode;
    }
  | {
      isOpen?: never;
      onToggle?: never;
      trigger: ReactNode;
    }
);

export function ContentDialog({
  children,
  data,
  trigger,
  title,
  description,
  isOpen,
  onToggle,
  size,
}: ContentDialogProps): JSX.Element {
  const theme = useTheme();
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onToggle}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}

      <DialogWrapper size={size}>
        <DialogClose />

        <Box
          display="flex"
          data={data}
          flexDirection="column"
          overflow="hidden"
        >
          <DialogTitle>{title}</DialogTitle>
          <Stack
            gap="large"
            overflow="auto"
            paddingTop={CONTENT_PADDING}
            paddingX={CONTENT_PADDING}
            className={css({
              // Account for Capsize causing top of words getting hidden behind sticky header
              marginTop: -theme.spacing.large + 2,
              paddingBottom: theme.spacing.xlarge,
            })}
          >
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
            {children}
          </Stack>
        </Box>
      </DialogWrapper>
    </DialogPrimitive.Root>
  );
}
