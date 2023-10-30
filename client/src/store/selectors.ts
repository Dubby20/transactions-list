import { Transaction } from "ethers";
import { AccountType, SendModalStatus } from "../types";
import { RootState } from "./reducers";

export const selectWallet = (state: RootState): AccountType | undefined =>
  state.accounts;

export const selectTransactions = (state: RootState): Array<Transaction> =>
  state.transactions;

export const selectModalState = (state: RootState): SendModalStatus =>
  state.sendModalStatus;
