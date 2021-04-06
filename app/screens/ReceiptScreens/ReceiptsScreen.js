import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  BlockCommon,
  CardCommon,
  ListCardCommon,
  NavPageCommon,
  TextCommon,
} from '../../components/common';
import { theme } from '../../constants';
import { AuthContext, ReceiptContext, ShopContext } from '../../context/stores';

const ReceiptsScreen = () => {
  const { authState } = useContext(AuthContext);
  const { buyProductState } = useContext(ShopContext);
  const { receiptsState, receiptActions } = useContext(ReceiptContext);
  const [page, setPage] = useState(0);

  useEffect(() => {
    receiptActions.getAll(authState.payload?.shop?.shop_id, page);
  }, [buyProductState.payload, page]);

  const getLimit = () => {
    if (receiptsState.payload?.length < 20) {
      return page - 1;
    }
  };

  const _renderReceipt = (item) => {
    const date = new Date(item.date);
    return (
      <BlockCommon style={styles.receiptCard}>
        <TextCommon>
          Product name:{' '}
          <TextCommon gray bold>
            {item.productName}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Seller name:{' '}
          <TextCommon gray bold>
            {item.seller?.name}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Buyer name:{' '}
          <TextCommon gray bold>
            {item.buyer?.name}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Quantity:{' '}
          <TextCommon gray bold>
            {item.quantity}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Price:{' '}
          <TextCommon gray bold>
            {item.price}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Date:{' '}
          <TextCommon gray bold>
            {date.toDateString()}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Time:{' '}
          <TextCommon gray bold>
            {date.toLocaleTimeString()}
          </TextCommon>
        </TextCommon>
      </BlockCommon>
    );
  };

  return (
    <BlockCommon p1>
      <BlockCommon d_flex={0.1} f_center f_middle>
        <NavPageCommon page={page} limit={getLimit()} setPage={setPage} />
      </BlockCommon>
      <BlockCommon d_flex={false}>
        <TextCommon title>Receipts</TextCommon>
      </BlockCommon>
      <BlockCommon>
        <ListCardCommon
          data={receiptsState.payload}
          error={receiptsState.error}
          keyExtractor={(item) => item.receipt_id}
          loading={receiptsState.loading}
          numColumns={1}
          renderItem={_renderReceipt}
        />
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  receiptCard: {
    backgroundColor: theme.colors.white,
    padding: theme.sizes.padding,
    marginBottom: theme.sizes.base,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 1, height: 1 },
  },
});

export default ReceiptsScreen;
