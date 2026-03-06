import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execa } from "execa";
import { test as base } from "vitest";

const it = base.extend<{ market: (args: string[]) => Promise<string> }>({
  // biome-ignore lint/correctness/noEmptyPattern: vitest
  market: async ({}, use) => {
    const dir = await mkdtemp(path.join(tmpdir(), "market-config-"));

    const market = async (args: string[]) => {
      const result = await execa("market", args, {
        env: {
          ...process.env,
          MARKET_CONFIG: dir,
        },
      });

      return result.stdout.trim();
    };

    try {
      await use(market);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  },
});

export { it };
