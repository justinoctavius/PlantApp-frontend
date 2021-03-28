import React, { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BlockCommon, ButtonCommon, TextCommon } from '../../components/common';
import { theme } from '../../constants';

const WelcomeScreen = ({ navigation, illustrations }) => {
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    navigation.setOptions({ header: () => null });
  }, []);

  const _signInHandler = () => {
    navigation.navigate('SignIn');
  };

  const _signUpHandler = () => {
    navigation.navigate('SignUp');
  };

  return (
    <BlockCommon>
      <BlockCommon f_center style={{ flex: 0.5, justifyContent: 'flex-end' }}>
        <TextCommon title center bold>
          Your Home{' '}
          <TextCommon title primary>
            Greener
          </TextCommon>
        </TextCommon>
        <TextCommon center gray semibold>
          Enjoy the experience
        </TextCommon>
      </BlockCommon>

      <BlockCommon
        style={{
          paddingVertical: theme.sizes.padding,
        }}
      >
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={illustrations}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Image
              source={item.source}
              resizeMode="contain"
              style={{
                width,
                height: height / 2.5,
                marginVertical: theme.sizes.margin,
                overflow: 'visible',
              }}
            />
          )}
        />
      </BlockCommon>

      <BlockCommon
        middle
        style={{
          flex: 0.5,
          marginVertical: 0,
          marginHorizontal: theme.sizes.padding * 2,
        }}
      >
        <ButtonCommon
          text="Sign In"
          gradient
          color={'primary'}
          onPress={_signInHandler}
        >
          <TextCommon white semibold center>
            Sign In
          </TextCommon>
        </ButtonCommon>
        <ButtonCommon shadow onPress={_signUpHandler}>
          <TextCommon semibold center>
            Sign Up
          </TextCommon>
        </ButtonCommon>
      </BlockCommon>
    </BlockCommon>
  );
};

WelcomeScreen.defaultProps = {
  illustrations: [
    { id: 1, source: require('./../../../assets/images/illustration_1.png') },
    { id: 2, source: require('./../../../assets/images/illustration_2.png') },
    { id: 3, source: require('./../../../assets/images/illustration_3.png') },
  ],
};

export default WelcomeScreen;
