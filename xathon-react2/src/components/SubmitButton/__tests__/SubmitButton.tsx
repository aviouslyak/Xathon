import { render, screen } from "@testing-library/react";
import SubmitButton from "../SubmitButton";

describe("<SubmitButton />", () => {
  beforeEach(() => {
    render(
      <SubmitButton>
        <p>foo</p>
      </SubmitButton>
    );
  });

  test("matches snapshot", () => {
    const submitComponent = screen.getByRole("button");
    expect(submitComponent).toMatchSnapshot();
  });

  test("renders children", () => {
    const pElement = screen.getByText(/foo/i);
    expect(pElement).toBeInTheDocument();
  });
});
