import { receiptApi } from '../../api';
import { dispatchAction } from './dispatch';

const getReceiptAction = (receipt_id) => async (dispatch) => {
  const query = async () => await receiptApi.get(receipt_id);
  dispatchAction(dispatch, query);
};

const getAllReceiptAction = (shop_id, page) => async (dispatch) => {
  const query = async () => await receiptApi.getAll(shop_id, page);
  dispatchAction(dispatch, query);
};

export { getAllReceiptAction, getReceiptAction };
