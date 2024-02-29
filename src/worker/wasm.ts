export const wasmWorker = new ComlinkWorker<typeof import("./solve")>(
  new URL("./solve", import.meta.url)
);
