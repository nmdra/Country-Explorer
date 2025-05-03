import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the footer with correct text", () => {
    render(<Footer />);

    // Check for the copyright text
    const copyrightText = screen.getByText(
      /© 2025 Country Explorer. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("applies the correct styles for light mode", () => {
    render(<Footer />);

    // Check if the footer has the expected classes for light mode
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("text-center");
    expect(footer).toHaveClass("bg-gray-100");
  });

  it("applies the correct styles for dark mode", () => {
    render(<Footer />);

    // Set dark mode classes
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("dark:bg-gray-900");
    expect(footer).toHaveClass("dark:text-gray-300");
  });
});
