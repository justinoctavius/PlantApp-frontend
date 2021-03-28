import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { BlockCommon, InputCommon } from '../../components/common';
import {
  ImagePickerLayout,
  ElementOptionLayout,
} from '../../components/layouts';
import { ProductContext } from '../../context/stores';
import { validate } from '../../utils';

const ProductOptionScreen = ({ navigation, route }) => {
  const [categoryId, setCategoryId] = useState(route.params?.category_id);
  const [update, setUpdate] = useState(route.params?.update);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [imageSelected, setImageSelected] = useState('');

  const { productState, productActions } = useContext(ProductContext);

  const _addProductHandler = async () => {
    if (await _validate()) {
      await productActions.addProduct(categoryId, {
        name,
        description,
        quantity,
        price,
        image_id: imageSelected,
      });
      _resetField();
    }
  };

  const _updateProductHandler = async () => {
    if (await _validate()) {
      await productActions.updateProduct(productState.payload?.product_id, {
        name,
        description,
        quantity,
        price,
        image_id: imageSelected,
      });
    }
  };

  const _getProduct = async () => {
    if (!update) return;
    await productActions.getProduct(route.params?.product_id);
  };

  const _validate = async () => {
    return await validate.notEmty([name, quantity, price, imageSelected]);
  };

  const _setFields = async () => {
    if (!update) return;
    setName(productState.payload?.name);
    setDescription(productState.payload?.description);
    setImageSelected(productState.payload?.image?.image_id);
    setPrice(productState.payload?.price?.toString());
    setQuantity(productState.payload?.quantity?.toString());
  };

  const _cancelProductHandler = () => {
    navigation.goBack();
  };

  const _resetField = () => {
    setName('');
    setDescription('');
    setImageSelected('');
    setPrice('');
    setQuantity('');
  };

  useEffect(() => {
    _getProduct();
  }, []);

  useEffect(() => {
    _setFields();
  }, [productState.payload]);

  return (
    <ElementOptionLayout
      _addElementHandler={_addProductHandler}
      _cancelElementHandler={_cancelProductHandler}
      _updateElementHandler={_updateProductHandler}
      error={productState.error}
      loading={productState.loading}
      title="Product"
      update={update}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <BlockCommon d_flex={false}>
          <InputCommon
            label="Name"
            value={name}
            require
            onChangeText={(e) => setName(e)}
          />
          <InputCommon
            label="Description"
            value={description}
            multiline
            numberOfLines={3}
            onChangeText={(e) => setDescription(e)}
          />
          <InputCommon
            label="Quantity"
            value={quantity}
            require
            number
            onChangeText={(e) => setQuantity(e)}
          />
          <InputCommon
            label="Price"
            value={price}
            require
            number
            onChangeText={(e) => setPrice(e)}
          />
        </BlockCommon>
        <BlockCommon d_flex={2}>
          <ImagePickerLayout
            setImageSelected={setImageSelected}
            imageSelected={imageSelected}
          />
        </BlockCommon>
      </KeyboardAvoidingView>
    </ElementOptionLayout>
  );
};

export default ProductOptionScreen;
