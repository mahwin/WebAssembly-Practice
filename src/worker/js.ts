export const workerInstance = new ComlinkWorker<
  typeof import("../utils/sudokuSolve")
>(new URL("../utils/sudokuSolve", import.meta.url));
