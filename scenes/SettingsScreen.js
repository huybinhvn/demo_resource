import React, { 
  useState 
} from 'react'

import { 
  Button, 
  View,
  Text,
  Switch,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto' 
import AntDesign from 'react-native-vector-icons/AntDesign' 

import {
  useResource
} from 'utils/useResource'

import {
  RadioButtons
} from 'components'

function SettingsScreen({ navigation }) {
  const { _lg, _auth, _mode, changeMode, loadingLang, handleSignOut } = useResource()
  const { languages, common } = _lg
  const [checked, setChecked] = useState(common.lg)
  const [isEnabled, setIsEnabled] = useState(_mode === 'dark')
  const { colors, PNG } = useTheme()
  const { page, setting } = _lg

  const handleLoadLang = (lang) => {
    loadingLang(lang)
    setChecked(lang)
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    changeMode()
  }

  return (
    <View 
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
      }}>
      <View 
        style={{
          flex: 0.075,
          flexDirection: 'row'
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
          {
            languages.map((item, i) => {
              return(
                <RadioButtons 
                  key={ i } 
                  label={ item } 
                  val={ item }
                  checked={ checked }
                  setChecked={ handleLoadLang }
                  style={{
                    color: colors.text,
                    buttonColor: colors.text,
                    buttonCheckedColor: colors.text,
                    textTransform: 'capitalize'
                  }}
                  />
              )
            })
          }
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
          <Text
            style={{
              fontSize: 14,
            }}
            >
            🔆
          </Text>
          <Switch
            trackColor={{
              false: '#000', 
              true: '#FFF'
            }}
            thumbColor={isEnabled ? '#000' : '#FFF'}
            // ios_backgroundColor="#00000001"
            onValueChange={ toggleSwitch }
            value={ isEnabled }
            style={{
              marginHorizontal: 5
            }}
          />
          <Text
            style={{
              fontSize: 14,
            }}
            >
            🌙
          </Text>
        </View>
      </View>
      <View 
        style={{
          flex: 0.875,
          color: colors.text
        }}>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <Image 
            source={{ uri: _auth?.avatar }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              marginTop: 20,
            }}
            />
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          >
          <Text
            style={{
              color: colors.text,
              textTransform: 'uppercase',
              marginTop: 10
            }}
            >
            { _auth?.name }
          </Text>
          <Text
            style={{
              color: colors.text,
              textTransform: 'capitalize'
            }}
            >
            { _auth?.role }
          </Text>
          <ImageBackground 
            source={ PNG.hrGroup } 
            resizeMode="stretch" 
            style={{
              position: 'absolute',
              top: 0,
              right: -16,
              bottom: 0,
              left: -10,
            }}
            />
        </View>
        <View
          style={{
            flex: 0.55,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          >
          <View
            style={{
              flexDirection: 'column',
              marginTop: 30
            }}
            >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingHorizontal: 20
              }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}
                >
                <Fontisto 
                  name='email' 
                  size={20} 
                  color={ colors.text }
                  style={{
                    marginRight: 10
                  }}
                  />
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { setting.email }: 
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}
                >
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { _auth?.email }
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingHorizontal: 20
              }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
                >
                <AntDesign 
                  name='phone' 
                  size={20} 
                  color={ colors.text }
                  style={{
                    marginRight: 10
                  }}
                  />
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { setting.phone }: 
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
                >
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { _auth?.user_infor?.phone }
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingHorizontal: 20
              }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
                >
                <Ionicons 
                  name='business' 
                  size={20} 
                  color={ colors.text }
                  style={{
                    marginRight: 10
                  }}
                  />
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { setting.company }: 
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
                >
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { _auth?.user_infor?.company_name }
                </Text>
              </View>
            </View>
            <View
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
                >
                <Entypo 
                  name='address' 
                  size={20} 
                  color={ colors.text }
                  style={{
                    marginLeft: 20,
                    marginRight: 10
                  }}
                  />
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { setting.address }: 
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 40,
                  height: 30,
                }}
                >
                <Text
                  style={{
                    color: colors.text,
                    textTransform: 'capitalize'
                  }}
                  >
                  { _auth?.user_infor?.address }
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={ handleSignOut }
              style={{
                marginBottom: 30,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              >
              <AntDesign 
                name='logout' 
                size={20} 
                color={ colors.notification }
                /> 
              <Text
                style={{
                  color: colors.notification,
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginHorizontal: 5
                }}
                >
                { setting.signout }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View 
        style={{
          flex: 0.05,
          alignItems: 'center'
        }}>
        <Text
          style={{
            color: colors.text
          }}
          >
          { common.copy_right ? common.copy_right : '' } 
          { new Date().toLocaleString('en-US', {
            year: "numeric",
          }) }
        </Text>
      </View>
    </View>
  );
}

export default SettingsScreen;
