
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

export function setup(context: any, state: ModSettings): void {
  const array_utils = dofile<ArrayUtils>(`${state.mod_path}/dist/utils/arrays.lua`);
  const boxes = array_utils.merge(
    boxes_for_log(0),
    boxes_for_log(1),
    boxes_for_log(2),
    boxes_for_log(3),
    boxes_for_log(4),
    boxes_for_log(5),
    boxes_for_log(6),
    boxes_for_log(7),
    boxes_for_log(8),
    boxes_for_log(9),
    boxes_for_log(10),
    boxes_for_log(11),
    boxes_for_log(12),
    boxes_for_log(13),
    boxes_for_log(14),
    boxes_for_log(15),
  );

  minetest.register_node(`${state.mod_name}:log_pile`, {
    drawtype: 'nodebox',
    diggable: true,
    node_box: {
      type: 'fixed',
      fixed: boxes,
    },
    tiles: [
      'lumber_log-top.png', 'lumber_log-bottom.png', // top - bottom
      'lumber_log-front.png', 'lumber_log-front.png', // front - back
      'lumber_log-side.png', 'lumber_log-side.png', // sides
    ],
  });
  //
}
