import { takeEvery, put } from "redux-saga/effects";
import {
  JsonRpcProvider,
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer,
  parseEther,
} from "ethers";

import apolloClient from "../apollo/client";
import { navigate } from "../components/NaiveRouter";
import { Actions, SendModalStatus } from "../types";
import { SaveTransaction } from "../queries";



type SendPayloadType = { amount: string; recipient: string; sender: string };

function* sendTransaction(action: { type: Actions; payload: SendPayloadType }) {
  const provider = new JsonRpcProvider("http://localhost:8545");


  // this could have been passed along in a more elegant fashion,
  // but for the purpouses of this scenario it's good enough
  // @ts-ignore
  const walletProvider = new BrowserProvider(window.web3.currentProvider);

  const signer: Signer = yield walletProvider.getSigner();

  const accounts: Array<{ address: string }> = yield provider.listAccounts();

  const randomAddress = () => {
    const min = 1;
    const max = accounts.length;
    const random = Math.round(Math.random() * (max - min) + min);
    return accounts[random].address;
  };

  const transaction = {
    to: action.payload.recipient,
    // value: 1000000000000000000,
    value: parseEther(action.payload.amount).toString()
  };


  try {
    const txResponse: TransactionResponse = yield signer.sendTransaction(
      transaction
    );

     yield put({
       type: Actions.UpdateSendModal,
       payload: SendModalStatus.AwaitingConfirmation,
     });

    const response: TransactionReceipt = yield txResponse.wait();
    
    const receipt: Transaction = yield response.getTransaction();


    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || "0",
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString()) || "0",
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || "",
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || "123456",
        hash: receipt.hash,
      },
    };

    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });

    yield put({ type: Actions.UpdateSendModal, payload: SendModalStatus.Idle });

    navigate(`/transaction/${receipt.hash}`);
  } catch (error) {
    //
    console.log("error", error);
  }
}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
