import { FlatList, PermissionsAndroid, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


var dark = '#202329';
var light = '#E5E5E5';

const Peta = () => {
  useEffect(() => {
    getData();
  }, []);
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const [marker, setMarker] = useState({
    latitude: -7.371748740436454,
    longitude: 109.3839018099894
  })
  const getData = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getData', {})
      .then((res) => res.json())
      .then((resp) => {
        setData(resp);
        // setMarker({
        //   latitude: re
        // })
      })
  }

  const Map = () => {

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -7.3341237,
          longitude: 109.4129008,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
        showsTraffic={true}
      >
        {
          data.map((item, index) => (
            <Marker key={index} coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }} >
              <Callout>
                <View style={{ width: 210, padding: 10 }}>
                  <Text style={{ color: 'black' }}>{item.nama_rambu}</Text>
                  <Text style={{ color: 'black' }}>{item.jenis_kerusakan}</Text>
                  <Text style={{ color: 'black' }}>Tingk. Kerusakan {item.tingkat_kerusakan}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
        {/* <Marker coordinate={{
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        }} /> */}
      </MapView>
    )
  }

  const renderItem = ({ item }) => {
    const lat = parseFloat(item.latitude);
    const long = parseFloat(item.longitude);
    return (
      <Marker key={item.id_pelaporan} coordinate={{
        latitude: -7.3341237,
        longitude: 109.4129008,
      }} />
    )
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.backBtn} onPress={() => {
            navigation.navigate('Home');
          }}>
            <Image source={require('../assets/img/back-black.png')} />
          </TouchableOpacity> */}
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Peta</Text>
          </View>
        </View>

        <View style={styles.content}>

          <View style={styles.mapContainer}>
            {/* {data != null && ( */}
            <Map />
            {/* )} */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Peta

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
    color: 'white'
  },
  content: {
    height: '100%',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%'
  },
})