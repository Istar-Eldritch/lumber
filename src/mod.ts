import {helper} from './internal/one';

const MOD_NAME = 'lumber';

const LOG_PILE = `${MOD_NAME}:log_pile`;

const pixel = 0.0313;

const mx = -0.5;
const my = -0.5;
const mz = -0.5;

const gx = 0.5;
const gy = 0.5;
const gz = 0.5;

const log = [
  [mx, my, (mz + 2 * pixel), gx, my + pixel, mz + 6 * pixel] as Box,
  [mx, my + pixel, (mz + pixel), gx, my + 2 * pixel, mz + 7 * pixel] as Box,
  [mx, my + 2 * pixel, mz, gx, my + 6 * pixel, mz + 8 * pixel] as Box,
  [mx, my + 6 * pixel, (mz + pixel), gx, my + 7 * pixel, mz + 7 * pixel] as Box,
  [mx, my + 7 * pixel, (mz + 2 * pixel), gx, my + 8 * pixel, mz + 6 * pixel] as Box,
];

minetest.register_node(LOG_PILE, {
  drawtype: 'nodebox',
  diggable: true,
  node_box: {
    type: 'fixed',
    fixed: log,
  },
  tiles: [
    'lumber_log-side.png', 'lumber_log-side.png', // top - bottom
    'lumber_log-front.png', 'lumber_log-front.png', // front - back
    'lumber_log-side.png', 'lumber_log-side.png', // sides
  ],
});
