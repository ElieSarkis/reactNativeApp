import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

import {firebase} from '@react-native-firebase/auth';
import {NavigationContainerRef} from '@react-navigation/native';

import {colors} from '../colors/colors';
import DynamicText from '../HigherOrderComponents/DynamicText';
import DynamicView from '../HigherOrderComponents/DynamicView';
import {sizes} from '../sizes/sizes';
import {authStoreContext} from '../stores/authStore';
import {languageStoreContext} from '../stores/languageStore';
import i18n from '../texts/i18n';

export interface Props {
  navigation: NavigationContainerRef;
}

const AddNewTaskScreen: React.FC<Props> = observer(() => {
  const authStore = useContext(authStoreContext);
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();

  const sendPasswordResetEmail = () => {
    firebase.auth().sendPasswordResetEmail(authStore.email.get());
    authStore.email.set('');
  };

  return (
    <DynamicView>
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
          {i18n.get('FORGOT_PASSWORD', language)}
        </DynamicText>
      </DynamicView>

      <TextInput
        placeholder={i18n.get('ENTER_EMAIL', language)}
        onChangeText={data => authStore.email.set(data)}
        value={authStore.email.get()}
        style={{
          height: sizes.getHeight(13),
          borderColor: colors.grey,
          borderWidth: 1,
          alignSelf: 'center',
          width: sizes.getWidth(93),
          marginBottom: sizes.getHeight(6),
          borderRadius: sizes.getWidth(3),
          backgroundColor: colors.white,
          minHeight: sizes.getHeight(12),
          marginTop: sizes.getHeight(6),
        }}
      />

      <TouchableOpacity
        onPress={sendPasswordResetEmail}
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginTop: sizes.getHeight(6),
          marginLeft: sizes.getWidth(4),
          borderRadius: sizes.getWidth(2),
          marginRight: sizes.getWidth(4),
          alignSelf: 'center',
        }}>
        <Text
          style={{
            paddingTop: sizes.getWidth(3),
            fontSize: sizes.getWidth(5),
            color: colors.white,
            fontFamily: 'GE_East_ExtraBold',
            alignSelf: 'center',
          }}>
          Send Email
        </Text>
      </TouchableOpacity>
    </DynamicView>
  );
});

export default AddNewTaskScreen;
