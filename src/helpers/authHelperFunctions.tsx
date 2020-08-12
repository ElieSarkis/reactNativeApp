import {firebase} from '@react-native-firebase/auth';

export const __isValidEmail = (email: any) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const passworldLength = 6;

export const signInOrUpHelper = async (authStore: any) => {
  console.log(authStore.password.get());
  if (!authStore.email.get()) {
    authStore.errorState.set('Email required *');
    authStore.isValidState.set(false);
    return false;
  }
  if (!authStore.password.get()) {
    authStore.errorState.set(`Weak password, minimum ${passworldLength} chars`);
    authStore.isValidState.set(false);
    return false;
  }
  if (!__isValidEmail(authStore.email.get())) {
    authStore.errorState.set('Invalid Email');
    authStore.isValidState.set(false);
    return false;
  }
  authStore.isValidState.set(true);
  return true;
};

export const signOutHelper = async (authStore: any) => {
  await firebase.auth().signOut();
  authStore.user.set({});
  authStore.errorState.set('');
};
