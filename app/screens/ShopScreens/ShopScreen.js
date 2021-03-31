import React, { useContext, useEffect, useState } from 'react';
import { CardCommon, ListCardCommon } from '../../components/common';
import { ManageElementsWrapperLayout } from '../../components/layouts';
import { env } from '../../config';
import {
  AuthContext,
  CategoryContext,
  ShopContext,
} from '../../context/stores';

const ShopScreen = ({ navigation }) => {
  const [cardSelected, setCardSelected] = useState('');
  const { authState } = useContext(AuthContext);
  const { shopState, buyProductState, shopActions } = useContext(ShopContext);
  const { categoriesState, categoryState, categoryActions } = useContext(
    CategoryContext
  );

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
      shop_id: shopState.payload?.shop_id,
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
    shopActions.getShop(authState.payload?.shop?.shop_id);
  }, [buyProductState.payload]);

  useEffect(() => {
    categoryActions.getAllCategory(authState.payload?.shop?.shop_id);
  }, [buyProductState.payload, categoryState.payload]);

  return (
    <ManageElementsWrapperLayout
      onPressAdd={_addCategoryHandler}
      onPressDelete={_deleteCategoryHandler}
      onPressUpdate={_updateCategoryHandler}
      title={shopState.payload?.name}
      description={shopState.payload?.description}
      pressAddLabel={'Add category'}
      cardSelected={cardSelected}
      setCardSelected={setCardSelected}
      loading={shopState.loading}
      error={shopState.error}
    >
      <ListCardCommon
        data={categoriesState.payload}
        headerTitle={'Categories'}
        keyExtractor={(item) => item.category_id}
        renderItem={_renderCard}
        loading={categoriesState.loading}
        error={categoriesState.error}
        padding
      />
    </ManageElementsWrapperLayout>
  );
};

export default ShopScreen;
