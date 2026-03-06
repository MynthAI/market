import { describe, expect } from "vitest";
import { it } from "./base.js";

describe("market login", () => {
  it("prints help in JSON format", async ({ market }) => {
    const stdout = await market(["-j", "--help"]);
    const result = JSON.parse(stdout);
    expect(result.status).toBe("ok");
    expect(result.result.help).toContain("login");
  });

  it("rejects invalid email", async ({ market }) => {
    const result = await market(["login", "request", "notanemail"]).catch(
      (e) => e.stderr,
    );
    expect(result).toContain("error");
  });
});
