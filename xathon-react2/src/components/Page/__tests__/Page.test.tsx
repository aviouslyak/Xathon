import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { DarkModeProvider } from "../../../context/darkModeContext";
import Page from "../Page";

const MockPage: React.FC = () => {
  return (
    <DarkModeProvider>
      <Page>
        <p role="paragraph">Foo</p>
      </Page>
    </DarkModeProvider>
  );
};

describe("<Page />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
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
    render(<MockPage />);
    component = screen.getByTestId("page-wrapper");
  });

  test("renders children correctly", () => {
    const pElem = screen.getByRole("paragraph");
    expect(pElem).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("test renders with class dark when darkMode = true", () => {
    expect(component).toHaveClass("dark");
  });

  test("test renders with no class dark when darkMode = false", () => {
    cleanup();
    localStorage.removeItem("darkModeEnabled");
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<MockPage />);
    component = screen.getByTestId("page-wrapper");
    expect(component).not.toHaveClass("dark");
  });
});
