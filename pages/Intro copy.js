import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const color = '#FFCF30';
const slides = [
  {
    key: 1,
    title: 'Selamat Datang Di Aplikasi Ini!',
    text: 'Lanjutkan untuk mendapatkan informasi selanjutnya',
    image: require('../assets/img/intro-1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Hati - Hati Dijalan',
    text: 'Laporkan jika ada kerusakan rambu lalu lintas',
    image: require('../assets/img/intro-2.png'),
    backgroundColor: '#febe29',
  }
]

export class Intro extends React.Component {
  state = {
    showRealApp: false
  }
  componentDidMount() {
    this._getState();
  }

  _getState = async () => {
    try {
      const val = await AsyncStorage.getItem('showRealApp')
      if (val == '1') {
        this.setState({ showRealApp: true });
      } else {
        console.log('null');
      }
    } catch (e) {
      console.log(e);
    }
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={item.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.key == 2 && (
          <TouchableOpacity style={styles.startBtn} onPress={this._onDone}>
            <Text style={styles.startTxt}>Mulai</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  _onDone = async () => {
    this.setState({ showRealApp: true });
    try {
      await AsyncStorage.setItem('showRealApp', '1')
    } catch (e) {
      console.log(e);
    }
  }

  _nextBtn = () => {
    return (
      <View>
      </View>
    )
  }
  _doneBtn = () => {
    return (
      <View>
      </View>
    )
  }

  render() {
    if (!this.state.showRealApp) {
      return <AppIntroSlider
        dotStyle={{ backgroundColor: '#0FF542' }}
        activeDotStyle={{ backgroundColor: '#FD0202' }}
        renderItem={this._renderItem}
        data={slides}
        renderNextButton={this._nextBtn}
        renderDoneButton={this._doneBtn}
      />;
    } else {
      return <Home />;
    }
  }
}

export default Intro


const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  imgContainer: {
    marginTop: '30%',
    width: '82%',
    height: 400
  },
  img: {
    width: 'auto',
  },
  title: {
    fontSize: width * 0.042,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: 'black'
  },
  startBtn: {
    backgroundColor: '#FD0202',
    marginTop: 40,
    height: '4%',
    width: width * 0.3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startTxt: {
    color: 'white'
  }
})