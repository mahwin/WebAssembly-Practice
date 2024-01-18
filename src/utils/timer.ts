type Fn = () => Promise<unknown>;

export async function timer(fn: Fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  return end - start;
}
