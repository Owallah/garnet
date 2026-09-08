import "server-only";

/**
 * Fixed-window rate limiter.
 *
 * The in-memory map only holds within a single serverless instance, so it is
 * a development convenience, not a production control. Set the Upstash env
 * vars to get a shared window across instances; `limit()` upgrades itself
 * automatically when they are present.
 */
type Result = { success: boolean; remaining: number; reset: number };

const WINDOW_MS = 60_000;
const memory = new Map<string, { count: number; reset: number }>();

function memoryLimit(key: string, max: number): Result {
  const now = Date.now();
  const entry = memory.get(key);

  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + WINDOW_MS });
    return { success: true, remaining: max - 1, reset: now + WINDOW_MS };
  }

  entry.count += 1;
  return {
    success: entry.count <= max,
    remaining: Math.max(0, max - entry.count),
    reset: entry.reset,
  };
}

async function upstashLimit(key: string, max: number): Promise<Result> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const window = Math.floor(Date.now() / WINDOW_MS);
  const redisKey = `ratelimit:${key}:${window}`;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, "120"],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    // Fail open rather than block real enquiries on an infrastructure fault.
    return { success: true, remaining: max, reset: (window + 1) * WINDOW_MS };
  }

  const [incr] = (await response.json()) as Array<{ result: number }>;
  const count = incr?.result ?? 1;
  return {
    success: count <= max,
    remaining: Math.max(0, max - count),
    reset: (window + 1) * WINDOW_MS,
  };
}

export async function limit(key: string, max = 5): Promise<Result> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await upstashLimit(key, max);
    } catch {
      return memoryLimit(key, max);
    }
  }
  return memoryLimit(key, max);
}

/** Best-effort client identity for rate limiting. Never used for anything else. */
export function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  return `${scope}:${ip}`;
}
