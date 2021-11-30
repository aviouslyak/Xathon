import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input";

describe("<Input />", () => {
  let component: HTMLElement;

  const renderInput = (dropdownActive: boolean, icon = true) => {
    render(
      <Input
        dropdownActive={dropdownActive}
        icon={icon ? <AiOutlineSearch data-testid="icon" /> : null}
        width="w-screen"
        placeholder="Search"
        errorText="error"
        name="label"
        className="foo"
      />
    );
  };

  beforeEach(() => {
    renderInput(false);
    component = screen.getByPlaceholderText(/Search/i);
  });

  test("it renders placeholder text", () => {
    expect(component).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("it renders label", () => {
    const labelText = screen.getByText(/label/i);
    expect(labelText).toBeInTheDocument();
  });

  test("renders error text", () => {
    const errorText = screen.getByText("error");
    expect(errorText).toBeInTheDocument();
  });

  test("renders icon", () => {
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  test("sets width on div", () => {
    const div = screen.getByTestId("input-wrapper");
    expect(div).toHaveClass("w-screen");
  });

  test("dropdown not active has classes 'rounded-lg'", () => {
    expect(component).toHaveClass("rounded-lg");
  });

  test("dropdown active has classes 'rounded-t-lg border-b-2 responsive-border-color'", () => {
    cleanup();
    renderInput(true);
    component = screen.getByPlaceholderText(/Search/i);
    expect(component).toHaveClass("rounded-t-lg");
    expect(component).toHaveClass("border-b-2");
    expect(component).toHaveClass("responsive-border-color");
  });

  test("input has correct right padding with icon", () => {
    cleanup();
    renderInput(false);
    component = screen.getByPlaceholderText(/Search/i);
    expect(component).toHaveClass("pr-10");
  });

  test("input has correct right padding without icon", () => {
    cleanup();
    renderInput(false, false);
    component = screen.getByPlaceholderText(/Search/i);
    expect(component).toHaveClass("pr-2");
  });

  test("input renders additional classes on input element", () => {
    expect(component).toHaveClass("foo");
  });
});
