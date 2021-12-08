import { cleanup, render, screen } from "@testing-library/react";
import ErrorText from "../ErrorText";

describe("<ErrorText />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    render(<ErrorText text="foo" className="class" />);
    component = screen.getByText("foo");
  });

  test("renders text", () => {
    expect(component).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("renders className", () => {
    expect(component).toHaveClass("class");
  });

  test("does not have className undefined by default", () => {
    cleanup();
    render(<ErrorText text="foo" />);
    component = screen.getByText("foo");
    expect(component).not.toHaveClass("undefined");
  });
});
