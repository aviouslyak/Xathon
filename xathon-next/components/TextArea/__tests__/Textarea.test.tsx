import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Textarea from "../Textarea";

describe("<Textarea />", () => {
  let component: HTMLElement;
  const setValueMock = jest.fn();
  const handleBlurMock = jest.fn();

  beforeEach(() => {
    render(
      <Textarea
        name="Textarea"
        className="w-screen"
        placeholder="search"
        errorText="error"
      />
    );
    component = screen.getByPlaceholderText(/search/i);
  });

  test("it renders placeholder text", () => {
    expect(component).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("it renders label text", () => {
    const labelText = screen.getByText(/textarea/i);
    expect(labelText).toBeInTheDocument();
  });

  test("it does not render label text if showLabel = false", () => {
    cleanup();
    render(
      <Textarea
        name="Textarea"
        className="w-screen"
        placeholder="search"
        errorText="error"
        showLabel={false}
      />
    );
    const label = screen.queryByText(/textarea/i);
    expect(label).not.toBeInTheDocument();
  });

  test("it renders other label text if labelText is present", () => {
    cleanup();
    render(
      <Textarea
        name="Textarea"
        className="w-screen"
        placeholder="search"
        errorText="error"
        labelText="foo"
      />
    );
    const label = screen.getByText(/foo/i);
    expect(label).toBeInTheDocument();
  });

  test("it does not render label text if showLabel = false and labelText = str", () => {
    cleanup();
    render(
      <Textarea
        name="Textarea"
        className="w-screen"
        placeholder="search"
        errorText="error"
        labelText="foo"
        showLabel={false}
      />
    );
    const label = screen.queryByText(/foo/i);
    expect(label).not.toBeInTheDocument();
  });
  test("renders error text", () => {
    const errorText = screen.getByText("error");
    expect(errorText).toBeInTheDocument();
  });

  test("sets width class on textarea", () => {
    expect(component).toHaveClass("w-screen");
  });
});
