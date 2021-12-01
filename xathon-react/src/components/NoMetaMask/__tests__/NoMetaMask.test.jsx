import { render, screen } from "@testing-library/react";
import NoMetaMask from "../NoMetaMask";

describe("<NoMetaMask />", () => {
  test("matches snapshot", () => {
    render(<NoMetaMask />);
    const component = screen.getByTestId("no-meta-mask wrapper");
    expect(component).toMatchSnapshot();
  });
});
