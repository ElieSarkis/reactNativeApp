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

const SignUpScreen: React.FC<Props> = observer(({navigation}) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();
  const authStore = useContext(authStoreContext);

  const onSignUpPress = () => {
    signUp();
  };

  const signUp = async () => {
    if ((await signInOrUpHelper(authStore)) === false) return;

    try {
      authStore.isLoading.set(true);
      let response = await auth().createUserWithEmailAndPassword(
        authStore.email.get(),
        authStore.password.get(),
      );
      if (response && response.user) {
        console.log('response---->', response);
        authStore.user.set(response.user);
        authStore.email.set('');
        authStore.password.set('');
        Alert.alert('Success ✅', 'Sign Up successful');
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
          {i18n.get('WANT_TO_SIGN_UP', language)}
        </DynamicText>
        <DynamicText style={{alignSelf: 'center', color: colors.red}}>
          {authStore.errorState.get()}
        </DynamicText>
      </DynamicView>
      <AuthComponent
        props={i18n.get('SIGNUP_SCREEN', language)}
        onPress={onSignUpPress}
        navigation={navigation}
      />
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('LoginScreen');
          authStore.errorState.set('');
          authStore.email.set('');
          authStore.password.set('');
        }}>
        <Text> {i18n.get('ALREADY_HAVE_ACC', language)}</Text>
      </TouchableOpacity>
    </DynamicView>
  );
});

export default SignUpScreen;
