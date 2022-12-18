import { SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.imgHeader} source={require('../assets/img/splash-img.png')} />
        <Text style={styles.headerText}>Aplikasi Pelaporan Kerusakan Rambu Lalu Lintas</Text>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Pelaporan');
            }}>
              <Image source={require('../assets/img/pelaporan-red.png')} />
              <Text style={styles.btnText}>Pelaporan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Riwayat')
            }}>
              <Image source={require('../assets/img/riwayat-red.png')} />
              <Text style={styles.btnText}>Riwayat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Peta')
            }}>
              <Image source={require('../assets/img/peta-red.png')} />
              <Text style={styles.btnText}>Peta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('KS')
            }}>
              <Image source={require('../assets/img/kritik-red.png')} />
              <Text style={styles.btnText}>Kritik & Saran</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Tentang')
            }}>
              <Image source={require('../assets/img/tentang-red.png')} />
              <Text style={styles.btnText}>Tentang</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => {
              navigation.navigate('Kontak')
            }}>
              <Image source={require('../assets/img/kontak-red.png')} />
              <Text style={styles.btnText}>Kontak</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 12
  },
  header: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgHeader: {
    height: 50,
    width: 50,
    margin: 10
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16
  },
  menuContainer: {
    height: '70%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '32%'
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    width: '45%',
    height: '95%',
    borderRadius: 8
  },
  btn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'black',
    fontSize: 18,
    marginTop: '2%',
    fontWeight: 'bold'
  }
})