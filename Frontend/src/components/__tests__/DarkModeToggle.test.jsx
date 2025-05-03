import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "../DarkModeToggle";
import { vi } from "vitest";

// Mock localStorage
beforeAll(() => {
  global.Storage.prototype.getItem = vi.fn().mockImplementation((key) => {
    if (key === "theme") {
      return null; // Return null by default or mock the dark mode value
    }
  });
  global.Storage.prototype.setItem = vi.fn();
});

describe("DarkModeToggle", () => {
  it("toggles dark mode on button click", () => {
    // Set light theme initially
    localStorage.setItem("theme", "light");
    render(<DarkModeToggle />);

    const toggleButton = screen.getByLabelText("Toggle Dark Mode");

    // Click to toggle dark mode
    fireEvent.click(toggleButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    // Click again to toggle back to light mode
    fireEvent.click(toggleButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });

  it("updates class on the document element correctly", () => {
    // Set light theme initially
    localStorage.setItem("theme", "light");
    render(<DarkModeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click to toggle dark mode
    fireEvent.click(screen.getByLabelText("Toggle Dark Mode"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Click again to toggle back to light mode
    fireEvent.click(screen.getByLabelText("Toggle Dark Mode"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
