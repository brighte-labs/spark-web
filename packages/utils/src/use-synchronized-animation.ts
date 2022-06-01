import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

let stashedTime: number | null;

/**
 * Keeps all instances of the same animation in sync.
 * Taken from Sam Selikoff's example post:
 * @see https://github.com/samselikoff/2022-02-24-use-synchronized-animation
 */
export function useSynchronizedAnimation(animationName: string) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const animations =
      document
        .getAnimations?.()
        // @ts-expect-error: Property 'animationName' does not exist on type 'Animation'.
        .filter(animation => animation.animationName === animationName) || [];

    const animationTarget = animations.find(
      // @ts-expect-error: Property 'target' does not exist on type 'AnimationEffect'.
      animation => animation.effect?.target === ref.current
    );

    if (animationTarget) {
      if (animationTarget === animations[0] && stashedTime) {
        animationTarget.currentTime = stashedTime;
      }

      if (animationTarget && animationTarget !== animations[0]) {
        animationTarget.currentTime = animations[0].currentTime;
      }

      return () => {
        if (animationTarget === animations[0]) {
          stashedTime = animationTarget.currentTime;
        }
      };
    }
  }, [animationName]);

  return ref;
}
