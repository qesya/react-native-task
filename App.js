/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//import screens
import Home from './src/screens/Home'
import Detail from './src/screens/Detail'

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      {
        (Platform.OS === "ios") && <StatusBar barStyle="default" />
      }
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />

        </Stack.Navigator>

      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff'
  }
});

export default App;
