import { RefObject, useCallback, useLayoutEffect, /*useRef, */useState } from 'react'

export function useScrollPosition(
  element: RefObject<HTMLElement>,
  wait: number = 0
) {
  const [position, setPosition] = useState(0);
  let throttleTimeout: NodeJS.Timeout | null = null;

  const callBack = useCallback(() => {
    if(element.current) setPosition(element.current.scrollTop);
    throttleTimeout = null;
  }, [element]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }
    const cur = element.current;
    if(cur) {
      cur.addEventListener('scroll', handleScroll)
      return () => cur.removeEventListener('scroll', handleScroll);
    }
  }, [callBack, element])

  return position;
}
