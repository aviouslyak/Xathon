import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("<Layout />", () => {
  let component: HTMLElement;
  beforeEach(() => {
    render(
      <Layout>
        <p data-testid="test-child">Foo</p>
      </Layout>
    );
    component = screen.getByTestId("page-wrapper");
  });

  test("layout matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("layout renders children", () => {
    const child = screen.getByTestId("test-child");
    expect(child).toBeInTheDocument();
  });
});
