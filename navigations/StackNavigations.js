import React, {
  useEffect,
  useState
} from 'react';

import { 
  Button, 
  View,
  Image,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import { 
  NavigationContainer 
} from '@react-navigation/native';

import { 
  createNativeStackNavigator 
} from '@react-navigation/native-stack';

import {
  useResource
} from 'utils/useResource'

import Theme from 'assets/theme'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SignInScreen,
  HomeScreen,
  ProfileScreen,
  NotificationsScreen,
  SettingsScreen
} from 'scenes';

const Stack = createNativeStackNavigator();

function StackApp() {
  const { _mode, _lg, handleSignOut, loadingLang } = useResource();
  const [auth, setAuth] = useState();
  const [isSignIn, setIsSignIn] = useState(null);

  const checkAuthor = async() => {
    const { _auth } = JSON.parse(await AsyncStorage.getItem('resources'))

    if (_auth && _auth?.token) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }

  useEffect(() => {
    checkAuthor()
  }, [checkAuthor]);

  if (null === isSignIn || !_lg) {
    return null;
  }

  const { page } = _lg

  const theme = Theme[_mode || Theme.mode];

  const checkIsLoginRedirect = (navigation) => {
    isSignIn ? navigation.navigate(page.home) : null
  }

  const checkIsNotLoginRedirect = (navigation) => {
    !isSignIn ? navigation.navigate('Signin') : null
  }

  return (
    <NavigationContainer theme={ theme } >
      <Stack.Navigator
        initialRouteName={isSignIn ? 'Home' : 'SignIn'}
        screenOptions={({navigation}) => ({
          // headerStyle: {
          //   height: 150,
          //   backgroundColor: '#f4511e',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          headerRight: () => ( 
            <TouchableOpacity 
              // onPress={ loadingLang }
              onPress={ () => navigation.navigate(page.setting) }
              >
              <Image 
                source={{ uri: theme.URL.rightIconSetting }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  marginVertical: 10
                }}
                />
            </TouchableOpacity>
          )
        })}
        >
        <Stack.Screen 
          name={ page.home } 
          component={ HomeScreen } 
          listeners={({navigation}) => ({
            focus: () => checkIsNotLoginRedirect(navigation)
          })}
          />
        <Stack.Screen 
          name={ page.notification }
          component={NotificationsScreen} 
          listeners={({navigation}) => ({
            focus: () => checkIsNotLoginRedirect(navigation)
          })}
          />
        <Stack.Screen 
          name={ page.profile }
          component={ProfileScreen} 
          listeners={({navigation}) => ({
            focus: () => checkIsNotLoginRedirect(navigation)
          })}
          />
        <Stack.Screen 
          name={ page.setting }
          component={ SettingsScreen } 
          listeners={({navigation}) => ({
            focus: () => checkIsNotLoginRedirect(navigation)
          })}
          />
        <Stack.Screen 
          name="SignIn" 
          component={ SignInScreen } 
          options={{
            headerShown: false
          }}
          listeners={({navigation}) => ({
            focus: () => checkIsLoginRedirect(navigation)
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackApp;
