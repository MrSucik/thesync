import { useSelector as useReduxSelector } from "react-redux";
import { RootState } from "./definitions";

export const useSelector = <T>(
  selector: (state: RootState) => T,
  equalityFn?: ((left: T, right: T) => boolean) | undefined
): T => useReduxSelector<RootState, T>(selector, equalityFn);
