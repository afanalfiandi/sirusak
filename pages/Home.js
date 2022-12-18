import { SafeAreaView, Image, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'

import React from 'react';
import { useNavigation } from '@react-navigation/native';

var dark = '#202329';
var light = '#E5E5E5';
const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={dark}
      />
      <View style={styles.header}>
        <Image source={require('../assets/img/app-logo-sm.png')} />
        <Text style={styles.h1}>SIRUSAK</Text>
      </View>
      <View style={styles.content}>

        <Text style={styles.h2}>Pelaporan</Text>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.btn}  onPress={() => {
              navigation.navigate('Pelaporan');
            }}>
              <Image style={styles.col1img} source={require('../assets/img/person-1.png')} />
              <Text style={styles.txt1}>Pelaporan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Track');
            }}>
              <Image style={styles.col1img} source={require('../assets/img/person-2.png')} />
              <Text style={styles.txt1}>Cari {'\n'} Laporan</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.h2}>Menu</Text>
        <View style={styles.row}>
          <View style={styles.col2}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              navigation.navigate('Peta')
            }}>
              <Image source={require('../assets/img/icon-peta.png')} />
              <Text style={[styles.txt1, { marginTop: 10 }]}>Peta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              navigation.navigate('Riwayat')
            }}>
              <Image source={require('../assets/img/icon-riwayat.png')} />
              <Text style={[styles.txt1, { marginTop: 10 }]}>Riwayat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col2}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => {
              navigation.navigate('KS')
            }}>
              <Image source={require('../assets/img/icon-kritik.png')} />
              <Text style={[styles.txt1, { marginTop: 10 }]}>Kritik dan Saran</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity style={styles.menuBtn}  onPress={() => {
              navigation.navigate('Tentang')
            }}>
              <Image source={require('../assets/img/icon-tentang.png')} />
              <Text style={[styles.txt1, { marginTop: 10 }]}>Tentang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,

  },
  h1: {
    fontWeight: 'bold',
    fontSize: 16,
    color: light
  },
  h2: {
    fontWeight: 'bold',
    color: dark,
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20
  },
  content: {
    flex: 1,
    backgroundColor: light,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  btn: {
    backgroundColor: dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  col1: {
    width: '48%'
  },
  col1img: {
    marginRight: 10
  },
  txt1: {
    color: light,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  menuBtn: {
    backgroundColor: dark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 10
  },
  col2: {
    width: '48%',
  },
})