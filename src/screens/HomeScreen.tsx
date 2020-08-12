import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';

import {firebase} from '@react-native-firebase/auth';
import {NavigationContainerRef} from '@react-navigation/native';

import {colors} from '../colors/colors';
import DynamicText from '../HigherOrderComponents/DynamicText';
import DynamicView from '../HigherOrderComponents/DynamicView';
import {sizes} from '../sizes/sizes';
import {authStoreContext} from '../stores/authStore';
import {languageStoreContext} from '../stores/languageStore';
import i18n from '../texts/i18n';

import {signOutHelper} from '../helpers/authHelperFunctions';

export interface Props {
  navigation: NavigationContainerRef;
}

const HomeScreen: React.FC<Props> = observer(({navigation}) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();
  const authStore = useContext(authStoreContext);

  const signOut = async () => {
    await signOutHelper(authStore);
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
            fontSize: sizes.getWidth(6),
            textAlign: 'left',
            marginTop: sizes.getHeight(10),
            marginBottom: sizes.getHeight(4),
            color: colors.grey,
            fontFamily: 'GE_East_ExtraBold',
          }}>
          {i18n.get('MORE_INFO_BUTTON', language)}
        </DynamicText>
      </DynamicView>

      <TouchableOpacity
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginTop: sizes.getHeight(6),
          marginLeft: sizes.getWidth(4),
          borderRadius: sizes.getWidth(2),
          marginRight: sizes.getWidth(4),
          alignSelf:
            languageStore.appMainLanguage.get() === 'AR'
              ? 'flex-end'
              : 'flex-start',
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
      <TouchableOpacity
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginTop: sizes.getHeight(6),
          marginLeft: sizes.getWidth(4),
          borderRadius: sizes.getWidth(2),
          marginRight: sizes.getWidth(4),
          alignSelf: language === 'AR' ? 'flex-end' : 'flex-start',
        }}
        onPress={() => navigation.navigate('AddNewTaskScreen')}>
        <DynamicView
          style={{
            alignSelf: 'center',
          }}>
          <DynamicText
            style={{
              paddingTop: sizes.getWidth(3),
              fontFamily: 'GE_East_ExtraBold',
              fontSize: sizes.getWidth(5),
              color: colors.white,
            }}>
            {i18n.get('ADD_TASK', language)}
          </DynamicText>
        </DynamicView>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginLeft: sizes.getWidth(4),
          marginRight: sizes.getWidth(4),
          marginTop: sizes.getHeight(6),
          borderRadius: sizes.getWidth(2),
          alignSelf:
            languageStore.appMainLanguage.get() === 'AR'
              ? 'flex-end'
              : 'flex-start',
        }}
        onPress={() => navigation.navigate('Details')}>
        <DynamicView
          style={{
            alignSelf: 'center',
          }}>
          <DynamicText
            style={{
              paddingTop: sizes.getWidth(3),
              fontFamily: 'GE_East_ExtraBold',
              fontSize: sizes.getWidth(5),
              color: colors.white,
            }}>
            {i18n.get('SEE_ALL', languageStore.appMainLanguage.get())}
          </DynamicText>
        </DynamicView>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: sizes.getWidth(60),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12.5),
          marginBottom: sizes.getHeight(4),
          marginTop: sizes.getHeight(6),
          marginLeft: sizes.getWidth(4),
          borderRadius: sizes.getWidth(2),
          marginRight: sizes.getWidth(4),
          alignSelf:
            languageStore.appMainLanguage.get() === 'AR'
              ? 'flex-end'
              : 'flex-start',
        }}
        onPress={signOut}>
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
            {i18n.get('SIGN_OUT', languageStore.appMainLanguage.get())}
          </DynamicText>
        </DynamicView>
      </TouchableOpacity>
    </DynamicView>
  );
});

export default HomeScreen;
