/** @noSelf **/
declare namespace table {
  function insert<T>(list: T[], value: T): void;
  function insert<T>(list: T[], position: number, value: T): void;
  function sort<T>(list: T[], comp?: (e1: T, e2: T) => boolean): void;
}
