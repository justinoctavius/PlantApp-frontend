import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
  BlockCommon,
  ButtonCommon,
  InputCommon,
  LoadingCommon,
  TextCommon,
} from '../../components/common';
import { theme } from '../../constants';
import { AuthContext } from '../../context/stores';
import { validate } from '../../utils';

const SignUpScreen = ({ navigation }) => {
  const { authState, authActions } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState('');

  const _signUpHandler = async () => {
    if (password != confirmPassword) {
      return setPasswordInvalid('The passwords are not similars');
    } else {
      const isValid = validate.notEmty([
        username,
        email,
        password,
        confirmPassword,
        passwordInvalid,
      ]);
      if (isValid) {
        setPasswordInvalid('');
        await authActions.signUp(username, password, email);
      }
    }
  };

  return (
    <BlockCommon>
      <BlockCommon p1 d_flex={false}>
        <TextCommon title bold>
          Register
        </TextCommon>
      </BlockCommon>
      <KeyboardAwareScrollView>
        <BlockCommon p1>
          <InputCommon
            label="Username"
            style={styles.textInput}
            value={username}
            onChangeText={(e) => setUsername(e)}
            require
          />
          <InputCommon
            label="Email"
            email
            style={styles.textInput}
            value={email}
            onChangeText={(e) => setEmail(e)}
            require
          />
          <InputCommon
            label="Password"
            style={styles.textInput}
            value={password}
            onChangeText={(e) => setPassword(e)}
            require
            secure
          />
          <InputCommon
            label="Confirm password"
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={(e) => setConfirmPassword(e)}
            require
            secure
          />
          <TextCommon center danger>
            {authState.error || passwordInvalid}
          </TextCommon>
        </BlockCommon>
        <BlockCommon p1>
          <ButtonCommon gradient onPress={_signUpHandler}>
            <TextCommon center white semibold>
              {authState.loading ? (
                <LoadingCommon color={'white'} />
              ) : (
                'Sign Up'
              )}
            </TextCommon>
          </ButtonCommon>
          <ButtonCommon colorless onPress={() => navigation.navigate('SignIn')}>
            <TextCommon center gray semibold>
              Already have an account?{' '}
              <TextCommon center bold secondary>
                Sign In
              </TextCommon>
            </TextCommon>
          </ButtonCommon>
        </BlockCommon>
      </KeyboardAwareScrollView>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: theme.sizes.margin,
  },
});

export default SignUpScreen;
