import React, { createContext, useMemo, useReducer } from 'react';
import { getAllReceiptAction, getReceiptAction } from '../actions';
import { reducer } from '../reducers';

export const ReceiptContext = createContext({});

const ReceiptStore = ({ children }) => {
  const [receiptState, receiptDispatch] = useReducer(reducer, {});
  const [receiptsState, receiptsDispatch] = useReducer(reducer, {});

  const receiptActions = useMemo(() => ({
    get: async (receipt_id) => {
      await getReceiptAction(receipt_id)(receiptDispatch);
    },
    getAll: async (shop_id, page) => {
      await getAllReceiptAction(shop_id, page)(receiptsDispatch);
    },
  }));

  const value = {
    receiptState,
    receiptsState,
    receiptActions,
  };
  return (
    <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>
  );
};

export default ReceiptStore;
