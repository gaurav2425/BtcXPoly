import React from 'react';
import {observer, Provider, Observer} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import dataStore from './DataStore';
import HomeScreen from './screens/HomeScreen';
import ImportWalletScreen from './screens/ImportWalletScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrivateKey from './screens/PrivateKey';
import PrivateKeyPolygon from './screens/PrivateKeyPolygon';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Observer>
      {() => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Importwallet" component={ImportWalletScreen} />
            <Stack.Screen name="Privatekey" component={PrivateKey} />
            <Stack.Screen
              name="PrivatekeyPolygon"
              component={PrivateKeyPolygon}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Observer>
  );
};

export default App;
