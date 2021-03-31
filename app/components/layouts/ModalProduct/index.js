import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet } from 'react-native';
import { env } from '../../../config';
import { theme } from '../../../constants';
import {
  AuthContext,
  DetailsContext,
  ShopContext,
} from '../../../context/stores';
import {
  BlockCommon,
  ButtonCommon,
  LoadingCommon,
  TextCommon,
} from '../../common';
import ModalProductInfo from './ModalProductInfo';
import CloseModalBtn from './CloseModalBtn';
import ModalProductQuantity from './ModalProductQuantity';

const ModalProductLayout = ({
  modalVisible,
  setModalVisible,
  productId,
  shopId,
}) => {
  const { productState, detailsActions } = useContext(DetailsContext);
  const { authState } = useContext(AuthContext);
  const { buyProductState, shopActions } = useContext(ShopContext);
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    if (productId) detailsActions.getProduct(productId);
  }, [productId, buyProductState.payload]);

  const product = {
    quantity: productState.payload?.quantity,
    image: productState.payload?.image,
    name: productState.payload?.name,
    description: productState.payload?.description,
    price: productState.payload?.price,
  };

  const user = {
    money: authState.payload?.shop?.money,
    shop_id: authState.payload?.shop?.shop_id,
  };

  const _setQuantityHandler = (quantity) => {
    if (quantity <= product.quantity) {
      setQuantity(quantity);
    }
  };

  const _buyProductHanlder = async () => {
    await shopActions.buyProduct(user.shop_id, shopId, productId, quantity);
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <BlockCommon style={styles.modal}>
        <BlockCommon d_flex={false} f_row f_space="between">
          <TextCommon h4>{product.name}</TextCommon>
          <CloseModalBtn setModalVisible={setModalVisible} />
        </BlockCommon>
        <BlockCommon>
          <BlockCommon>
            <Image
              source={{
                uri: `${env.BACKEND_IMAGE}/${product.image?.image_url}`,
              }}
              style={styles.imageStyle}
            />
          </BlockCommon>
          <BlockCommon>
            <ModalProductInfo product={product} userMoney={user.money} />
            <ModalProductQuantity
              price={product.price}
              quantity={quantity}
              setQuantity={_setQuantityHandler}
              userMoney={user.money}
            />
            <ButtonCommon gradient onPress={_buyProductHanlder}>
              <TextCommon center white bord>
                {buyProductState.loading ? <LoadingCommon /> : 'Comprar'}
              </TextCommon>
            </ButtonCommon>
          </BlockCommon>
        </BlockCommon>
      </BlockCommon>
    </Modal>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    top: height * 0.1,
    left: width / 6,
    width: width / 1.5,
    minHeight: height / 1.5,
    backgroundColor: theme.colors.gray3,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.padding,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: theme.sizes.radius,
  },
});

export default ModalProductLayout;
