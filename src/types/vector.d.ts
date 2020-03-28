/** @noSelf **/
declare namespace vector {
  type Vector = minetest.Vector3D;
  function direction(p1: Vector, p2: Vector): Vector;
  function distance(p1: Vector, p2: Vector): number;
  function length(v: Vector): number;
  function normalize(v: Vector): Vector;
  function round(v: Vector): Vector;
  function equals(v1: Vector, v2: Vector): boolean;
  function add(v1: Vector, x: Vector | number): Vector;
  function substract(v: Vector, x: Vector | number): Vector;
  function multiply(v: Vector, x: Vector | number): Vector;
  function divide(v: Vector, x: Vector | number): Vector;
}
