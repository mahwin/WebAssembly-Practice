export const jsWorker = new ComlinkWorker<
  typeof import("../utils/sudokuSolve")
>(new URL("../utils/sudokuSolve", import.meta.url));

export type Worker = typeof jsWorker;
