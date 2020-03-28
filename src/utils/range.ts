import { Some, None } from "./option";
import { Iter } from "./iter";

export function range(from: number, to: number): Iter<number> {
  let state = from;
  return {
    next: () => {
      if (state < to) {
        const result = Some(state);
        state = state + 1;
        return result;
      } else {
        return None();
      }
    },
  };
}