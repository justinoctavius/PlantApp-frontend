import React, { useContext, useState } from 'react';
import {
  BlockCommon,
  ButtonCommon,
  LoadingCommon,
  TextCommon,
  TextEditableCommon,
} from '../../components/common';
import { AuthContext, ShopContext } from '../../context/stores';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { StyleSheet } from 'react-native';
import { UserInfoLayout } from '../../components/layouts';

const SettingScreen = () => {
  const { authState, authActions } = useContext(AuthContext);
  const { shopState, shopActions } = useContext(ShopContext);

  const auth = {
    username: authState.payload?.username,
    email: authState.payload?.email,
    shop: shopState.payload || authState.payload?.shop,
  };

  const [shopName, setShopName] = useState(auth.shop?.name);
  const [description, setDescription] = useState(auth.shop?.description);

  const _shouldSaveBtnShow = () => {
    return (
      auth.shop?.name !== shopName || auth.shop?.description !== description
    );
  };

  const _updateShopHandler = async () => {
    await shopActions.updateShop(auth.shop?.shop_id, shopName, description);
  };

  const _signOutHandler = async () => {
    await authActions.signOut();
  };

  return (
    <BlockCommon p1>
      <BlockCommon d_flex={false}>
        <TextCommon title>
          Settings <Ionicons name={'settings'} size={theme.sizes.base} />
        </TextCommon>
      </BlockCommon>

      <UserInfoLayout user={auth} />

      <BlockCommon>
        <TextEditableCommon
          label="Shop name"
          setText={setShopName}
          text={shopName}
        />
        <TextEditableCommon
          label="Description"
          setText={setDescription}
          text={description}
        />
        <BlockCommon style={styles.textStyle}>
          <TextCommon>money:</TextCommon>
          <TextCommon gray>
            <Ionicons name={'cash'} /> {auth.shop.money}
          </TextCommon>
        </BlockCommon>
      </BlockCommon>

      <BlockCommon style={styles.btnBoxStyle}>
        {_shouldSaveBtnShow() && (
          <ButtonCommon
            m1
            width={100}
            onPress={_updateShopHandler}
            color="primary"
          >
            <TextCommon white bold center>
              {shopState?.loading ? <LoadingCommon /> : 'Save'}
            </TextCommon>
          </ButtonCommon>
        )}
        <ButtonCommon width={100} onPress={_signOutHandler} color="danger">
          <TextCommon white bold center>
            Sign out <Ionicons name="exit-outline" />
          </TextCommon>
        </ButtonCommon>
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  textStyle: { marginTop: theme.sizes.padding / 2 },
  btnBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default SettingScreen;
