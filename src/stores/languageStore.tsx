import {observable} from 'mobx';
import {createContext} from 'react';

class languageStore {
  appMainLanguage = observable.box<'ENG' | 'AR'>('ENG');
  onChangeLanguage = () => {
    if (this.appMainLanguage.get() === 'ENG') {
      this.appMainLanguage.set('AR');
      return;
    } else {
      this.appMainLanguage.set('ENG');
    }
  };
}

export const LanguageStore = new languageStore();
export const languageStoreContext = createContext(new languageStore());
