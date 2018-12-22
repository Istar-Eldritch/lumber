
const pixel = 0.0313;

type Box = minetest.Box;

const mx = -0.5;
const my = -0.5;
const mz = -0.5;

const gx = 0.5;
const gy = 0.5;
const gz = 0.5;

/**
 * Return an array of boxes that shape a log in a 4 x 4 stack
 *
 * 12 13 14 15
 * 08 09 10 11
 * 04 05 06 07
 * 00 01 02 03
 */
function boxes_for_log(position: number): Box[] {
  const column = Math.floor(position / 4);
  const row = position % 4;

  const z = mz + (row * pixel * 8);
  const y = my + (column * pixel * 8);

  if (column % 2 === 0) {
    return [
      [mx, y            , z + 2 * pixel, gx, y + pixel    , z + 6 * pixel] as Box,
      [mx, y + pixel    , z + pixel    , gx, y + 2 * pixel, z + 7 * pixel] as Box,

      [mx, y + 2 * pixel, z            , gx, y + 6 * pixel, z + 8 * pixel] as Box,

      [mx, y + 6 * pixel, z + pixel    , gx, y + 7 * pixel, z + 7 * pixel] as Box,
      [mx, y + 7 * pixel, z + 2 * pixel, gx, y + 8 * pixel, z + 6 * pixel] as Box,
    ];
  }

  return [
    [z + 2 * pixel, y            , mx, z + 6 * pixel, y + pixel    , gx] as Box,
    [z + pixel,     y + pixel    , mx, z + 7 * pixel, y + 2 * pixel, gx] as Box,
    [z,             y + 2 * pixel, mx, z + 8 * pixel, y + 6 * pixel, gx] as Box,
    [z + pixel,     y + 6 * pixel, mx, z + 7 * pixel, y + 7 * pixel, gx] as Box,
    [z + 2 * pixel, y + 7 * pixel, mx, z + 6 * pixel, y + 8 * pixel, gx] as Box,
  ];
}

function get_log_from_pile(mod_name: string, log_count: number, _mt = minetest ) {
  return (
    pos: minetest.Vector3D,
    node: minetest.Node,
    player: minetest.ObjectRef,
  ) => {
    const inventory = player.get_inventory();
    const item = `${mod_name}:log_1`;
    if (inventory.room_for_item('main', item)) {
      const result = inventory.add_item('main', item);
      if (log_count > 1) {
        _mt.set_node(pos, {
          name: `${mod_name}:log_${log_count - 1}`,
        });
      } else {
        _mt.set_node(pos, {name: 'air'});
      }
    }
  };
}

function add_logs_to_pile(mod_name: string, log_count: number, _mt = minetest) {
  return (
    pos: minetest.Vector3D,
    node: minetest.Node,
    player: minetest.ObjectRef,
    stack: minetest.ItemStack,
    pointed_thing: minetest.PointedThing,
  ) => {
    if (stack.get_name() === `${mod_name}:log_1` && log_count < 16) {
      _mt.set_node(pos, {
        name: `${mod_name}:log_${log_count + 1}`,
      });
      stack.set_count(stack.get_count() - 1);
      return stack;
    } else {
      return _mt.item_place_node(stack, player, pointed_thing);
    }
  };
}

export function setup(mod: ModState, _mt = minetest): void {
  const array = mod.load<ArrayModule>(`utils/arrays.lua`);
  const range = mod.load<RangeModule>(`utils/range.lua`).setup(mod.load);
  const iter = mod.load<IterModule>(`utils/iter.lua`);

  iter.for_each(range.range(1, 17), (log_count) => {
    const boxes: Box[] = iter.fold(
      iter.map(range.range(0, log_count), boxes_for_log),
      [],
      (acc: Box[], next: Box[]) => {
        return array.merge(acc, next);
      },
    );

    _mt.register_node(`${mod.name}:log_${log_count}`, {
      stack_max: 16,
      description: 'Log',
      drawtype: 'nodebox',
      paramtype: 'light',
      diggable: true,
      node_box: {
        type: 'fixed',
        fixed: boxes,
      },
      inventory_image: 'log-inventory.png',
      wield_image: 'log-wield.png',
      tiles: [
        'lumber_log-top.png', 'lumber_log-bottom.png', // top - bottom
        'lumber_log-front.png', 'lumber_log-front.png', // front - back
        'lumber_log-side.png', 'lumber_log-side.png', // sides
      ],
      on_punch: get_log_from_pile(mod.name, log_count),
      on_rightclick: add_logs_to_pile(mod.name, log_count),
    });
  });
}
