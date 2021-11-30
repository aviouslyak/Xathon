import { render, screen } from "@testing-library/react";
import TitleHeader from "../TitleHeader";

describe("<TitleHeader />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    render(<TitleHeader text="New Header" />);
    component = screen.getByRole("heading");
  });

  test("renders correctly", () => {
    const componentRefind = screen.getByText(/New Header/i);
    expect(componentRefind).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
