import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import {NavigationContainerRef} from '@react-navigation/native';

import {colors} from '../colors/colors';
import AuthComponent from '../components/FormsComponents/AuthForm/AuthComponent';
import {__isValidEmail, signInOrUpHelper} from '../helpers/authHelperFunctions';
import DynamicText from '../HigherOrderComponents/DynamicText';
import DynamicView from '../HigherOrderComponents/DynamicView';
import {sizes} from '../sizes/sizes';
import {authStoreContext} from '../stores/authStore';
import {languageStoreContext} from '../stores/languageStore';
import i18n from '../texts/i18n';

export interface Props {
  navigation: NavigationContainerRef;
}

const LoginScreen: React.FC<Props> = observer(({navigation}) => {
  const languageStore = useContext(languageStoreContext);
  const authStore = useContext(authStoreContext);
  const language = languageStore.appMainLanguage.get();

  const onLoginPress = () => {
    signIn();
  };

  const signIn = async () => {
    console.log('aaa->', await signInOrUpHelper(authStore));
    if ((await signInOrUpHelper(authStore)) === false) return;
    console.log('sssss->', authStore.isValidState.get());
    try {
      authStore.isLoading.set(true);
      let response = await auth().signInWithEmailAndPassword(
        authStore.email.get(),
        authStore.password.get(),
      );

      if (response && response.user) {
        authStore.user.set(response.user);
        authStore.email.set('');
        authStore.password.set('');
        Alert.alert('Success ✅', 'Logged successfully');
      }
    } catch (e) {
      authStore.errorState.set(e.message);
    } finally {
      authStore.isLoading.set(false);
    }
  };

  return (
    <DynamicView
      style={{
        flex: 1,
        width: sizes.getWidth(106),
      }}>
      <DynamicView>
        <DynamicText
          style={{
            fontSize: sizes.getWidth(5),
            textAlign: 'center',
            marginTop: sizes.getHeight(10),
            marginBottom: sizes.getHeight(4),
            color: colors.grey,
            fontFamily: 'GE_East_ExtraBold',
          }}>
          {i18n.get('WANT_TO_SIGN_IN', language)}
        </DynamicText>
      </DynamicView>

      <DynamicText
        style={{
          alignSelf: 'center',
          color: colors.red,
        }}>
        {authStore.errorState.get()}
      </DynamicText>
      <AuthComponent
        props={i18n.get('LOGIN_SCREEN', language)}
        onPress={onLoginPress}
        navigation={navigation}
      />

      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('SignUpScreen');
          authStore.errorState.set('');
          authStore.email.set('');
          authStore.password.set('');
        }}>
        <Text>{i18n.get('NO_EMAIL', language)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('ForgotPass');
          authStore.errorState.set('');
          authStore.email.set('');
          authStore.password.set('');
        }}>
        <Text> {i18n.get('FORGOT_PASS2', language)}</Text>
      </TouchableOpacity>
    </DynamicView>
  );
});

export default LoginScreen;
