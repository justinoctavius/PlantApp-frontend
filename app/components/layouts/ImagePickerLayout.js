import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { env } from '../../config';
import { theme } from '../../constants';
import { ImageContext } from '../../context/stores';
import { BlockCommon, CardCommon, ListCardCommon, TextCommon } from '../common';

const ImagePickerLayout = ({ imageSelected, setImageSelected }) => {
  const { imagesState, imageActions } = useContext(ImageContext);

  useEffect(() => {
    imageActions.getAllImage();
  }, []);

  const _renderImages = (item) => {
    return (
      <CardCommon
        onPress={() => setImageSelected(item.image_id)}
        selected={imageSelected === item.image_id}
        image_url={`${env.BACKEND_IMAGE}/${item.image_url}`}
        title={item.name}
        stretch
      />
    );
  };

  return (
    <BlockCommon style={styles.imagePickerStyle}>
      <BlockCommon style={{ padding: theme.sizes.padding / 2 }}>
        <TextCommon title>Select image</TextCommon>
      </BlockCommon>
      <BlockCommon f_center>
        <ListCardCommon
          data={imagesState.payload}
          error={imagesState.error}
          keyExtractor={(item) => item.image_id}
          loading={imagesState.loading}
          renderItem={_renderImages}
        />
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  imagePickerStyle: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.gray3,
    borderRadius: theme.sizes.radius,
  },
});

export default ImagePickerLayout;
