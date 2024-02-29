// @ts-expect-error ts-nocheck
import Module from "../wasm/sudoku_solve.js";

export async function sudokuSolve(problem: string) {
  const instance = await Module();
  const sudoku_solve = instance.cwrap("sudoku_solve", "string", ["string"]);
  return sudoku_solve(problem);
}
