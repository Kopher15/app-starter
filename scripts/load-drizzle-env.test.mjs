import assert from "node:assert/strict";
import { mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const loaderUrl = new URL("./load-drizzle-env.mjs", import.meta.url);

async function loadEnv() {
  await import(`${loaderUrl.href}?test=${crypto.randomUUID()}`);
}

test("loads Drizzle env with shell, .env.local, .env precedence", async () => {
  const originalDirectory = process.cwd();
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const directory = mkdtempSync(join(tmpdir(), "drizzle-env-"));

  try {
    process.chdir(directory);
    writeFileSync(".env", "DATABASE_URL=postgres://from-env\n");
    writeFileSync(".env.local", "DATABASE_URL=postgres://from-local\n");

    delete process.env.DATABASE_URL;
    await loadEnv();
    assert.equal(process.env.DATABASE_URL, "postgres://from-local");

    process.env.DATABASE_URL = "postgres://from-shell";
    await loadEnv();
    assert.equal(process.env.DATABASE_URL, "postgres://from-shell");

    delete process.env.DATABASE_URL;
    unlinkSync(".env.local");
    await loadEnv();
    assert.equal(process.env.DATABASE_URL, "postgres://from-env");
  } finally {
    process.chdir(originalDirectory);
    rmSync(directory, { recursive: true, force: true });

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  }
});
