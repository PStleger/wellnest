import { describeColor, hexToHsl, hslToHex, isHexColor } from "./colors";

describe("colour helpers", () => {
  it("round-trips hex and HSL within rounding", () => {
    for (const hex of ["#e11d48", "#0f766e", "#7c3aed", "#facc15"]) {
      const { h, s, l } = hexToHsl(hex);
      const back = hslToHex(h, s, l);
      const diff = [1, 3, 5].map((i) =>
        Math.abs(parseInt(back.slice(i, i + 2), 16) - parseInt(hex.slice(i, i + 2), 16)),
      );
      expect(Math.max(...diff)).toBeLessThanOrEqual(3);
    }
  });

  it("names swatches and arbitrary colours in plain language", () => {
    expect(describeColor("#e11d48")).toBe("red");
    expect(describeColor("#1e3a8a")).toBe("deep blue");
    expect(describeColor("#fafafa")).toBe("near white");
    expect(describeColor("#808080")).toBe("grey");
  });

  it("validates hex colours strictly", () => {
    expect(isHexColor("#A1b2C3")).toBe(true);
    expect(isHexColor("red")).toBe(false);
    expect(isHexColor("#fff")).toBe(false);
  });
});
