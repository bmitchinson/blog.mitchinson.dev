const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function withNotionRetry(operation, description) {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const statusCode = error?.response?.statusCode || error?.statusCode;
      const shouldRetry = statusCode === 429 || statusCode >= 500;

      if (!shouldRetry || attempt === maxAttempts) {
        throw error;
      }

      const retryAfter = Number(error?.response?.headers?.["retry-after"]);
      const retryAfterMs = Number.isFinite(retryAfter) ? retryAfter * 1000 : 0;
      const backoffMs = retryAfterMs || 1000 * attempt ** 2;

      console.warn(
        `Notion request failed with ${statusCode} while ${description}; retrying in ${backoffMs}ms (${attempt}/${maxAttempts})`
      );

      await sleep(backoffMs);
    }
  }
}
