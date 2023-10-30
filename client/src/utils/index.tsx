import "@testing-library/jest-dom";

import { configureStore } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { Store as ReduxStore, AnyAction } from "redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import rootReducer, { RootState } from "../store/reducers";

interface RenderWithReduxOptions {
  initialState?: RootState;
  store?: ReduxStore;
}

interface RenderWithMockStoreOptions {
  initialState?: RootState;
}

export const renderWithRedux = (
  component: ReactElement,
  { initialState, store }: RenderWithReduxOptions = {}
): RenderResult & { store: ReduxStore } => {
  const usedStore =
    store ||
    configureStore({ reducer: rootReducer, preloadedState: initialState });
  return {
    ...render(<Provider store={usedStore}>{component}</Provider>),
    store: usedStore,
  };
};

interface RenderWithMockStoreOptions {
  initialState?: RootState;
}

export const renderWithMockStore = (
  component: ReactElement,
  { initialState }: RenderWithMockStoreOptions = {}
): RenderResult & { store: MockStoreEnhanced<RootState, AnyAction> } => {
  const mockStore = configureMockStore<RootState, AnyAction>([])(initialState);
  return {
    ...render(<Provider store={mockStore}>{component}</Provider>),
    store: mockStore,
  };
};
