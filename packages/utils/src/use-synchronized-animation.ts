import { useLayoutEffect, useRef } from 'react';

let stashedTime: number | null;

/**
 * Keeps all instances of the same animation in sync.
 * Taken from Sam Selikoff's example post:
 * @see: https://github.com/samselikoff/2022-02-24-use-synchronized-animation
 */
export function useSynchronizedAnimation(animationName: string) {
  let ref = useRef(null);

  useLayoutEffect(() => {
    let animations = document
      .getAnimations()
      // @ts-expect-error: Property 'animationName' does not exist on type 'Animation'.
      .filter(animation => animation.animationName === animationName);

    let myAnimation = animations.find(
      // @ts-expect-error: Property 'target' does not exist on type 'AnimationEffect'.
      animation => animation.effect?.target === ref.current
    );

    if (myAnimation === animations[0] && stashedTime) {
      myAnimation.currentTime = stashedTime;
    }

    if (myAnimation && myAnimation !== animations[0]) {
      myAnimation.currentTime = animations[0].currentTime;
    }

    return () => {
      if (myAnimation === animations[0]) {
        stashedTime = myAnimation.currentTime;
      }
    };
  }, [animationName]);

  return ref;
}
