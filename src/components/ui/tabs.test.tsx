import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from "./tabs";

const tabs = [
  { id: "a", label: "Strength", content: <p>Strength panel</p> },
  { id: "b", label: "Colour", content: <p>Colour panel</p> },
  { id: "c", label: "Shape", content: <p>Shape panel</p> },
];

describe("Tabs", () => {
  it("exposes tab semantics and shows the first panel", () => {
    render(<Tabs label="What changed" tabs={tabs} />);
    expect(screen.getByRole("tablist", { name: "What changed" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Strength" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Strength panel");
  });

  it("supports arrow, Home and End keys with a roving tabindex", async () => {
    const user = userEvent.setup();
    render(<Tabs label="What changed" tabs={tabs} />);

    await user.tab();
    expect(screen.getByRole("tab", { name: "Strength" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Colour" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Colour panel");
    expect(screen.getByRole("tab", { name: "Strength" })).toHaveAttribute("tabindex", "-1");

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Shape" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Strength" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Shape" })).toHaveFocus();
  });
});
