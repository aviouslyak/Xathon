import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import SearchBar from "../SearchBar";

const MockSearchBar = () => {
  const [queryItems, setQueryItems] = useState<string[]>([]);
  return <SearchBar queryItems={queryItems} setQueryItems={setQueryItems} />;
};

jest.mock("../../../services/contracts/xathonFactory");
describe("<SearchBar />", () => {
  let component: HTMLElement;
  beforeEach(async () => {
    await act(async () => {
      render(<MockSearchBar />);
    });
    component = screen.getByRole("searchbox");
  });
  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("dropdown does not display on default", () => {
    const dropdownContainer = screen.queryByTestId("dropdown-container");
    expect(dropdownContainer).not.toBeInTheDocument();
  });

  test("displays dropdown when searching", () => {
    fireEvent.change(component, { target: { value: "f" } });
    const dropdownContainer = screen.getByTestId("dropdown-container");

    expect(dropdownContainer).toBeInTheDocument();
  });

  test("updates search query when clicking dropdown", () => {
    fireEvent.change(component, { target: { value: "f" } });
    const button = screen.getByText("foo");
    fireEvent.click(button);
    expect(component).toHaveDisplayValue("foo");
  });

  test("bluring input closes dropdown", async () => {
    fireEvent.change(component, { target: { value: "f" } });
    await act(async () => {
      fireEvent.blur(component);
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
  });

  test("dropdown displays one item when entering contract", () => {
    fireEvent.change(component, { target: { value: "f" } });
    const dropdownContainer = screen.getByTestId("dropdown-container");

    expect(dropdownContainer.children.length).toBe(1);
  });
});
