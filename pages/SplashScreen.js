import { Image, StatusBar, Dimensions, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

var primary = '#202329';
const SplashScreen = () => {

  const navigation = useNavigation();
  useEffect(() => {
    navig();
  }, []);

  const navig = async () => {
    const intro = await AsyncStorage.getItem('intro');

    setTimeout(() => { 
      if (intro == null) {
        navigation.navigate('Intro');
      } else {
        navigation.navigate('Home');
      }
    }, 3000);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={primary}
         />
      <View style={styles.imgContainer}>
        <Image source={require('../assets/img/logo-flat.png')} />
        <Text style={styles.titleText}>SIRUSAK</Text>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  titleText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: width * 0.06,
    color: 'white',
    margin: 20
  },
  imgContainer: {
    paddingVertical: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  }
})