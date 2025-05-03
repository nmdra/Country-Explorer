import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../CountryCard";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCountry = {
  cca3: "FRA",
  name: {
    common: "France",
    official: "French Republic",
  },
  flags: {
    png: "https://flagcdn.com/w320/fr.png",
    alt: "Flag of France",
  },
  capital: ["Paris"],
};

describe("CountryCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders country data correctly", () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("French Republic")).toBeInTheDocument();
    expect(screen.getByAltText("Flag of France")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });

  it("navigates to country details on click", () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("France"));
    expect(mockNavigate).toHaveBeenCalledWith("/country/FRA");
  });

  it("handles missing capital gracefully", () => {
    const countryNoCapital = { ...mockCountry, capital: undefined };

    render(
      <MemoryRouter>
        <CountryCard country={countryNoCapital} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Paris")).not.toBeInTheDocument();
  });
});
