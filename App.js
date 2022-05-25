/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeActivity from './view/HomeActivity';
import DeviceSettingsActivity from './view/DeviceSettingsActivity';
import DeviceLogActivity from './view/DeviceLogActivity';
import Helper from './Helper';
import Ionicons from 'react-native-vector-icons/Ionicons';


const App: () => Node = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  const AppTab = ({route})=>{
    return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = size;
            let iconStyle = {};
            let iconColor = color;

            if (route.name === 'Device Settings') {
              iconName = focused
                ? 'settings'
                : 'settings-outline';
            }
            else if(route.name === 'Device Log'){
              iconName = focused
                ? 'document'
                : 'document-outline';
            }

            // You can return any component that you like here!
            return <View style={iconStyle}>
              <Ionicons name={iconName} size={iconSize} color={iconColor}/>
            </View>
            
          },
          tabBarActiveTintColor: Helper.color.appAccentDark,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        
        <Tab.Screen name="Device Log" component={DeviceLogActivity} initialParams={route.params} />
        <Tab.Screen name="Device Settings" component={DeviceSettingsActivity} initialParams={route.params} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer >
      <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeActivity} options={{title: "Smarter Door Lock"}}/>
            <Stack.Screen name="Device" component={AppTab} options={({ route }) => ({ title: route.params.name })}/>
          </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
