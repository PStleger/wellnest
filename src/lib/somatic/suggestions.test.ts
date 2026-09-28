import { suggestNext } from "./suggestions";

const ids = (...args: Parameters<typeof suggestNext>) =>
  suggestNext(...args).map((suggestion) => suggestion.id);

describe("suggestNext", () => {
  it("offers calm first when a strong feeling hasn't eased", () => {
    expect(ids({ emotions: ["anxious"], intensity: 8, hour: 14, eased: false })).toEqual([
      "calm",
      "ground",
      "journal",
    ]);
  });

  it("doesn't push calm when the feeling already eased", () => {
    expect(ids({ emotions: ["anxious"], intensity: 8, hour: 14, eased: true })).not.toContain("calm");
  });

  it("suggests winding down late at night", () => {
    expect(ids({ emotions: ["tired"], intensity: 3, hour: 23, eased: true })[0]).toBe("sleep");
  });

  it("meets loneliness and numbness with connection and movement", () => {
    const result = ids({ emotions: ["lonely", "numb"], intensity: 4, hour: 12, eased: false });
    expect(result).toContain("connect");
    expect(result.some((id) => id === "rain" || id === "move")).toBe(true);
  });

  it("always returns three distinct suggestions", () => {
    for (const intensity of [0, 5, 10]) {
      const result = ids({ emotions: [], intensity, hour: 10, eased: false });
      expect(result).toHaveLength(3);
      expect(new Set(result).size).toBe(3);
    }
  });
});
