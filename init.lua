
local MOD_NAME="lumber"

-- Load the core mod logic
dofile(minetest.get_modpath(MOD_NAME).."/mod.lua")
package.preload["mod"]()
