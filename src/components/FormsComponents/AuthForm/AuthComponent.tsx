import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';

import {NavigationContainerRef} from '@react-navigation/native';

import {colors} from '../../../colors/colors';
import DynamicText from '../../../HigherOrderComponents/DynamicText';
import DynamicView from '../../../HigherOrderComponents/DynamicView';
import {sizes} from '../../../sizes/sizes';
import {authStoreContext} from '../../../stores/authStore';
import {languageStoreContext} from '../../../stores/languageStore';
import i18n from '../../../texts/i18n';

export interface Props {
  navigation: NavigationContainerRef;
  onPress: any;
  props: any;
}

const HomeScreen: React.FC<Props> = observer(({navigation, onPress, props}) => {
  const languageStore = useContext(languageStoreContext);
  const authStore = useContext(authStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <DynamicView
      style={{
        width: sizes.getWidth(106),
      }}>
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
      <TextInput
        placeholder={i18n.get('ENTER_PASSWORD', language)}
        onChangeText={data => authStore.password.set(data)}
        value={authStore.password.get()}
        secureTextEntry={true}
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
        }}
      />
      <TouchableOpacity
        // disabled={authStore.errorState.get().length > 0 ? true : false}
        onPress={onPress}
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
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <DynamicText
          style={{
            paddingTop: sizes.getWidth(3),
            fontSize: sizes.getWidth(5),
            color: colors.white,
            fontFamily: 'GE_East_ExtraBold',
            alignSelf: 'center',
            paddingBottom: sizes.getHeight(3),
            marginEnd: sizes.getWidth(3),
          }}>
          {/* {i18n.get('SUBMIT', language)} */}
          {props}
        </DynamicText>
        {authStore.isLoading.get() && (
          <ActivityIndicator
            style={{paddingBottom: sizes.getHeight(1)}}
            color="white"
            size="large"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginTop: sizes.getHeight(2),
          marginLeft: sizes.getWidth(4),
          borderRadius: sizes.getWidth(2),
          marginRight: sizes.getWidth(4),
          alignSelf: 'center',
        }}
        onPress={() => {
          languageStore.onChangeLanguage();
        }}>
        <DynamicView
          style={{
            alignSelf: 'center',
          }}>
          <DynamicText
            style={{
              paddingTop: sizes.getWidth(3),
              fontSize: sizes.getWidth(5),
              color: colors.white,
              fontFamily: 'GE_East_ExtraBold',
            }}>
            {i18n.get('CHANGE_LANGUAGE', language)}
          </DynamicText>
        </DynamicView>
      </TouchableOpacity>
    </DynamicView>
  );
});

export default HomeScreen;
