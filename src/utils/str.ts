declare global {
  interface StrModuleSetup {
    setup: (loader: <T> (module: string) => T) => StrModule;
  }
  interface StrModule {
    find: (s: string, pattern: string) => Option<{from: number, to: number}>;
  }
}

export function setup(load: <T>(s: string) => T): StrModule {
  const option = load<OptionModule>('utils/option.lua');
  return {
    find: (s: string, pattern: string): Option<{from: number, to: number}> => {
      const [from, to] = string.find(s, pattern);
      if (from && to) {
        return option.Some({from, to});
      } else {
        return option.None();
      }
    },
  };
}
