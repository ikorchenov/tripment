import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, onClick: () => void) => {
  const hadleClick = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onClick();
      }
    },
    [ref, onClick],
  );

  useEffect(() => {
    window.addEventListener('click', hadleClick);

    return () => {
      window.removeEventListener('click', hadleClick);
    };
  }, [hadleClick]);
};
