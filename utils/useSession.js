import { 
  useState
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useSession(key, defaultValue) {
  const [value, setValue] = useState(async () => {
    const storedValue = JSON.parse(await AsyncStorage.getItem(key));

    return storedValue ? storedValue : defaultValue;
  })

  const setValueToSession = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      AsyncStorage.setItem(key, JSON.stringify(result))

      return result
    })
  }

  return [value, setValueToSession]
}
