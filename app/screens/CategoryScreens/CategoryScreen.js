import React, { useContext, useEffect, useState } from 'react';
import { ListCardCommon } from '../../components/common';
import FatherElementLayout from '../../components/layouts/FatherElementLayout';
import { CategoryContext, ProductContext } from '../../context/stores';
import { ProductCardLayout } from '../../components/layouts';

const CategoryScreen = ({ navigation, route }) => {
  const [categoryId, setCategoryId] = useState(route.params?.category_id);
  const [cardSelected, setCardSelected] = useState();
  const { categoryState, categoryActions } = useContext(CategoryContext);
  const { productsState, productState, productActions } = useContext(
    ProductContext
  );

  useEffect(() => {
    _getCategoryHandler();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: categoryState.payload?.name,
    });
  }, [categoryState.payload]);

  useEffect(() => {
    _getProductsHandler();
  }, [productState.payload]);

  const _getCategoryHandler = async () => {
    await categoryActions.getCategory(categoryId);
  };

  const _getProductsHandler = async () => {
    await productActions.getAllProduct(categoryId);
  };

  const _addProductHandler = async () => {
    navigation.navigate('ProductOption', {
      update: false,
      category_id: categoryId,
    });
  };

  const _updateProductHandler = async () => {
    navigation.navigate('ProductOption', {
      update: true,
      product_id: cardSelected,
    });
  };

  const _deleteProductHandler = async () => {
    await productActions.deleteProduct(cardSelected);
  };

  const _renderCard = (item) => {
    return (
      <ProductCardLayout
        cardSelected={cardSelected}
        setCardSelected={setCardSelected}
        item={item}
      />
    );
  };

  return (
    <FatherElementLayout
      description={categoryState.payload?.description}
      pressAddLabel={'Add product'}
      onPressAdd={_addProductHandler}
      onPressDelete={_deleteProductHandler}
      onPressUpdate={_updateProductHandler}
      setCardSelected={setCardSelected}
      cardSelected={cardSelected}
      loading={categoryState.loading}
      error={categoryState.error}
    >
      <ListCardCommon
        data={productsState.payload}
        keyExtractor={(item) => item.product_id}
        headerTitle={'Products'}
        renderItem={_renderCard}
        loading={productsState.loading}
        error={productsState.error}
      />
    </FatherElementLayout>
  );
};

export default CategoryScreen;
