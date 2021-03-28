import React, { useContext, useEffect, useState } from 'react';
import { CardCommon, ListCardCommon } from '../../components/common';
import { FatherElementLayout } from '../../components/layouts';
import { env } from '../../config';
import {
  AuthContext,
  CategoryContext,
  ShopContext,
} from '../../context/stores';

const ShopScreen = ({ navigation, route }) => {
  const [cardSelected, setCardSelected] = useState('');
  const { authState } = useContext(AuthContext);
  const { userShopState, shopActions } = useContext(ShopContext);
  const { categoriesState, categoryState, categoryActions } = useContext(
    CategoryContext
  );

  const _getShopHandler = async () => {
    await shopActions.getUserShop(authState.payload?.shop?.shop_id);
  };

  const _getCategoriesHandler = async () => {
    await categoryActions.getAllCategory(authState.payload?.shop?.shop_id);
  };

  const _deleteCategoryHandler = async () => {
    await categoryActions.deleteCategory(cardSelected);
    setCardSelected('');
  };

  const _updateCategoryHandler = async () => {
    navigation.navigate('CategoryOption', {
      update: true,
      category_id: cardSelected,
    });
  };

  const _addCategoryHandler = () => {
    navigation.navigate('CategoryOption', {
      update: false,
      shop_id: userShopState.payload?.shop_id,
    });
  };

  const _renderCard = (item) => {
    return (
      <CardCommon
        title={item.name}
        image_url={`${env.BACKEND_IMAGE}/${item.image.image_url}`}
        onPress={() =>
          navigation.navigate('Category', {
            category_id: item.category_id,
          })
        }
        selected={cardSelected === item.category_id}
        onLongPress={() => setCardSelected(item.category_id)}
      />
    );
  };

  useEffect(() => {
    _getShopHandler();
  }, []);

  useEffect(() => {
    _getCategoriesHandler();
  }, [categoryState.payload]);

  return (
    <FatherElementLayout
      onPressAdd={_addCategoryHandler}
      onPressDelete={_deleteCategoryHandler}
      onPressUpdate={_updateCategoryHandler}
      title={userShopState.payload?.name}
      description={userShopState.payload?.description}
      pressAddLabel={'Add category'}
      cardSelected={cardSelected}
      setCardSelected={setCardSelected}
      loading={userShopState.loading}
      error={userShopState.error}
    >
      <ListCardCommon
        data={categoriesState.payload}
        headerTitle={'Categories'}
        keyExtractor={(item) => item.category_id}
        renderItem={_renderCard}
        loading={categoriesState.loading}
        error={categoriesState.error}
      />
    </FatherElementLayout>
  );
};

export default ShopScreen;
