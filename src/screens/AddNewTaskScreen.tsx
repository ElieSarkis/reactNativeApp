import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavigationContainerRef } from '@react-navigation/native';

import { colors } from '../colors/colors';
import PriorityPicker from '../components/PickerComponent/PriorityPicker';
import TagPicker from '../components/PickerComponent/TagPicker';
import EnterDescriptionInput from '../components/TextInputComponent/EnterDescriptionInput';
import EnterTaskInput from '../components/TextInputComponent/EnterTaskInput';
import { saveDataAsync } from '../helpers/asyncHelperFunctions';
import DynamicText from '../HigherOrderComponents/DynamicText';
import DynamicView from '../HigherOrderComponents/DynamicView';
import { sizes } from '../sizes/sizes';
import { languageStoreContext } from '../stores/languageStore';
import { modalStoreContext } from '../stores/modalStore';
import { todoStoreContext } from '../stores/toDoStore';
import i18n from '../texts/i18n';

export interface Props {
  navigation: NavigationContainerRef;
}
const AddNewTaskScreen: React.FC<Props> = observer(({navigation}) => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const modalStore = useContext(modalStoreContext);
  const language = languageStore.appMainLanguage.get();

  const saveDataAsyncHelper = async () => {
    modalStore.isModalEditMode.set(false);
    if (todoStore.taskName.get().length > 3) {
      modalStore.textInsideModal.set(i18n.get('TASK_ADDED', language));
    } else if (todoStore.taskName.get().length < 4) {
      modalStore.textInsideModal.set(
        i18n.get('ENTER_FOUR_CHARACTERS', language),
      );
    }
    modalStore.modalVisible.set(true);
    await saveDataAsync(todoStore, languageStore);
  };

  return (
    <ScrollView>
      <DynamicView style={{marginTop: 20}}>
        <EnterTaskInput />

        <EnterDescriptionInput />

        <DynamicText
          style={{
            paddingTop: sizes.getHeight(2),
            fontFamily: 'GE_East_ExtraBold',
            fontSize: sizes.getWidth(5),
            color: colors.grey,
            textAlign: 'center',
            paddingBottom: sizes.getHeight(1.5),
          }}>
          {i18n.get('CHOOSE_PR_TAG', language)}
        </DynamicText>

        <PriorityPicker />
        <TagPicker />

        <TouchableOpacity
          style={{
            width: sizes.getWidth(96),
            backgroundColor: colors.grey,
            height: sizes.getHeight(12.5),
            alignSelf: 'center',
            borderRadius: sizes.getWidth(2),
          }}
          onPress={saveDataAsyncHelper}>
          <DynamicView
            style={{
              alignSelf: 'center',
            }}>
            <DynamicText
              style={{
                paddingTop: sizes.getHeight(2.2),
                fontFamily: 'GE_East_ExtraBold',
                fontSize: sizes.getWidth(5),
                color: colors.white,
              }}>
              {i18n.get('CONFIRM', language)}
            </DynamicText>
          </DynamicView>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: sizes.getWidth(96),
            backgroundColor: colors.grey,
            height: sizes.getHeight(12.5),
            alignSelf: 'center',
            marginTop: sizes.getHeight(5),
            borderRadius: sizes.getWidth(2),
          }}
          onPress={() => navigation.navigate('Details')}>
          <DynamicView
            style={{
              alignSelf: 'center',
            }}>
            <DynamicText
              style={{
                paddingTop: sizes.getHeight(2.2),
                fontFamily: 'GE_East_ExtraBold',
                fontSize: sizes.getWidth(5),
                color: colors.white,
              }}>
              {i18n.get('SEE_TASKS', language)}
            </DynamicText>
          </DynamicView>
        </TouchableOpacity>
      </DynamicView>
    </ScrollView>
  );
});

export default AddNewTaskScreen;
