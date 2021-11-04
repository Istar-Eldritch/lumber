/** @noSelf **/
declare namespace string {

  function find(s: string, pattern: string): LuaMultiReturn<[number, number]>;

  function sub(s: string, from: number, to: number): string;
}
