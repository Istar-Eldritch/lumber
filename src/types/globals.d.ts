declare global {
  /**
   *  Helper function which dumps a human-readable version of a value.
   *  If the value is simple and well-formed, this also produces syntax which could be used directly in Lua source code.
   *
   *  Parameters:
   *
   *      obj — The table or other value to print.
   *      indent — The indent field specifies a indentation string,
   *               it defaults to a tab. Use the empty string to disable indentation.
   *
   *  For tables this performs a recursive deep traversal.
   *  Loops (such as the table containing a reference to itself) are detected,
   *  keeping the function from looping infinitely.
   *  Values that have already been seen are printed as <circular reference>.
   *
   *  For values that cannot be readily printed in Lua syntax,
   *  another placeholder such as <userdata> or <function> is printed.
   */
  function dump(obj: any, indent?: number): string;

  /**
   *  Returns object serialized as a string, displaying values in a line-per-value format.
   */
  function dump2(obj: any): string;

  /**
   *  Loads and runs the given file.
   */
  function dofile<T>(path: string): T;

  function debug(...args: any[]): void;

  function print(...args: any[]): void;
}

export {};
