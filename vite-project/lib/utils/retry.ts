export const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delays: number[] = [250, 500, 1000]): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        const delay = delays[i] ?? delays[delays.length - 1] ?? 500;
        await sleep(delay);
      }
    }
  }
  // Re-throw last error after exhausting attempts
  throw lastErr instanceof Error ? lastErr : new Error('withRetry: failed after attempts');
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label = 'operation'): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutHandle!);
  }
}


