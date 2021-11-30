import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

describe("<Navbar />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    render(
      <Navbar>
        <p role="paragraph">Test Elem</p>
      </Navbar>
    );
    component = screen.getByRole("navigation");
  });

  test("renders children correctly", () => {
    const pElem = screen.getByRole("paragraph");
    expect(pElem).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
