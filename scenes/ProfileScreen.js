import { 
  Button, 
  View
} from 'react-native'

import {
  useResource
} from 'utils/useResource'

function ProfileScreen({ navigation }) {
  const { _lg } = useResource()
  const { page } = _lg

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate(page.notification)}
      />
      <Button
        title={ page.signIn_btn }
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ProfileScreen;
