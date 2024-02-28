export function strToTwoDArr(str: string) {
  const len = Math.sqrt(str.length);
  const arr = Array.from({ length: len }, (_, i) =>
    str.slice(i * len, (i + 1) * len).split("")
  );
  return arr;
}
