import {
  createContext,
  useContext,
  useEffect, 
  useState
} from 'react';

import {
  NativeModules
} from 'react-native';

import {
  GoogleSignin
} from '@react-native-google-signin/google-signin'

import AsyncStorage from '@react-native-async-storage/async-storage';

import http, {
  API
} from './axios';

import {
  lg
} from 'assets/constant';

import useSession from './useSession'

const today = new Date()
  .toLocaleString('en-US', {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });

const initialState = {
  _mode: null,
  _auth: null,
  _lg: lg,
  _loaded: new Date(),
  handleSignIn: () => {},
  handleGGSignIn: () => {},
  handleSignUp: () => {},
  handleSignOut: () => {},

  loadingLang: () => {},
  changeMode: () => {},
}

export const ResourceContext = createContext(initialState);

const useResource = () => useContext(ResourceContext);

const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useSession('resources', {
    _mode: initialState._mode,
    _auth: initialState._auth,
    _lg: initialState._lg,
    _loaded: initialState._loaded,
  });

  useEffect(() => {
    (async ()=>{
      const storage = JSON.parse(await AsyncStorage.getItem('resources'));

      const loaded = new Date(resources._loaded)
        .toLocaleString('en-US', {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        });

      if (!storage && loaded != today) {
        loadingLang()
      } else {
        storage._lg & setResources({
          ...storage
        });
      }
    })();
  }, []);

  const handleSignIn      = async (checking) => {
    try {
      const auth = await http.post(API.signInUrl, checking)
        .then((resp) => {
          const { _auth } = resp.data
          console.log('_auth: ', _auth.email)
          return _auth
        })
        .catch(function(err) { 
          console.log('err: ', err)
          alert(`err: ${resources._lg.message.login_not_found}`)
        })
        .finally(function() {
          // console.log('finally')
        });

      if (!auth) {
        return false
      }

      setResources({
        _auth: auth,
        _mode: resources._mode,
        _lg: resources._lg,
        _loaded: resources._loaded,
      });

      NativeModules.DevSettings.reload();
    } catch (err) {
      console.log('handleSignin-error: ', err)
    }
  }

  const handleGGSignIn      = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      if (!userInfo) {
        return false;
      }

      return handleSignIn(userInfo)
    } catch (error) {
      console.log('GGSignin-error: ', error)
    }

  }

  const handleSignUp      = () => {
    //
  }
  const handleSignOut      = async () => {
    try {
      if (resources._auth.isGoogle) {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      }

      await setResources({
        _auth: null,
        _mode: resources._mode,
        _lg: resources._lg,
        _loaded: resources._loaded,
      });

      NativeModules.DevSettings.reload();

    } catch (error) {
      await setResources({
        _auth: null,
        _mode: resources._mode,
        _lg: resources._lg,
        _loaded: resources._loaded,
      });

      console.log('GGSignout-error: ', error)
      NativeModules.DevSettings.reload();
    }
  }

  const changeMode      = () => {
    setResources({
      _lg: resources._lg,
      _mode: resources._mode === 'dark' ? 'light' : 'dark',
      _auth: resources._auth,
      _loaded: resources._loaded
    });
  }

  const loadingLang       = async (_lang='vn') => {
    try {
      await http.get(`${API.getLanguageUrl}${_lang}`)
        .then(async (resp) => {
          const { _lg } = resp.data;
          const storage = JSON.parse(await AsyncStorage.getItem('resources'));
          _lg & setResources({
            _lg,
            _mode: resources._mode,
            _auth: storage?._auth || {},
            _loaded: new Date()
          });
        })
        .catch(function(err) { 
          console.log('err: ', err)
          alert('err: loading language')
        })
        .finally(function() {
          // console.log('finally')
        })
    } catch (error) {
      setResources({
        _lg: resources._lg,
        _mode: resources._mode,
        _auth: storage?._auth || {},
        _loaded: new Date()
      });

      console.log('loadingLang-error: ', error)
    }
  }

  return (
    <ResourceContext.Provider
      value={{ 
        ...resources,
        handleSignIn,
        handleGGSignIn,
        handleSignUp,
        handleSignOut,
        loadingLang,
        changeMode
      }}
      >
      {children}
    </ResourceContext.Provider>
  );
}

export {
  useResource
}

export default ResourceProvider;