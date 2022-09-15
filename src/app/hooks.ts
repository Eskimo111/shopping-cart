import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
