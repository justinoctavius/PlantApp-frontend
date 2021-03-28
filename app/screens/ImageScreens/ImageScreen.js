import React, { useContext, useEffect, useState } from 'react';
import { CardCommon, ListCardCommon } from '../../components/common';
import FatherElementLayout from '../../components/layouts/FatherElementLayout';
import { env } from '../../config';
import { ImageContext } from '../../context/stores';

const ImageScreen = ({ navigation }) => {
  const { imageState, imagesState, imageActions } = useContext(ImageContext);
  const [cardSelected, setCardSelected] = useState('');

  const _getAllImageHandler = async () => {
    await imageActions.getAllImage();
  };

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
    _getAllImageHandler();
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
    <FatherElementLayout
      title={'Image'}
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
        keyExtractor={(item) => item.image_id}
        renderItem={renderImageCard}
      />
    </FatherElementLayout>
  );
};

export default ImageScreen;
