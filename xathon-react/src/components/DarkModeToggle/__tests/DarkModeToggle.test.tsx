import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { DarkModeProvider } from "../../../context/darkModeContext";
import DarkModeToggle from "../DarkModeToggle";

const MockToggle: React.FC = () => {
  return (
    <DarkModeProvider>
      <DarkModeToggle />
    </DarkModeProvider>
  );
};

describe("<DarkModeToggle />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    localStorage.removeItem("darkModeEnabled");
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<MockToggle />);
    component = screen.getByRole("button");
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("displays correct icon on default", () => {
    const sunIcon = screen.getByTestId("darkModeIcon-sun");
    expect(sunIcon).toBeInTheDocument();
  });

  test("only displays sun icon when on default", () => {
    const moonIcon = screen.queryByTestId("darkModeIcon-moon");
    expect(moonIcon).not.toBeInTheDocument();
  });

  test("swaps displayed icon when clicked", () => {
    fireEvent.click(component);
    const moonIcon = screen.getByTestId("darkModeIcon-moon");
    expect(moonIcon).toBeInTheDocument();
  });

  test("removes previously displayed icon when clicked", () => {
    fireEvent.click(component);
    const sunIcon = screen.queryByTestId("darkModeIcon-sun");
    expect(sunIcon).not.toBeInTheDocument();
  });

  test("updates localStorage when clicked", () => {
    fireEvent.click(component);
    expect(localStorage.getItem("darkModeEnabled")).toBe("false");
  });
});
