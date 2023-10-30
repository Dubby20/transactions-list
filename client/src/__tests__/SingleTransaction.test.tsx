/* eslint-disable testing-library/no-debugging-utils */
import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing"; // For mocking Apollo Client
import SingleTransaction from "../components/SingleTransaction";
import { GetSingleTransaction } from "../queries";

// Define a mock response for the useQuery call
const mockData = {
  getTransaction: {
    "chainId": "123456",
      "data": "0x",
      "from": "0xCd32D74DC30cf32151F4581FF6408b30E81c7017",
      "gasLimit": "21000",
      "gasPrice": "28167901307",
      "hash": "0xc6551d04e039b96be0b961ec73d508962ef4849dbf1e52e4d1d51a5165bc8174",
      "to": "0x610Bb1573d1046FCb8A70Bbbd395754cD57C2b60",
      "value": "1000000000000000000"
  },
};

const mocks = [
  {
    request: {
      query: GetSingleTransaction,
      variables: {
        hash: "0xc6551d04e039b96be0b961ec73d508962ef4849dbf1e52e4d1d51a5165bc8174",
      },
    },
    result: {
      data: {
        ...mockData,
      },
    },
    
  },
];

describe("SingleTransaction", () => {
  test("should render loading state", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleTransaction id="0xc6551d04e039b96be0b961ec73d508962ef4849dbf1e52e4d1d51a5165bc8174" />
      </MockedProvider>
    );

    expect(screen.getByTestId("loading")).toBeDefined();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Go back" })).toBeTruthy();
    });
    
    expect(screen.getByText("Transaction")).toBeDefined();
  });

  test("should render error state", async () => {
    const errorMessage = "An error occurred";

    const errorMocks = [
      {
        request: {
          query: GetSingleTransaction,
          variables: {
            hash: "123",
          },
        },
        error: new Error(errorMessage),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <SingleTransaction id="123" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
    });
  });

  test("should render transaction details", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleTransaction id="0xc6551d04e039b96be0b961ec73d508962ef4849dbf1e52e4d1d51a5165bc8174" />
      </MockedProvider>
    );

    await screen.findByText("Transaction Hash:");
    expect(screen.getByText("Sender Address:")).toBeTruthy();
    expect(screen.getByText("Recipient Address:")).toBeTruthy();
  });
});
