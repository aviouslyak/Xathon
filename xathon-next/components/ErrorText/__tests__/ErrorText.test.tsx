import { cleanup, render, screen } from "@testing-library/react";
import ErrorText from "../ErrorText";

describe("<ErrorText />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    render(<ErrorText className="class">foo</ErrorText>);
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
    render(<ErrorText className="class">foo</ErrorText>);
    component = screen.getByText("foo");
    expect(component).not.toHaveClass("undefined");
  });
});
