import { DefaultTheme, DarkTheme } from '@react-navigation/native'

import hrGroupDark from './images/PNG/hrGroupDark.png'
import hrGroupLight from './images/PNG/hrGroupLight.png'

const Theme = {
  mode: 'light',
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      "background": "rgb(242, 242, 242)", 
      "border": "rgb(216, 216, 216)", 
      "card": "rgb(255, 255, 255)", 
      "notification": "rgb(255, 59, 48)", 
      "primary": "rgb(0, 92, 197)", 
      "text": "rgb(28, 28, 30)"
    },
    PNG: {
      hrGroup: hrGroupLight,
    },
    URL: {
      rightIconSetting: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQud01jQUo5wke7fLnpzaAq2XM7autrL_TBBQ&usqp=CAU'
    }
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      "background": "rgb(18, 18, 18)", 
      "border": "rgb(39, 39, 41)", 
      "card": "rgb(1, 1, 1)", 
      "notification": "rgb(255, 69, 58)", 
      "primary": "rgb(242, 205, 5)", 
      "text": "rgb(229, 229, 231)"
    },
    PNG: {
      hrGroup: hrGroupDark,
    },
    URL: {
      rightIconSetting: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQud01jQUo5wke7fLnpzaAq2XM7autrL_TBBQ&usqp=CAU'
    }
  }
};

export default Theme;
