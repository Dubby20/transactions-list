export interface Transaction {
  gasLimit: string;
  gasPrice: string;
  to: string;
  from: string;
  value: string;
  data?: string;
  chainId: string;
  hash: string;
}

export interface TransactionsData {
  getAllTransactions: Transaction[];
}

export interface SingleTransactionData {
  getTransaction: Transaction;
}

export type Action<P> = {
  type: Actions;
  payload: P;
};

export enum Actions {
  SendTransaction = "SEND_TRANSACTION",
  AccountInitialization = "ACCOUNT_INITIALIZATION",
  SetTransactions = "SET_TRANSACTIONS",
  UpdateSendModal = "UPDATE_SEND_MODAL",
}

export type AccountType = {
  accounts: Array<{ address: string; balance: string }>;
  chains: Array<{ id: string; namespace: string }>;
  icon: string;
  label: string;
};

export enum SendModalStatus {
  Initializing = "INITIALIZING",
  AwaitingConfirmation = "AWAITING_CONFIRMATION",
  Idle = "Idle",
}
