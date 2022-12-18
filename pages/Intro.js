import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
var primary = '#202329';
var light = '#E5E5E5';

const Intro = () => {

  const navig = useNavigation();
  useEffect(() => {
    onMount();
  })
  const onMount = async () => {
    try {
      const val = await AsyncStorage.getItem('intro')
      if (val == '1') {
        navig.navigate('Home');
      } else {
        console.log('null');
      }
    } catch (e) {
      console.log(e);
    }
  }
  const onStart = async () => {
    try {
      await AsyncStorage.setItem('intro', '1');
      navig.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={primary}
      />
      <ImageBackground source={require('../assets/img/intro-bg.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.content}>
          <View style={styles.btnContainer}>
            <Text style={[styles.h1, { fontSize: 20, textAlign: 'center' }]}>Selamat datang di Aplikasi Pelaporan Kerusakan Rambu Lalu Lintas</Text>

            <TouchableOpacity style={styles.btn} onPress={onStart}>
              <Text style={[styles.h1, { color: primary, fontSize: 18 }]}>Mulai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    borderColor: 'white',
    position: 'absolute',
    bottom: 100,
    right: 0,
    left: 0,
    padding: 20
  },
  h1: {
    color: light,
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: light,
    marginTop: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
})