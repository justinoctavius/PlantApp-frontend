import React, { useContext, useEffect, useState } from 'react';
import {
  BlockCommon,
  ErrorCommon,
  InputCommon,
  TextCommon,
} from '../../components/common';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useImage } from '../../components/hooks';
import { ImageContext } from '../../context/stores';
import { validate } from '../../utils';
import { theme } from '../../constants';
import AddCancelBtnsLayout from '../../components/layouts/AddCancelBtnsLayout';

const ImageOptionScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, pickImage, setImage] = useImage();
  const { addImageState, imageActions } = useContext(ImageContext);

  const _addImageHandler = async () => {
    if (addImageState.loading) return null;
    const isValid = await validate.notEmty([name]);
    const isImageValid = image?.uri;
    if (isValid && isImageValid) {
      await imageActions.addImage(image, name, description);
    }
  };

  const _cancelImageHandler = () => {
    navigation.navigate('Image', {
      newImage: addImageState.payload?.image_id,
    });
  };

  const _restartFields = () => {
    if (addImageState.payload) {
      setName('');
      setDescription('');
      setImage(null);
    }
  };

  useEffect(() => {
    _restartFields();
  }, [addImageState.payload]);

  return (
    <BlockCommon p1>
      {/* header */}
      <BlockCommon d_flex={1}>
        <TextCommon title>
          Add Image <Ionicons name="add-circle" size={theme.sizes.title} />
        </TextCommon>
      </BlockCommon>

      {/* body */}
      <BlockCommon d_flex={7}>
        <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
          {/* inputs */}
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
          {/* image picker */}
          <TouchableOpacity onPress={() => pickImage()}>
            <BlockCommon style={styles.imagePicker}>
              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: theme.sizes.radius,
                  }}
                />
              ) : (
                <TextCommon center title secondary>
                  Pick an image
                </TextCommon>
              )}
            </BlockCommon>
          </TouchableOpacity>
          {/* messages */}
          <BlockCommon>
            {addImageState.error && <ErrorCommon text={addImageState.error} />}
          </BlockCommon>
        </KeyboardAwareScrollView>
      </BlockCommon>

      {/* buttons */}
      <AddCancelBtnsLayout
        addHandler={_addImageHandler}
        cancelHandler={_cancelImageHandler}
        loading={addImageState.loading}
      />
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    height: Dimensions.get('screen').height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: theme.sizes.radius,
    borderColor: theme.colors.gray,
  },
});

export default ImageOptionScreen;
