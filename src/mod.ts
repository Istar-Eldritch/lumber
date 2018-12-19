
declare global {
  interface ModSettings {
    mod_name: string;
    mod_path: string;
  }

  interface ModModule {
    setup(state: ModSettings): void;
  }
}

const mod_name = 'lumber';
const mod_path = minetest.get_modpath(mod_name);

export const mod_settings = {mod_name, mod_path};

const logPile = dofile<ModModule>(`${mod_path}/dist/log-pile.lua`);

logPile.setup(mod_settings);
