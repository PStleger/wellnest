import { sensationSchema } from "./types";

const valid = { region: "chest", color: "#e11d48", shape: "knot", texture: "prickly", intensity: 7 };

describe("sensationSchema", () => {
  it("accepts a complete sensation", () => {
    expect(sensationSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects unknown regions, bad colours and out-of-range intensity", () => {
    expect(sensationSchema.safeParse({ ...valid, region: "elbow" }).success).toBe(false);
    expect(sensationSchema.safeParse({ ...valid, color: "javascript:alert(1)" }).success).toBe(false);
    expect(sensationSchema.safeParse({ ...valid, intensity: 11 }).success).toBe(false);
  });

  it("requires path data for drawn shapes, and only safe path commands", () => {
    expect(sensationSchema.safeParse({ ...valid, shape: "custom" }).success).toBe(false);
    expect(
      sensationSchema.safeParse({ ...valid, shape: "custom", customPath: "M10 10Q20 20 30 30" }).success,
    ).toBe(true);
    expect(
      sensationSchema.safeParse({ ...valid, shape: "custom", customPath: '"/><script>alert(1)</script>' })
        .success,
    ).toBe(false);
  });
});
