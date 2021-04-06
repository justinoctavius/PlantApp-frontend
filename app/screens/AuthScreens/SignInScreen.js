import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  BlockCommon,
  ButtonCommon,
  ErrorCommon,
  InputCommon,
  LoadingCommon,
  TextCommon,
} from '../../components/common/';
import { theme } from '../../constants';
import { AuthContext } from '../../context/stores';
import { validate } from '../../utils';

const SignInScreen = ({ navigation }) => {
  const { authState, authActions } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _signInHandler = async () => {
    const isValid = validate.notEmty([username, password]);
    if (isValid) {
      await authActions.signIn(username, password);
    }
  };

  return (
    <BlockCommon m1>
      <BlockCommon d_flex={0.5}>
        <TextCommon title bold>
          Login
        </TextCommon>
      </BlockCommon>
      <BlockCommon d_flex={2}>
        <InputCommon
          label="Username"
          style={styles.textInput}
          value={username}
          require
          onChangeText={(e) => setUsername(e)}
        />
        <InputCommon
          label="Password"
          style={styles.textInput}
          value={password}
          require
          onChangeText={(e) => setPassword(e)}
          secure
        />
        <ErrorCommon caption text={authState.error} />
      </BlockCommon>
      <BlockCommon>
        <ButtonCommon
          gradient
          onPress={authState.loading ? null : _signInHandler}
        >
          <TextCommon center white semibold>
            {authState.loading ? <LoadingCommon color={'white'} /> : 'Sign In'}
          </TextCommon>
        </ButtonCommon>
        <ButtonCommon colorless onPress={() => navigation.navigate('SignUp')}>
          <TextCommon center gray semibold>
            You don't have account?{' '}
            <TextCommon secondary bold>
              Sign Up
            </TextCommon>
          </TextCommon>
        </ButtonCommon>
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: theme.sizes.margin,
  },
});

export default SignInScreen;
