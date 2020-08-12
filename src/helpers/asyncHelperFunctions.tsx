import AsyncStorage from '@react-native-community/async-storage';

import { ModalStore } from '../stores/modalStore';
import i18n from '../texts/i18n';

let today = new Date();
let thisDate =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export const saveDataAsync = async (todoStore: any, languageStore: any) => {
  ModalStore.isModalEditMode.set(false);
  if (todoStore.taskName.get().length > 3) {
    const newestId =
      todoStore.data.get().length < 1
        ? 0
        : todoStore.data.get().length > 0 &&
          todoStore.data.get()[todoStore.data.get().length - 1].id + 1;
    let newState = [
      ...todoStore.data.get(),
      {
        task: todoStore.taskName.get(),
        description: todoStore.description.get(),
        Date: thisDate,
        id: newestId,
        isChecked: false,
        isSelected: false,
        tag: todoStore.tag.get(),
        priority: todoStore.priority.get(),
      },
    ];
    todoStore.data.set(newState);
    todoStore.taskName.set('');
    todoStore.description.set('');
    ModalStore.textInsideModal.set(
      i18n.get('TASK_ADDED', languageStore.appMainLanguage.get()),
    );
    ModalStore.modalVisible.set(true);

    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem('@list_of_tasks', jsonValue);
    } catch (error) {
      console.log(error);
    }
  } else {
    ModalStore.modalVisible.set(true);
    ModalStore.textInsideModal.set(
      i18n.get('ENTER_FOUR_CHARACTERS', languageStore.appMainLanguage.get()),
    );
  }
  todoStore.priority.set('Low');
  todoStore.tag.set('Home');
};

export const getAsyncData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@list_of_tasks');

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
