import React, { useContext, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { env } from '../../config';
import { theme } from '../../constants';
import { ImageContext } from '../../context/stores';
import {
  BlockCommon,
  CardCommon,
  ErrorCommon,
  LoadingCommon,
  TextCommon,
} from '../common';

const ImagePickerLayout = ({ imageSelected, setImageSelected }) => {
  const { imageState, imageActions } = useContext(ImageContext);

  const _getAllImageHandler = async () => {
    await imageActions.getAllImage();
  };

  useEffect(() => {
    _getAllImageHandler();
  }, []);

  if (imageState.error) {
    return <ErrorCommon text={imageState.error} />;
  }

  if (imageState.payload?.length === 0) {
    return <ErrorCommon text={'There are not images :( '} />;
  }

  if (imageState.loading) {
    return <LoadingCommon size={32} />;
  }

  return (
    <BlockCommon
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        backgroundColor: theme.colors.gray3,
        borderRadius: theme.sizes.radius,
      }}
    >
      <BlockCommon style={{ padding: theme.sizes.padding / 2 }}>
        <TextCommon title>Select image</TextCommon>
      </BlockCommon>
      <BlockCommon f_center>
        <FlatList
          data={imageState.payload}
          keyExtractor={(item) => item.image_id}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <CardCommon
              onPress={() => setImageSelected(item.image_id)}
              selected={imageSelected === item.image_id}
              image_url={`${env.BACKEND_IMAGE}/${item.image_url}`}
              title={item.name}
              stretch
            />
          )}
        />
      </BlockCommon>
    </BlockCommon>
  );
};

export default ImagePickerLayout;
