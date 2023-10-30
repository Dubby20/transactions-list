/* eslint-disable testing-library/no-debugging-utils */
import { waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing"; // For mocking Apollo Client
import TransactionList from "../components/TransactionsList";
import { GetAllTransactions } from "../queries";
import { renderWithRedux } from "../utils";

// Define a mock response for the useQuery call
const mockData = {
  getAllTransactions: [
    {
      chainId: "123456",
      data: "0x",
      from: "0xCd32D74DC30cf32151F4581FF6408b30E81c7017",
      gasLimit: "21000",
      gasPrice: "28167901307",
      hash: "0xc6551d04e039b96be0b961ec73d508962ef4849dbf1e52e4d1d51a5165bc8174",
      to: "0x610Bb1573d1046FCb8A70Bbbd395754cD57C2b60",
      value: "1000000000000000000",
    },
    {
      chainId: "123456",
      data: "0x",
      from: "0xCd32D74DC30cf32151F4581FF6408b30E81c7017",
      gasLimit: "21000",
      gasPrice: "29952353320",
      hash: "0xf4444996b4e4702a170f3e81567a37052c7fb02b477d003d364fa8b559fe9f7f",
      to: "0x28a8746e75304c0780E011BEd21C72cD78cd535E",
      value: "1000000000000000000",
    },
    {
      chainId: "123456",
      data: "0x",
      from: "0xCd32D74DC30cf32151F4581FF6408b30E81c7017",
      gasLimit: "21000",
      gasPrice: "32722164029",
      hash: "0x2b5ff82a184cd7e6f6acca3df9d6404224c440ca16dae56ad0144f2ab1483adb",
      to: "0x64E078A8Aa15A41B85890265648e965De686bAE6",
      value: "1000000000000000000",
    },
  ],
};

const mocks = [
  {
    request: {
      query: GetAllTransactions,
    },
    result: {
      data: {
        ...mockData,
      },
    },
  },
];

describe("TransactionList", () => {
  test("should render loading state", async () => {
    renderWithRedux(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionList />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should render error state", async () => {
    const errorMessage = "An error occurred";

    const errorMocks = [
      {
        request: {
          query: GetAllTransactions,
        },
        error: new Error(errorMessage),
      },
    ];

    renderWithRedux(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <TransactionList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
    });
  });

  test("should render transaction details", async () => {
    renderWithRedux(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionList />
      </MockedProvider>
    );
    await screen.findAllByText("0xCd32D74DC30cf32151F4581FF6408b30E81c7017");
    expect(
      screen.getAllByText("0xCd32D74DC30cf32151F4581FF6408b30E81c7017")
    ).toHaveLength(3);
    await screen.findAllByText("1.0 ETH");
    expect(screen.getAllByText("1.0 ETH")).toHaveLength(3);
  });
});
