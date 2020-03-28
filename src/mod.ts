import {setup, ModState} from "./log-pile";

const name = 'lumber';
const mod_path = minetest.get_modpath(name);

export const mod_state: ModState = {name, mod_path};

setup(mod_state);
