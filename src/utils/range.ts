declare global {

  interface RangeModule {
    setup: (loader: <T> (module: string) => T) => {
      range: (from: number, to: number) => Iter<number>;
    };
  }
}

export function setup(loader: <T> (module: string) => T) {
  const option = loader<OptionModule>('utils/option.lua');
  return {
    range: (from: number, to: number): Iter<number> => {
      let state = from;
      return {
        next: () => {
          if (state < to) {
            const result = option.Some(state);
            state = state + 1;
            return result;
          } else {
            return option.None();
          }
        },
      };
    },
  };
}
