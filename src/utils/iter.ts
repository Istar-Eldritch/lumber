
declare global {

  interface Iter<T> {
    next: () => Option<T>;
  }

  interface IterModule {
    map: <T, O>(i: Iter<T>, f: (v: T) => O) => Iter<O>;
    filter: <T>(i: Iter<T>, f: (v: T) => boolean) => Iter<T>;
    fold: <T, O>(i: Iter<T>, init: O,  f: (acc: O, v: T) => O) => O;
  }
}

export function map<T, O>(i: Iter<T>, f: (v: T) => O): Iter<O> {
  return {
    next() {
      return i.next().map((value) => f(value));
    },
  };
}

export function filter<T>(i: Iter<T>, f: (v: T) => boolean): Iter<T> {
  return {
    next: () => {
      let result;

      while (true) {
        const next = i.next();
        if (!next.is_some()) {
          result = next;
          break;
        } else if (!f(next.unwrap())) {
          result = next;
          break;
        }
      }
      return result;
    },
  };
}

export function fold<T, O>(i: Iter<T>, init: O,  f: (acc: O, v: T) => O): O {
  let acc = init;
  while (true) {
    const next = i.next();
    if (next.is_some()) {
      acc = f(acc, next.unwrap());
    } else {
      return acc;
    }
  }
  return acc;
}
