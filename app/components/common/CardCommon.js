import React, { useContext, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../constants';
import { AuthContext } from '../../context/stores';
import BlockCommon from './BlockCommon';
import TextCommon from './TextCommon';

const CardCommon = (props) => {
  const { authState } = useContext(AuthContext);
  const { title, image_url, onPress, stretch, selected, children } = props;
  const [isAdmin, setIsAdmin] = useState(authState.payload?.admin);

  const imageStyles = [
    styles.cardImage,
    stretch && styles.stretch,
    selected && isAdmin && stretch && { width: 155 },
  ];
  const cardBoxStyles = [
    styles.cardBox,
    selected &&
      isAdmin && {
        borderWidth: 3,
        borderColor: theme.colors.secondary,
      },
  ];

  const imageContainerStyles = [styles.imageContainer, stretch && { flex: 4 }];

  const imageBoxStyles = [
    styles.imageBox,
    stretch && { backgroundColor: 'transparent' },
  ];

  return (
    <TouchableOpacity {...props} onPress={onPress} style={cardBoxStyles}>
      <BlockCommon style={imageContainerStyles}>
        <BlockCommon style={imageBoxStyles}>
          <Image
            source={{
              uri: image_url,
            }}
            style={imageStyles}
            resizeMode="contain"
          />
        </BlockCommon>
      </BlockCommon>
      <BlockCommon d_flex={stretch ? 0 : 1} f_middle>
        <TextCommon gray h4 center>
          {title}
        </TextCommon>
        {children}
      </BlockCommon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: theme.colors.white,
    width: 160,
    height: 175,
    margin: theme.sizes.margin / 2,
    borderRadius: theme.sizes.radius,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    elevation: theme.sizes.padding / 4,
  },
  stretch: {
    width: 160,
    height: '100%',
    borderRadius: 0,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageBox: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: theme.colors.gray3,
  },
  cardImage: {
    width: 55,
    height: 55,
  },
});

export default CardCommon;
