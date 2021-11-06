import { useCallback, useEffect, useState, useRef } from "react";
/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} ref
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (initialState: boolean = false) => {
  const ref = useRef<any>(null);
  const [isActive, setIsActive] = useState(initialState);

  const onClick = useCallback(
    (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (ref && ref.current && !ref.current.contains(e.target)) {
        setIsActive(false);
      }
    },
    [ref.current]
  );

  useEffect(() => {
    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick, true);
    }

    return () => {
      window.removeEventListener("click", onClick, true);
    };
  }, [isActive, ref.current]);

  return { isActive, setIsActive, ref };
};
