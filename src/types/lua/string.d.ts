/** @noSelf **/
declare namespace string {

  /** @tupleReturn */
  function find(s: string, pattern: string): [number, number];

  function sub(s: string, from: number, to: number): string;
}
