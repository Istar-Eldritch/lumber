
declare global {
  interface ArrayModule {
    reduce: <T, O>(arr: T[], acc: O, f: (acc: O, next: T) => O) => O;
    merge: <T>(...args: T[][]) => T[];
  }
}

export function reduce<T, O>(arr: T[], acc: O, f: (acc: O, next: T) => O): O {
  let _acc = acc;
  for (const item of arr) {
    _acc = f(_acc, item);
  }
  return _acc;
}

export function merge<T>(...args: T[][]): T[] {
  return reduce(args, [] as T[], (acc, next) => {
    return reduce(next, acc, (_acc, _next) => {
      table.insert(_acc, _next);
      return _acc;
    });
  });
}
