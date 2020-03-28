import { Some, None, Option } from "./option";

export function find(s: string, pattern: string): Option<{from: number, to: number}> {
  const [from, to] = string.find(s, pattern);
  if (from && to) {
    return Some({from, to});
  } else {
    return None();
  }
}
