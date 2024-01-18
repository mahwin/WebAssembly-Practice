export function sleep(milliseconds: number) {
  return function () {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
}
