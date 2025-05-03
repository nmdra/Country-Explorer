import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../SearchBar";
import { vi } from "vitest";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Dummy country data
const mockSuggestions = [
  {
    cca3: "FRA",
    name: { common: "France" },
  },
  {
    cca3: "ESP",
    name: { common: "Spain" },
  },
];

describe("SearchBar", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    localStorage.clear();
  });

  it("renders input field", () => {
    render(
      <MemoryRouter>
        <SearchBar searchTerm="" setSearchTerm={() => {}} suggestions={[]} />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Search countries...")
    ).toBeInTheDocument();
  });

  it("shows suggestions on input and navigates on click", () => {
    const setSearchTerm = vi.fn();

    render(
      <MemoryRouter>
        <SearchBar
          searchTerm="fra"
          setSearchTerm={setSearchTerm}
          suggestions={mockSuggestions}
        />
      </MemoryRouter>
    );

    const franceItem = screen.getByText("France");
    expect(franceItem).toBeInTheDocument();

    fireEvent.mouseDown(franceItem);
    expect(setSearchTerm).toHaveBeenCalledWith("France");
    expect(mockNavigate).toHaveBeenCalledWith("/country/FRA");
  });

  it("navigates with arrow keys and enter", () => {
    let searchTerm = "sp";
    const setSearchTerm = vi.fn((val) => {
      searchTerm = val;
    });

    render(
      <MemoryRouter>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={mockSuggestions}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search countries...");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(setSearchTerm).toHaveBeenCalledWith("France");
    expect(mockNavigate).toHaveBeenCalledWith("/country/FRA");
  });
});
