import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "../Dropdown";

const returnedItems: string[] = [];
for (let index = 0; index < 4; index++) {
  returnedItems.push(`Item ${index}`);
}
returnedItems.push("0x0000");
returnedItems.push("Will not find");

const setQueryMock = jest.fn();

describe("<Dropdown />", () => {
  let component: HTMLElement;
  let items: HTMLElement[];
  beforeEach(() => {
    render(<Dropdown returnedItems={returnedItems} setQuery={setQueryMock} />);
    component = screen.getByTestId("dropdown-container");
    items = screen.getAllByRole("button");
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  test("has five items", () => {
    expect(items.length).toBe(5);
  });

  test("does not have six items", () => {
    expect(items.length).not.toBe(6);
  });

  test("click on button fires setQuery", () => {
    const firstItem = items[0];
    fireEvent.click(firstItem);
    expect(setQueryMock).toHaveBeenCalledWith("Item 0");
  });

  test("displays contract text", () => {
    const contractItem = screen.getByText("Contract with address '0x0000'");
    expect(contractItem).toBeInTheDocument();
  });
  test("final item has correct class 'rounded-b-lg'", () => {
    const lastItem = items[items.length - 1];
    expect(lastItem).toHaveClass("rounded-b-lg");
  });

  test("other items does not have class 'rounded-b-lg'", () => {
    const middleItem = items[2];
    expect(middleItem).not.toHaveClass("rounded-b-lg");
  });
});
