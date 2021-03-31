import { dispatchAction } from './dispatch';
import { shopApi } from '../../api';

const getShopAction = (shop_id) => async (dispatch) => {
  const query = async () => await shopApi.get(shop_id);
  await dispatchAction(dispatch, query);
};

const getAllShopAction = (page) => async (dispatch) => {
  const query = async () => await shopApi.getAll(page);
  await dispatchAction(dispatch, query);
};

const getGlobalShopAction = () => async (dispatch) => {
  const query = async () => await shopApi.getGlobal();
  await dispatchAction(dispatch, query);
};

const updateShopAction = (shop_id, name, description) => async (dispatch) => {
  const query = async () => await shopApi.update(shop_id, name, description);
  await dispatchAction(dispatch, query);
};

const buyProductAction = (
  buyer_shop_id,
  seller_shop_id,
  product_id,
  quantity
) => async (dispatch) => {
  const query = async () =>
    await shopApi.buyProduct(
      buyer_shop_id,
      seller_shop_id,
      product_id,
      quantity
    );
  await dispatchAction(dispatch, query);
};

export {
  getShopAction,
  getAllShopAction,
  getGlobalShopAction,
  buyProductAction,
  updateShopAction,
};
