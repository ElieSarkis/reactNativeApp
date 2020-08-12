import {observable} from 'mobx';
import {createContext, ReactText} from 'react';
import {dataType} from '../types/types';
import i18n from '../texts/i18n';
import {LanguageStore} from './languageStore';
import AsyncStorage from '@react-native-community/async-storage';
import {orderBy} from 'lodash';
import {ModalStore} from './modalStore';

class todoStore {
  data = observable.box<dataType[]>([]);
  taskName = observable.box<string>('');
  description = observable.box<string>('');
  ascOrDesc = observable.box<'Desc' | 'Asc'>('Desc');
  markBoxPressed = observable.box<boolean>(false);
  deleteBoxPressed = observable.box<boolean>(false);
  checkBoxState = observable.box<boolean>(false);
  priority = observable.box<ReactText>('Low');
  tag = observable.box<ReactText>('Home');
  markedAllAsDone = observable.box<boolean>(false);
  searchTaskName = observable.box<string>('');
  filteredSearch = observable.box<dataType[]>([]);

  deleteButtonStore = async (id: number) => {
    ModalStore.isModalEditMode.set(false);
    const filteredState = this.data
      .get()
      .filter((element: dataType) => element.id !== id);
    this.data.set(filteredState);
    ModalStore.modalVisible.set(true);
    ModalStore.textInsideModal.set(
      i18n.get('TASK_WITH_ID', LanguageStore.appMainLanguage.get()) +
        id +
        ' ' +
        i18n.get('HAS_BEEN_DELETED', LanguageStore.appMainLanguage.get()),
    );
    try {
      await AsyncStorage.setItem(
        '@list_of_tasks',
        JSON.stringify(filteredState),
      );
    } catch (err) {
      console.log(err);
    }
  };
  sortByDateStore = () => {
    const charsDate = orderBy(this.data.get(), ['id'], ['asc', 'desc']);
    const charsDate2 = orderBy(this.data.get(), ['id'], ['desc', 'asc']);
    if (this.ascOrDesc.get() === 'Asc') {
      this.data.set(charsDate);
      this.ascOrDesc.set('Desc');
    } else if (this.ascOrDesc.get() === 'Desc') {
      this.data.set(charsDate2);
      this.ascOrDesc.set('Asc');
    }
  };
  sortAlphabetically = () => {
    const charsByAlphabets = orderBy(
      this.data.get(),
      ['task'],
      ['asc', 'desc'],
    );
    this.data.set(charsByAlphabets);
  };
  checkBoxFunction = async (id: number, isChecked: boolean) => {
    await this.markBoxPressed.set(false);
    const elementIndex = this.data
      .get()
      .findIndex(element => element.id.toString() === id.toString());
    let newArray = [...this.data.get()];
    newArray[elementIndex] = {
      ...newArray[elementIndex],
      isChecked: !isChecked,
    };
    this.data.set(newArray);
    try {
      await AsyncStorage.setItem('@list_of_tasks', JSON.stringify(newArray));
    } catch (err) {
      console.log(err);
    }
  };
  deleteSelectedFunction = async () => {
    let filteredArray = this.data
      .get()
      .filter(item => item.isSelected !== true);
    this.data.set(filteredArray);
    try {
      await AsyncStorage.setItem(
        '@list_of_tasks',
        JSON.stringify(filteredArray),
      );
    } catch (err) {
      console.log(err);
    }
  };

  markAllAsDoneFunction = () => {
    this.deleteBoxPressed.set(true);
    this.checkBoxState.set(true);
  };
  markAllAsNotDoneFuntion = () => {
    this.deleteBoxPressed.set(true);
    this.checkBoxState.set(false);
  };
}

export const TodoStore = new todoStore();
export const todoStoreContext = createContext(new todoStore());
