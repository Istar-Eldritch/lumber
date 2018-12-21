
declare global {
  interface Option<T> {
    map: <O> (f: (t: T) => O) => Option<O>;
    or_else: (f: () => Option<T>) => Option<T>;
    unwrap: () => T;
    unwrap_or_else: (value: T) => T;
    is_some: () => boolean;
  }

  interface OptionModule {
    Some: <T> (value: T) => Option<T>;
    None: <T> () => Option<T>;
  }
}

export function Some<T>(value: T): Option<T> {
  return {
    map: <O> (f: (o: T) => O): Option<O> => {
      return Some(f(value));
    },
    or_else: () => Some(value),
    unwrap: () => value,
    unwrap_or_else: () => value,
    is_some: () => true,
  };
}

export function None<T>(): Option<T> {
  return {
    map: <O> (f: (o: T) => O): Option<O> => {
      return None();
    },
    or_else: (f: () => Option<T>) => f(),
    unwrap: () => {
      throw 'Tried to unwrap a none optional';
    },
    unwrap_or_else: (value) => value,
    is_some: () => false,
  };
}
