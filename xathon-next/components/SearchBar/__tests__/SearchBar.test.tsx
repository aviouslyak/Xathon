import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import React from "react";
import { XathonFactoryReader } from "../../../services/contracts/XathonFactory";
import SearchBar from "../SearchBar";
import Router from "next/router";

const MockSearchBar: React.FC = () => {
  const queryItems = ["foo", "boo", "zoo"];
  return <SearchBar queryItems={queryItems} />;
};

const ADDRESS = "0x0000000000000000000000000000000000000000";
jest.mock("../../../services/contracts/XathonFactory");

describe("<SearchBar />", () => {
  let component: HTMLElement;
  let mockPush: jest.SpyInstance;
  let mockGetContractAddress: jest.SpyInstance;

  beforeEach(async () => {
    render(<MockSearchBar />);
    component = screen.getByRole("searchbox");
    mockGetContractAddress = jest
      .spyOn(XathonFactoryReader.prototype, "getContractAddress")
      .mockImplementation(() => new Promise((resolve) => resolve(ADDRESS)));
    mockPush = jest.spyOn(Router, "push");
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

  test("blurring input closes dropdown", async () => {
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

  test("calls Router.push on submit", async () => {
    fireEvent.change(component, { target: { value: "foo" } });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(`/${ADDRESS}`);
    });
  });

  test("doesn't call Router.push on submit failure", async () => {
    fireEvent.change(component, { target: { value: "f" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("sets errorText on failure", async () => {
    mockGetContractAddress.mockRejectedValueOnce("");
    fireEvent.change(component, { target: { value: "f" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText("Contract not found");
      expect(errorElement).toBeInTheDocument();
    });
  });
});
