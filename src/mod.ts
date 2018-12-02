const MOD_NAME = 'lumber';

const LOG_PILE = `${MOD_NAME}:log_pile`;

const pixel = 0.0313;

const n = 0;

const mx = -0.5;
const my = -0.5;
const mz = -0.5;

const gx = 0.5;
const gy = 0.5;
const gz = 0.5;

function reduce<T, O>(arr: T[], acc: O, f: (acc: O, next: T) => O): O {
  let _acc = acc;
  for (const item of arr) {
    _acc = f(_acc, item);
  }
  return _acc;
}

function merge<T>(...args: T[][]): T[] {
  return reduce(args, [] as T[], (acc, next) => {
    return reduce(next, acc, (_acc, _next) => {
      table.insert(_acc, _next);
      return _acc;
    });
  });
}

function boxes_for_log(position: number): Box[] {
  const column = Math.floor(position / 4);
  const row = position % 4;

  const z = mz + (row * pixel * 8);
  const y = my + (column * pixel * 8);

  return [
    [mx, y            , z + 2 * pixel, gx, y + pixel    , z + 6 * pixel] as Box,
    [mx, y + pixel    , z + pixel    , gx, y + 2 * pixel, z + 7 * pixel] as Box,
    [mx, y + 2 * pixel, z            , gx, y + 6 * pixel, z + 8 * pixel] as Box,
    [mx, y + 6 * pixel, z + pixel    , gx, y + 7 * pixel, z + 7 * pixel] as Box,
    [mx, y + 7 * pixel, z + 2 * pixel, gx, y + 8 * pixel, z + 6 * pixel] as Box,
  ];
}

const boxes = merge(
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

minetest.register_node(LOG_PILE, {
  drawtype: 'nodebox',
  diggable: true,
  node_box: {
    type: 'fixed',
    fixed: boxes,
  },
  tiles: [
    'lumber_log-side.png', 'lumber_log-side.png', // top - bottom
    'lumber_log-front.png', 'lumber_log-front.png', // front - back
    'lumber_log-side.png', 'lumber_log-side.png', // sides
  ],
});
