import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../constants';
import BlockCommon from './BlockCommon';
import TextCommon from './TextCommon';

const CardCommon = (props) => {
  const { title, image_url, onPress, stretch, selected, children } = props;

  const imageStyles = [
    styles.cardImage,
    stretch && styles.stretch,
    selected && stretch && { width: 155 },
  ];
  const cardBoxStyles = [
    styles.cardBox,
    selected && {
      borderWidth: 3,
      borderColor: theme.colors.secondary,
    },
  ];

  return (
    <TouchableOpacity {...props} onPress={onPress} style={cardBoxStyles}>
      <BlockCommon d_flex={stretch ? 4 : 1} f_bottom>
        <Image
          source={{
            uri: image_url,
          }}
          style={imageStyles}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 1,
    elevation: theme.sizes.padding / 4,
  },
  stretch: {
    width: 160,
    height: '100%',
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardImage: { width: 65, height: 65, borderRadius: 100 },
});

export default CardCommon;
