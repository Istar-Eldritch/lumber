/** @noSelf **/
declare namespace math {
  function abs(n: number): number;

  function acos(n: number): number;
  function asin(n: number): number;

  function atan(n: number): number;

  function ceil(n: number): number;
  function floor(n: number): number;

  function cos(n: number): number;
  function sin(n: number): number;
  function tan(n: number): number;

  function deg(n: number): number;
  function rad(n: number): number;

  function exp(n: number): number;
  function log(n: number): number;

  function min(n1: number, n2: number): number;
  function max(n1: number, n2: number): number;

  /** @tupleReturn */
  function modf(n: number): [number, number];

  function sqrt(n: number): number;

  function random(n1?: number, n2?: number): number;

  function randomseed(seed: any): number;

  const huge: number;

  const pi: number;
}
