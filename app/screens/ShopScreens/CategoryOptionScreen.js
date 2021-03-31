import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { BlockCommon, InputCommon } from '../../components/common';
import {
  AddElementWrapperLayout,
  ImagePickerLayout,
} from '../../components/layouts';
import { CategoryContext } from '../../context/stores';
import { validate } from '../../utils';

const CategoryOptionScreen = ({ navigation, route }) => {
  const [update, setUpdate] = useState(route.params?.update);
  const [shopId, setShopId] = useState(route.params?.shop_id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageSelected, setImageSelected] = useState('');

  const { categoryState, categoryActions } = useContext(CategoryContext);

  const _getCategory = async () => {
    if (!update) return;
    await categoryActions.getCategory(route.params?.category_id);
  };

  const _setFields = async () => {
    if (!update) return;
    setName(categoryState.payload?.name);
    setDescription(categoryState.payload?.description);
    setImageSelected(categoryState.payload?.image?.image_id);
  };

  const _addCategoryHandler = async () => {
    if (await validate.notEmty([name, imageSelected])) {
      await categoryActions.addCategory(
        shopId,
        name,
        description,
        imageSelected
      );
      _resetField();
    }
  };

  const _updateCategoryHandler = async () => {
    if (await validate.notEmty([name, imageSelected])) {
      await categoryActions.updateCategory(
        categoryState.payload?.category_id,
        name,
        description,
        imageSelected
      );
    }
  };

  const _cancelCategoryHandler = () => {
    navigation.goBack();
  };

  const _resetField = () => {
    setName('');
    setDescription('');
    setImageSelected('');
  };

  useEffect(() => {
    _getCategory();
  }, []);

  useEffect(() => {
    _setFields();
  }, [categoryState.payload]);

  return (
    <AddElementWrapperLayout
      _addElementHandler={_addCategoryHandler}
      _cancelElementHandler={_cancelCategoryHandler}
      _updateElementHandler={_updateCategoryHandler}
      title="Category"
      update={update}
      error={categoryState.error}
      loading={categoryState.loading}
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
        </BlockCommon>
        <BlockCommon d_flex={2}>
          <ImagePickerLayout
            setImageSelected={setImageSelected}
            imageSelected={imageSelected}
          />
        </BlockCommon>
      </KeyboardAvoidingView>
    </AddElementWrapperLayout>
  );
};

export default CategoryOptionScreen;
