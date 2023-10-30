import { Transaction } from "ethers";
import { AccountType, Actions, SendModalStatus } from "../types";

// Define the state type
export interface RootState {
  transactions: Transaction[];
  accounts: AccountType | undefined;
  sendModalStatus: SendModalStatus;
}

// Initial state
const initialState: RootState = {
  transactions: [],
  accounts: undefined,
  sendModalStatus: SendModalStatus.Idle,
};

const reducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    // Define your actions
    case Actions.AccountInitialization:
      return {
        ...state,
        accounts: action.payload,
      };
    case Actions.SetTransactions:
      return {
        ...state,
        transactions: action.payload,
      };
    case Actions.UpdateSendModal:
      return {
        ...state,
        sendModalStatus: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
