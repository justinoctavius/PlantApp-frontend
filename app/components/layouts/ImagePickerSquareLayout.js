import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../constants';
import { BlockCommon, TextCommon } from '../common';

const ImagePickerSquareLayout = ({ onPress, image_url }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BlockCommon style={styles.imagePicker}>
        {image_url ? (
          <Image
            source={{
              uri: image_url,
            }}
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

export default ImagePickerSquareLayout;
