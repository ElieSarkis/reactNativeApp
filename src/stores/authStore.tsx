import {observable} from 'mobx';
import {createContext} from 'react';

class authStore {
  email = observable.box<string>('');
  password = observable.box<string>('');
  user = observable.box({});
  errorState = observable.box('');
  isValidState = observable.box(true);
  isLoading = observable.box(false);
}

export const AuthStore = new authStore();
export const authStoreContext = createContext(new authStore());
