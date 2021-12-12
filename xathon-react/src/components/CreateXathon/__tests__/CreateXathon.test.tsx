import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateXathon from "../CreateXathon";
import XathonFactory from "../../../services/contracts/xathonFactory";
import { TransactionReceipt } from "web3-core";

jest.mock("../../../services/contracts/xathonFactory");
const ADDRESS = "0x0000000000000000000000000000000000000000";
describe("foo", () => {
  let form: HTMLElement;
  let submit: HTMLElement;
  let addressInput: HTMLElement;
  let nameInput: HTMLElement;
  let descriptionInput: HTMLElement;
  let unitInput: HTMLElement;
  let minimumDepositInput: HTMLElement;
  let mockSetAddress: jest.Mock;

  beforeEach(() => {
    mockSetAddress = jest.fn().mockReturnValue(ADDRESS);
    render(<CreateXathon setAddress={mockSetAddress} />);
    form = screen.getByTestId("form");
    addressInput = screen.getByLabelText("Donation recipient address");
    nameInput = screen.getByLabelText("Xathon name");
    descriptionInput = screen.getByLabelText("Description");
    unitInput = screen.getByLabelText("Unit for xathon");
    minimumDepositInput = screen.getByLabelText("Minimum deposit");
    submit = screen.getByRole("button");
  });

  test("matches snapshot", () => {
    expect(form).toMatchSnapshot();
  });

  test("address input is required", async () => {
    fireEvent.change(nameInput, { target: { value: "Foo " } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });

    fireEvent.click(submit);
    await waitFor(() => {
      const errorMessage = screen.getByText("*Address is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("address input must be of type address", async () => {
    fireEvent.change(addressInput, { target: { value: "not valid" } });
    fireEvent.change(nameInput, { target: { value: "Foo " } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText("*Must by an ethereum address");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("name input is required", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText("*Name is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("name input can be less than 50 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a".repeat(30) } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.queryByText("*Name is required");
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("name input can be 50 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a".repeat(50) } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.queryByText("*Name is required");
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("name input can not be more than 50 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a".repeat(51) } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "*Must be less than 50 characters in length"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("description textarea is not required", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit input can be less than 20 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "u".repeat(10) } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit input can be 20 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "u".repeat(20) } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit input can not be more than 20 characters", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(descriptionInput, { target: { value: "Foo " } });
    fireEvent.change(unitInput, { target: { value: "u".repeat(21) } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("minimumDeposit input is not required", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles " } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("successfully calls deployXathon with correct values", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles" } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(XathonFactory.deployXathon).toHaveBeenCalledTimes(1);
      expect(XathonFactory.deployXathon).toHaveBeenCalledWith({
        address: ADDRESS,
        name: "foo",
        description: "foo",
        unit: "miles",
        minimumDeposit: 0,
      });
    });
  });

  test("minimumDeposit has correct default value", () => {
    const minimumDepositRefound = screen.getByDisplayValue(0);
    expect(minimumDepositRefound).toBeInTheDocument();
  });

  test("description, name, unit, and address have default values", () => {
    const defaults = screen.getAllByDisplayValue("");
    expect(defaults.length).toBe(4);
  });

  test("Changes button text after submitting", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles" } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const buttonRefound = screen.getByText(/create/i);
      expect(buttonRefound).toBeInTheDocument();
    });
  });

  test("Sets loading text when loading", async () => {
    const mockFn = jest.spyOn(XathonFactory, "deployXathon");
    mockFn.mockImplementation(async () => {
      return await new Promise(() => {});
    });

    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles" } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const buttonRefound = screen.getByText(/submitting/i);
      expect(buttonRefound).toBeInTheDocument();
    });
  });

  test("Error is shown", async () => {
    const mockFn = jest.spyOn(XathonFactory, "deployXathon");
    mockFn.mockImplementation(async () => {
      return await new Promise((resolve, reject) => {
        reject();
      });
    });

    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles" } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorText = screen.getByText(
        "Some error has occurred. Check that you confirmed the transaction in MetaMask, and that the contract name is unique"
      );
      expect(errorText).toBeInTheDocument();
    });
  });

  test("Error is not shown by default", () => {
    const errorText = screen.queryByText(
      "Some error has occurred. Check that you confirmed the transaction in MetaMask, and that the contract name is unique"
    );
    expect(errorText).not.toBeInTheDocument();
  });

  test("calls setAddress with address on success", async () => {
    fireEvent.change(addressInput, { target: { value: ADDRESS } });
    fireEvent.change(nameInput, { target: { value: "foo" } });
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    fireEvent.change(unitInput, { target: { value: "miles" } });
    fireEvent.change(minimumDepositInput, { target: { value: 0 } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockSetAddress).toHaveBeenCalled();
      expect(mockSetAddress).toHaveBeenCalledWith(ADDRESS);
    });
  });
});
