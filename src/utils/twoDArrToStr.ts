type Arr = unknown[][];

export function twoDArrToStr(arr: Arr) {
  return arr.map((row) => row.join("")).join("");
}
