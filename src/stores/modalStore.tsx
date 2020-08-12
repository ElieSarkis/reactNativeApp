import {observable} from 'mobx';
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../texts/i18n';
import {LanguageStore} from './languageStore';
import {TodoStore} from './toDoStore';

class modalStore {
  isModalEditMode = observable.box<boolean>(false);
  idOfTaskToBeUpdated = observable.box<number>();
  modalVisible = observable.box<boolean>(false);
  updatedToDoTask = observable.box<string>('');
  task = observable.box<boolean>(false);
  textInsideModal = observable.box<string>('');
  ascOrDesc = observable.box<'Desc' | 'Asc'>('Desc');

  okayButtonStore = async (data: any) => {
    if (this.isModalEditMode.get()) {
      const elementsIndex = data
        .get()
        .findIndex(
          (element: any) =>
            element.id.toString() === this.idOfTaskToBeUpdated.get().toString(),
        );
      this.modalVisible.set(false);
      let newArray = [...data.get()];
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        task: this.updatedToDoTask.get(),
      };
      data.set(newArray);
      try {
        await AsyncStorage.setItem('@list_of_tasks', JSON.stringify(newArray));
      } catch (err) {
        console.log(err);
      }
      this.updatedToDoTask.set('');
      this.modalVisible.set(false);
    } else {
      this.modalVisible.set(false);
    }
  };
  todoStoreUseEffect = () => {
    if (TodoStore.data.get().length > 0) {
      this.task.set(true);
    } else if (TodoStore.data.get().length < 1) {
      this.task.set(false);
    }
  };
  editTaskStore = (id: number) => {
    this.idOfTaskToBeUpdated.set(id);
    this.isModalEditMode.set(true);
    this.modalVisible.set(true);
    this.textInsideModal.set(
      i18n.get('EDIT_THIS_TASK', LanguageStore.appMainLanguage.get()),
    );
  };
}

export const ModalStore = new modalStore();
export const modalStoreContext = createContext(new modalStore());
