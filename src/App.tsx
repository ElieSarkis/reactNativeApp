import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import AddNewTaskScreen from './screens/AddNewTaskScreen';
import HomeScreen from './screens/HomeScreen';
import Details from './screens/Details';
import ModalComponent from './components/ModalComponent/ModalComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainerRef} from '@react-navigation/native';
import i18n from './texts/i18n';
import {observer} from 'mobx-react';
import {languageStoreContext} from './stores/languageStore';
import {modalStoreContext} from './stores/modalStore';
import {todoStoreContext} from './stores/toDoStore';
import {colors} from './colors/colors';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPass from './screens/ForgotPass';
import {firebase} from '@react-native-firebase/auth';
import {authStoreContext} from './stores/authStore';

const Stack = createStackNavigator();

interface Props {
  style: object;
}

const App: React.FC<Props> = observer(({style}) => {
  const languageStore = useContext(languageStoreContext);
  const modalStore = useContext(modalStoreContext);
  const todoStore = useContext(todoStoreContext);
  const authStore = useContext(authStoreContext);
  const language = languageStore.appMainLanguage.get();
  const isLoggedIn = firebase.auth().currentUser;

  const okayButton = async () => {
    modalStore.modalVisible.set(true);
    modalStore.okayButtonStore(todoStore.data);
  };

  useEffect(() => {}, [authStore.user.get()]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              options={{
                title: i18n.get('WELCOME_MESSAGE', language),
                headerTintColor: colors.grey,
              }}
              name="HomeScreen">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <HomeScreen navigation={navigation} />
              )}
            </Stack.Screen>

            <Stack.Screen
              options={{
                title: i18n.get('ADD_NEW_TASKS', language),
                headerTintColor: colors.grey,
              }}
              name="AddNewTaskScreen">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <AddNewTaskScreen navigation={navigation} />
              )}
            </Stack.Screen>

            <Stack.Screen
              options={{
                title: i18n.get('DETAILS', language),
                headerTintColor: colors.grey,
              }}
              name="Details">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <Details />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                title: i18n.get('LOGIN_SCREEN', language),
                headerTintColor: colors.grey,
              }}
              name="LoginScreen">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <LoginScreen navigation={navigation} />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                title: i18n.get('SIGNUP_SCREEN', language),
                headerTintColor: colors.grey,
              }}
              name="SignUpScreen">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <SignUpScreen navigation={navigation} />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                title: i18n.get('FORGOT_PASS', language),
                headerTintColor: colors.grey,
              }}
              name="ForgotPass">
              {({navigation}: {navigation: NavigationContainerRef}) => (
                <ForgotPass navigation={navigation} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>

      <View>
        <ModalComponent
          onPress={() => {
            modalStore.modalVisible.set(false);
          }}
          onPress2={okayButton}
        />
      </View>
    </NavigationContainer>
  );
});

export default App;
