import React, { useContext, useEffect, useState } from 'react';
import { BlockCommon, InputCommon } from '../../components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useImage } from '../../components/hooks';
import { ImageContext } from '../../context/stores';
import { validate } from '../../utils';
import {
  AddElementWrapperLayout,
  ImagePickerSquareLayout,
} from '../../components/layouts';
import { env } from '../../config';

const ImageOptionScreen = ({ navigation, route }) => {
  const [update, setUpdate] = useState(route.params?.update);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, pickImage, setImage] = useImage();
  const { imageState, imageActions } = useContext(ImageContext);

  const _validate = async () => {
    const isValid = await validate.notEmty([name]);
    const isImageValid = image?.uri;
    if (isValid && isImageValid) return true;
  };

  const _addImageHandler = async () => {
    if (await _validate()) {
      await imageActions.addImage(image, name, description);
      _resetFields();
    }
  };

  const _cancelImageHandler = () => {
    navigation.goBack();
  };

  const _updateImageHandler = async () => {
    await imageActions.updateImage(
      imageState.payload?.image_url,
      imageState.payload?.image_id,
      name,
      description,
      image
    );
  };

  const _getImage = async () => {
    if (update) {
      await imageActions.getImage(route.params?.image_id);
    }
  };

  const _setFields = async () => {
    if (update) {
      setName(imageState.payload?.name);
      setDescription(imageState.payload?.description);
    }
  };

  const _resetFields = () => {
    setName('');
    setDescription('');
    setImage(null);
  };

  useEffect(() => {
    _getImage();
  }, []);

  useEffect(() => {
    _setFields();
  }, [imageState.payload]);

  return (
    <AddElementWrapperLayout
      _addElementHandler={_addImageHandler}
      _cancelElementHandler={_cancelImageHandler}
      _updateElementHandler={_updateImageHandler}
      loading={imageState.loading}
      error={imageState.error}
      title={'Image'}
      update={update}
    >
      <KeyboardAwareScrollView>
        <BlockCommon>
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
        <ImagePickerSquareLayout
          image_url={
            image?.uri ||
            `${env.BACKEND_IMAGE}/${imageState.payload?.image_url}`
          }
          onPress={() => pickImage()}
        />
      </KeyboardAwareScrollView>
    </AddElementWrapperLayout>
  );
};

export default ImageOptionScreen;
