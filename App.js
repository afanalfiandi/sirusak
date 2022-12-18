import * as React from 'react';
import { View, BackHandler, LogBox, StyleSheet, Image, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './pages/SplashScreen';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Pelaporan from './pages/Pelaporan';
import Riwayat from './pages/Riwayat';
import RiwayatDetail from './pages/RiwayatDetail';
import Peta from './pages/Peta';
import KS from './pages/KS';
import Tentang from './pages/Tentang';
import Track from './pages/Track';
import Token from './pages/Token';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`']);
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle='light-content'
      />
      <Tab.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        <Tab.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Intro"
          component={Intro}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Token"
          component={Token}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Pelaporan"
          component={Pelaporan}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen
          name="RiwayatDetail"
          component={RiwayatDetail}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Track"
          component={Track}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Home"
          component={Home} options={{
            tabBarStyle: { display: 'none' }, tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={
                      focused ?
                        require("./assets/img/home-black.png")
                        : require("./assets/img/home-scnd.png")
                    }
                  />
                </View>
              );
            },
          }} />
        
        <Tab.Screen name="Peta" component={Peta} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused ?
                      require("./assets/img/peta-black.png")
                      : require("./assets/img/peta-scnd.png")
                  }
                />
              </View>
            );
          }
        }}
        />
        <Tab.Screen name="Riwayat" component={Riwayat} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused ?
                      require("./assets/img/riwayat-black.png")
                      : require("./assets/img/riwayat-scnd.png")
                  }
                />
              </View>
            );
          }
        }}
        />
        <Tab.Screen name="KS" component={KS} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused ?
                      require("./assets/img/kritik-black.png")
                      : require("./assets/img/kritik-scnd.png")
                  }
                />
              </View>
            );
          }
        }}
        />
        <Tab.Screen name="Tentang" component={Tentang} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused ?
                      require("./assets/img/tentang-black.png")
                      : require("./assets/img/tentang-scnd.png")
                  }
                />
              </View>
            );
          }
        }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})