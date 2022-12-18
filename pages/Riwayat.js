import { StyleSheet, Text, ScrollView, FlatList, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment'
import 'moment/locale/id';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var dark = '#202329';
var light = '#E5E5E5';
const Riwayat = () => {

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getData', {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {
      navigation.navigate('RiwayatDetail', {
        params: item.id
      })
    }}>
      <View style={[styles.row, { width: '20%', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.dataText}>{moment(item.tgl_pelaporan).format('DD')}</Text>
        <Text style={styles.dataText}>{moment(item.tgl_pelaporan).format('MMM')} </Text>
      </View>
      <View style={[styles.row, { flex: 1 }]}>
        <Text style={styles.dataText}>{item.nama_rambu}</Text>
        <Text style={styles.p}>{item.lokasi} </Text>
      </View>
      <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image source={require('../assets/img/arrow-right.png')} />
      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Riwayat</Text>
        </View>
      </View>
      <View style={styles.content}>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </View >
  )
}

export default Riwayat

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#D7D8D6'
  },
  header: {
    height: height * 0.065,
    backgroundColor: dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,

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
    padding: 10,
    backgroundColor: dark
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 32,
    color: light
  },
  searchBox: {
    flexDirection: 'row'
  },
  searchInput: {
    width: '80%',
    marginRight: '3%',
    height: height * 0.05,
    backgroundColor: 'white',
    color: 'black'
  },
  searchBtn: {
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D83939'
  },
  searchTxt: {
    color: 'white',
    fontWeight: 'bold'
  },
  row: {
    marginVertical: 5,
    borderColor: 'white',
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: light,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row'
  },
  dataText: {
    fontSize: 20,
    color: light,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: 400,
    marginVertical: 5
  },
  mapContainer: {
    width: '100%',
    height: 400
  },
  map: {
    width: '100%',
    height: '100%',

  },
  p: {
    color: light
  }
})