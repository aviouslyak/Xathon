import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { resolveProjectReferencePath } from "typescript";
import XathonFactory from "../../../services/contracts/xathonFactory";
import SearchBar from "../SearchBar";

const ADDRESS = "0x0000000000000000000000000000000000000000";

interface mockProps {
  mockFn: jest.Mock;
}

const MockSearchBar: React.FC<mockProps> = ({ mockFn }) => {
  const [queryItems, setQueryItems] = useState<string[]>([]);
  return (
    <SearchBar
      queryItems={queryItems}
      setQueryItems={setQueryItems}
      setContractAddress={mockFn}
    />
  );
};

jest.mock("../../../services/contracts/xathonFactory");
describe("<SearchBar />", () => {
  let component: HTMLElement;
  let mockSetContractAddress: jest.Mock;
  beforeEach(async () => {
    mockSetContractAddress = jest.fn();
    await act(async () => {
      render(<MockSearchBar mockFn={mockSetContractAddress} />);
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

  test("calls mockFn on submit", async () => {
    fireEvent.change(component, { target: { value: "foo" } });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetContractAddress).toHaveBeenCalled();
      expect(mockSetContractAddress).toHaveBeenCalledWith(ADDRESS);
    });
  });

  test("doesn't call mockFn on submit failure", async () => {
    fireEvent.change(component, { target: { value: "f" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetContractAddress).not.toHaveBeenCalled();
    });
  });

  test("sets errorText on failure", async () => {
    jest
      .spyOn(XathonFactory, "getAddress")
      .mockReturnValue(new Promise((resolve, reject) => reject()));
    fireEvent.change(component, { target: { value: "f" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText("Contract not found");
      expect(errorElement).toBeInTheDocument();
    });
  });
});
