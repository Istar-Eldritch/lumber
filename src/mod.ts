
declare global {
  interface ModState {
    name: string;
    mod_path: string;
    load: <T>(module: string) => T;
  }

  interface ModModule {
    setup: (state: ModState) => void;
  }
}

const name = 'lumber';
const mod_path = minetest.get_modpath(name);

function load<T>(module: string): T {
  return dofile<T>(`${mod_path}/dist/${module}`);
}

export const mod_state = {name, mod_path, load};

const logPile = load<ModModule>(`log-pile.lua`);

logPile.setup(mod_state);
