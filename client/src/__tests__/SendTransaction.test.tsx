/* eslint-disable testing-library/no-node-access */
import "@testing-library/jest-dom";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendTransaction from "../components/SendTransaction";
import { renderWithMockStore, renderWithRedux } from "../utils";
import { Actions, SendModalStatus } from "../types";


describe("<SendTransaction />", () => {
  test("renders without crashing", () => {
    renderWithRedux(<SendTransaction />);
    const buttons = screen.getAllByText("Send");
    expect(buttons[0]).toBeInTheDocument();
  });

  test("toggles modal on Send button click", () => {
    renderWithRedux(<SendTransaction />);
    const buttons = screen.getAllByText("Send");
    expect(buttons[0]).toBeInTheDocument();
    fireEvent.click(buttons[0]);
    expect(screen.getByText("Send Transaction")).toBeInTheDocument();
  });

  test("closes modal on Close button click", () => {
    renderWithRedux(<SendTransaction />);
    const sendButton = screen.getAllByText("Send")[0];
    fireEvent.click(sendButton);
    const closeButton = screen.getAllByText("Close")[0];
    fireEvent.click(closeButton);
    const modal = closeButton.closest(".hs-overlay");
    expect(modal).toHaveClass("hidden");
  });

  test("displays error messages with invalid inputs", async () => {
    renderWithRedux(<SendTransaction />);
    const sendButton = screen.getAllByText("Send")[0];
    fireEvent.click(sendButton);

    // Attempt to submit form with empty fields
    const submitButton = screen.getByText("Send", {
      selector: 'button[type="submit"]',
    });
    userEvent.click(submitButton);

    // Check for error messages
    expect(
      await screen.findByText(
        "This field is required and should be a valid Ethereum address."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "This field is required and should be a positive number."
      )
    ).toBeInTheDocument();
  });

  test("submits form with valid inputs", async () => {
    const { store } = renderWithMockStore(<SendTransaction />, {
      initialState: {
        accounts: {
          accounts: [
            {
              address: "0x1234567890abcdef1234567890abcdef1234567890",
              balance: "0",
            },
          ],
          chains: [{ id: "1377", namespace: "" }],
          icon: "",
          label: "",
        },
        sendModalStatus: SendModalStatus.Idle,
        transactions: [],
      },
    });

    const sendButton = screen.getAllByText("Send")[0];
    fireEvent.click(sendButton);

    // Fill out the form
    fireEvent.input(screen.getByPlaceholderText("Recipient Address"), {
      target: {
        value: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      },
    });
    fireEvent.input(screen.getByPlaceholderText("Amount"), {
      target: {
        value: 10,
      },
    });

    // Get a reference to the form element
    const form = screen.getByTestId("form-element");

    // Trigger form submission
    fireEvent.submit(form);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual({
        type: Actions.SendTransaction,
        payload: {
          recipient: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
          amount: "10",
        },
      });
    });
  });
});
