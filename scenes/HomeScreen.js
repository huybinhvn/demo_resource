import { 
  Button, 
  View
} from 'react-native';

import {
  useResource
} from 'utils/useResource'

function HomeScreen({ navigation }) {
  const { _lg, _auth } = useResource()
  const { page } = _lg

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate(page.profile)}
      />      
      <Button
        title={ page.signIn_btn }
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}

export default HomeScreen;
