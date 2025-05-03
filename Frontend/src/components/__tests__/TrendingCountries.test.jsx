import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrendingCountries from "../TrendingCountries";
import { vi } from "vitest";

// Mock fetch
global.fetch = vi.fn();

const mockTrending = [
  { cca3: "USA", count: 20 },
  { cca3: "FRA", count: 15 },
];

const mockCountryData = [
  {
    cca3: "USA",
    name: { common: "United States" },
    flags: { png: "usa-flag.png" },
  },
  {
    cca3: "FRA",
    name: { common: "France" },
    flags: { png: "france-flag.png" },
  },
];

describe("TrendingCountries", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it("renders trending countries after loading", async () => {
    // First call: trending API
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ trending: mockTrending }),
    });

    // Second call: REST Countries API
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockCountryData),
    });

    render(
      <MemoryRouter>
        <TrendingCountries />
      </MemoryRouter>
    );

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    const flags = screen.getAllByRole("img");
    expect(flags).toHaveLength(2);
    expect(flags[0]).toHaveAttribute("src", "usa-flag.png");
    expect(flags[1]).toHaveAttribute("src", "france-flag.png");
  });

  it("handles fetch error gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch trending"));
    render(
      <MemoryRouter>
        <TrendingCountries />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Top Searched Countries Today/i)
      ).toBeInTheDocument()
    );
  });
});
