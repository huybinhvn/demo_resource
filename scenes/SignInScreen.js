import React, {
  useEffect,
  useState
} from 'react';

import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '@react-navigation/native'

import {
  useResource
} from '../utils/useResource'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

import {
  clientId
} from 'assets/constant'

import {
  TokenClearingView
} from 'components'

import signInImg from '../assets/images/SignIn-Logo.png'

function SignInScreen({ navigation }) {
  const { _lg, _auth, handleSignIn, handleGGSignIn } = useResource();
  const { colors } = useTheme()
  const [userInfo, setUserInfo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const configureGoogleSignIn = async() => {
    await GoogleSignin.configure({
      iosClientId: clientId,
      webClientId: clientId,
      offlineAccess: false,
      profileImageSize: 150,
    });
  }

  const getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      userInfo & handleGGSignIn(userInfo);
    } catch (error) {
      console.log('gglogin-error: ', error)
    }
  }

  useEffect(() => {
    configureGoogleSignIn()

  }, [configureGoogleSignIn])

  if (null === _lg || !_lg) {
    return null
  }

  const { login } = _lg

  const onSignInAction = () => {
    if (email !== '' && password !== '') {
      if (email.trim()) {
        try {
          const checking = { 'email': email, 'password': password }
          handleSignIn(checking)
        } catch (e) {
          console.log('error: ', e)
        }
      } else {
        alert('error: login error')
      }
    } else {
      alert('error: login filling required')
    }
  }

  return (
    <View
    style={{
      flex: 1,
      alignItems: 'center',
    }}
    >
      <SafeAreaView 
        style={{
          flex: 1,
          marginHorizontal: 30,
          flexDirection: 'column',
          width: '80%'
        }}
        >
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 100,
              marginTop: -50,
              marginBottom: 30
            }}
            >
            <Image
              source={ signInImg }
              style={{
                width: 100,
                height: 100
              }}
              />
          </View>
          <Text 
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: colors.primary,
              alignSelf: "center",
              paddingBottom: 24,
            }}
            >
            { login?.signin }
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              height: 58,
              width: '100%',
              marginBottom: 20,
              fontSize: 16,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 12,
            }}
            placeholder={ login?.enter_email }
            placeholderTextColor={ colors.border }
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={ false }
            value={ email }
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              height: 58,
              width: '100%',
              marginBottom: 20,
              fontSize: 16,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 12,
            }}
            placeholder={ _lg?.login?.enter_password }
            placeholderTextColor={ colors.border }
            autoCapitalize="none"
            autoCorrect={ false }
            secureTextEntry={ true }
            textContentType="password"
            value={ password }
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity 
            style={{
              backgroundColor: 'orange',
              height: 48,
              width: '40%',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: 20,
            }} 
            onPress={() => onSignInAction()} 
            >
            <Text 
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 18
              }} > 
              { login?.signin_btn }
            </Text>
          </TouchableOpacity>
        </View>
        <View 
          style={{
            flex: 0.3,
            justifyContent: 'flex-start',
          }}
          >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
            <View 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={ GoogleSigninButton.Color.Dark }
                  onPress={ handleGGSignIn }
                  // style={{ 
                  //   // width: '100%', 
                  //   height: 58,
                  // }}
                  // color={GoogleSigninButton.Color.Light}
                  // size={ GoogleSigninButton.Size.Standard }
                />
              </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SignInScreen;
  