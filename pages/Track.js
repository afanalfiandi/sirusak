import { Alert, TextInput, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var dark = '#202329';
var light = '#E5E5E5';

const Track = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState();
  const [data, setData] = useState(null);

  const submit = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=track', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((resp) => {
        setData(resp);
      })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {
          navigation.navigate('Home');
        }}>
          <Image source={require('../assets/img/back-black.png')} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Track Laporan</Text>
        </View>
      </View>
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="Masukkan Token Pelaporan" placeholderTextColor={dark} onChangeText={setToken} value={token} />
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={styles.textBtn}>Cari</Text>
          </TouchableOpacity>
        </View>

        {data != null && (
          <View>
            <View style={styles.row}>
              <Text style={styles.h1}>Nama Pelapor</Text>
              <Text style={styles.h2}>{data[0].nama}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.h1}>Tgl Pelaporan</Text>
              <Text style={styles.h2}>{data[0].tgl}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.h1}>Nama Rambu</Text>
              <Text style={styles.h2}>{data[0].nama_rambu}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.h1}>Jenis Kerusakan</Text>
              <Text style={styles.h2}>{data[0].jenis_kerusakan}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.h1}>Lokasi Kejadian</Text>
              <Text style={styles.h2}>{data[0].lokasi}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.h1}>Status Pelaporan</Text>
              <Text style={styles.h2}>{data[0].status}</Text>
            </View>

          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default Track

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark
  },
  header: {
    height: height * 0.065,
    backgroundColor: dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  backBtn: {
    padding: 10
  },
  titleContainer: {
    flex: 1
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: width * 0.046,
    textAlign: 'center',
    color: light
  },
  content: {
    height: '100%',
    paddingHorizontal: width * 0.04,
    backgroundColor: dark
  },
  text: {
    fontWeight: 'bold',
    color: light,
    fontSize: width * 0.05
  },
  input: {
    backgroundColor: light,
    color: 'black',
    width: '100%',
    marginTop: height * 0.02,
    borderRadius: 6,
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: light,
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,

  },
  textBtn: {
    color: dark,
    fontSize: 16,
    fontWeight: 'bold'
  },
  row: {
    marginVertical: 10,
    paddingVertical: 10
  },
  h1: {
    color: light,
    fontWeight: 'bold',
    fontSize: 18
  },
  h2: {
    color: light,
    fontSize: 17
  },

})