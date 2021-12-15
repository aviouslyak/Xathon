import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateXathon from "../CreateXathon";
import XathonFactory from "../../../services/contracts/xathonFactory";
import { TransactionReceipt } from "web3-core";
import Router from "next/router";

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
  let spiedDeployXathon: jest.SpyInstance<Promise<TransactionReceipt>>;
  let spiedRouterPush: jest.SpyInstance;

  const fillAndSubmit = ({
    address = ADDRESS,
    name = "Foo",
    description = "Foo",
    unit = "miles",
    minimumDeposit = 0,
  }: {
    address?: string | null;
    name?: string | null;
    description?: string | null;
    unit?: string | null;
    minimumDeposit?: number | null;
  }) => {
    address && fireEvent.change(addressInput, { target: { value: address } });
    name && fireEvent.change(nameInput, { target: { value: name } });
    description &&
      fireEvent.change(descriptionInput, { target: { value: description } });
    unit && fireEvent.change(unitInput, { target: { value: unit } });
    minimumDeposit &&
      fireEvent.change(minimumDepositInput, {
        target: { value: minimumDeposit },
      });
    fireEvent.click(submit);
  };
  beforeEach(() => {
    render(<CreateXathon />);
    form = screen.getByTestId("form");
    addressInput = screen.getByLabelText("Donation recipient address");
    nameInput = screen.getByLabelText("Xathon name");
    descriptionInput = screen.getByLabelText("Description");
    unitInput = screen.getByLabelText("Unit for xathon");
    minimumDepositInput = screen.getByLabelText("Minimum deposit");
    submit = screen.getByRole("button");

    spiedDeployXathon = jest.spyOn(XathonFactory.prototype, "deployXathon");
    spiedRouterPush = jest.spyOn(Router, "push");
  });

  test("matches snapshot", () => {
    expect(form).toMatchSnapshot();
  });

  test("address field is required", async () => {
    fillAndSubmit({ address: null });
    await waitFor(() => {
      const errorMessage = screen.getByText("*Address is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("address field must be of type ethereum address", async () => {
    fillAndSubmit({ address: "not valid" });

    await waitFor(() => {
      const errorMessage = screen.getByText("*Must by an ethereum address");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("name field is required", async () => {
    fillAndSubmit({ name: null });

    await waitFor(() => {
      const errorMessage = screen.getByText("*Name is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("name field can be less than 50 characters", async () => {
    fillAndSubmit({ name: "a".repeat(30) });

    await waitFor(() => {
      const errorMessage = screen.queryByText("*Name is required");
      expect(errorMessage).not.toBeInTheDocument();
      expect(spiedDeployXathon).toHaveBeenCalled();
    });
  });

  test("name field can be 50 characters", async () => {
    fillAndSubmit({ name: "a".repeat(50) });

    await waitFor(() => {
      const errorMessage = screen.queryByText("*Name is required");
      expect(errorMessage).not.toBeInTheDocument();
      expect(spiedDeployXathon).toHaveBeenCalled();
    });
  });

  test("name field can not be more than 50 characters", async () => {
    fillAndSubmit({ name: "a".repeat(51) });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "*Must be less than 50 characters in length"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("description field is not required", async () => {
    fillAndSubmit({ description: null });

    await waitFor(() => {
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit field can be less than 20 characters", async () => {
    fillAndSubmit({ unit: "a".repeat(10) });

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit field can be 20 characters", async () => {
    fillAndSubmit({ unit: "a".repeat(20) });
    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).not.toBeInTheDocument();
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("unit field can not be more than 20 characters", async () => {
    fillAndSubmit({ unit: "a".repeat(21) });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "*Must be less than 20 characters in length"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("minimumDeposit field is not required", async () => {
    fillAndSubmit({ minimumDeposit: null });

    await waitFor(() => {
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledTimes(1);
    });
  });

  test("successfully calls deployXathon with correct values", async () => {
    fillAndSubmit({
      name: "N",
      description: "D",
      unit: "M",
      minimumDeposit: 0,
    });
    await waitFor(() => {
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledTimes(1);
      expect(XathonFactory.prototype.deployXathon).toHaveBeenCalledWith({
        address: ADDRESS,
        name: "N",
        description: "D",
        unit: "M",
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

  test("redirects after submitting", async () => {
    fillAndSubmit({});

    await waitFor(() => {
      expect(spiedRouterPush).toHaveBeenCalled();
      expect(spiedRouterPush).toHaveBeenCalledWith(`/${ADDRESS}`);
    });
  });

  test("sets loading text when loading", async () => {
    fillAndSubmit({});
    await waitFor(() => {
      const buttonRefound = screen.getByText(/submitting/i);
      expect(buttonRefound).toBeInTheDocument();
    });
  });

  test("error is shown when deployXathon fails", async () => {
    spiedDeployXathon.mockRejectedValueOnce("foo");

    fillAndSubmit({});

    await waitFor(() => {
      const errorText = screen.getByText(
        "Some error has occurred. Check that you confirmed the transaction in MetaMask, and that the contract name is unique"
      );
      expect(errorText).toBeInTheDocument();
    });
  });

  test("error is not shown by default", () => {
    const errorText = screen.queryByText(
      "Some error has occurred. Check that you confirmed the transaction in MetaMask, and that the contract name is unique"
    );
    expect(errorText).not.toBeInTheDocument();
  });
});
