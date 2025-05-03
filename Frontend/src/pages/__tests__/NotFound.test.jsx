import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate, MemoryRouter } from "react-router-dom";
import NotFound from "../NotFound"; // Path to your NotFound component

// Mock useNavigate from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("NotFound Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mock function before each test
    vi.clearAllMocks();
  });

  it("renders the 404 error message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404 error")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you are looking for doesn't exist.")
    ).toBeInTheDocument();
  });
});
