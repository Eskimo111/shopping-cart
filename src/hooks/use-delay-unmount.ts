import { useEffect, useState } from "react";

export const useDelayUnmount = (isShowed: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeOutId: number;
    if (isShowed && !shouldRender) {
      setShouldRender(true);
    } else if (!isShowed && shouldRender) {
      timeOutId = window.setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeOutId);
  }, [isShowed, delayTime, shouldRender]);
  return shouldRender;
};
