import React, { useContext, useEffect, useState } from 'react';
import { CardCommon, ListCardCommon } from '../../components/common';
import { ManageElementsWrapperLayout } from '../../components/layouts/';
import { env } from '../../config';
import { ImageContext } from '../../context/stores';

const ImageScreen = ({ navigation }) => {
  const { imageState, imagesState, imageActions } = useContext(ImageContext);
  const [cardSelected, setCardSelected] = useState('');

  const _addImageHandler = () => {
    navigation.navigate('ImageOption', {
      update: false,
    });
  };

  const _deleteImageHandler = () => {
    if (!cardSelected) return;
    imageActions.deleteImage(cardSelected);
  };

  const _updateImageHandler = () => {
    navigation.navigate('ImageOption', {
      update: true,
      image_id: cardSelected,
    });
  };

  useEffect(() => {
    imageActions.getAllImage();
  }, [imageState.payload]);

  const renderImageCard = (item) => {
    return (
      <CardCommon
        title={item.name}
        image_url={`${env.BACKEND_IMAGE}/${item.image_url}`}
        onLongPress={() => setCardSelected(item.image_id)}
        selected={item.image_id === cardSelected}
        stretch
      />
    );
  };

  return (
    <ManageElementsWrapperLayout
      title={'Image Administrator'}
      pressAddLabel={'Add Image'}
      onPressAdd={_addImageHandler}
      onPressDelete={_deleteImageHandler}
      onPressUpdate={_updateImageHandler}
      cardSelected={cardSelected}
      setCardSelected={setCardSelected}
    >
      <ListCardCommon
        data={imagesState.payload}
        error={imagesState.error}
        loading={imagesState.loading}
        headerTitle={'Images'}
        keyExtractor={(item) => item.image_id}
        renderItem={renderImageCard}
        padding
      />
    </ManageElementsWrapperLayout>
  );
};

export default ImageScreen;
