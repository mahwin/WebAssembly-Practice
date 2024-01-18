export function deepCopyArr2D<T>(arr: T[][]) {
  return arr.map((row) => [...row]);
}
