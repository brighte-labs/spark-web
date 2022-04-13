import { useState } from 'react';

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 */
export function useDisclosure({ defaultIsOpen }: UseDisclosureProps = {}): {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
} {
  const [isOpen, setIsOpen] = useState(defaultIsOpen ?? false);

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const onToggle = () => setIsOpen(prevState => !prevState);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
