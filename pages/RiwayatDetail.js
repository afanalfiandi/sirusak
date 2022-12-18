import { StyleSheet, ActivityIndicator, Text, ScrollView, FlatList, Dimensions, TouchableOpacity, Image, View } from 'react-native'
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

const RiwayatDetail = ({ route }) => {

  const navigation = useNavigation();
  const itemId = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialRegion, setinitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });


  useEffect(() => {
    setLoading(true);
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [route]);
  const getData = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getRiwayatDetail', {
      method: 'post',
      body: JSON.stringify({
        id: itemId.params
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response);


        const lat = parseFloat(response[0].latitude);
        const long = parseFloat(response[0].longitude);

        const lat2 = -7.3974547;
        const long2 = 109.2711838;
        setinitialRegion({
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        // -7.3974547
        // 109.2711838
        setMarker({
          latitude: lat,
          longitude: long,
        });

      })
  }

  const Map = () => {
    return (
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsTraffic={true}
      >
        <Marker coordinate={marker} />
      </MapView>
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Tanggal Pelaporan </Text>
        <Text style={styles.dataText}>{item.tgl} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Nama Pelapor </Text>
        <Text style={styles.dataText}>{item.nama} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Email Pelapor </Text>
        <Text style={styles.dataText}>{item.email} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Nama Rambu </Text>
        <Text style={styles.dataText}>{item.nama_rambu} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Ukuran Rambu </Text>
        <Text style={styles.dataText}>{item.ukuran_rambu} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Lokasi Kerusakan </Text>
        <Text style={styles.dataText}>{item.lokasi} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Jenis Kerusakan </Text>
        <Text style={styles.dataText}>{item.jenis_kerusakan} </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Tingkat Kerusakan </Text>
        <Text style={styles.dataText}>{item.tingkat_kerusakan} </Text>
      </View>


      <View style={styles.row}>
        <Text style={styles.title}>Keterangan </Text>
        <Text style={styles.dataText}>{item.keterangan} </Text>
      </View>


      <View style={styles.row}>
        <Text style={styles.title}>Gambar </Text>
        <Image style={styles.image} source={{ uri: 'https://sirusak.skrpoject.my.id/uploads/' + item.img }} />
      </View>


      <View style={styles.mapContainer}>
        <Text style={styles.title}>Peta Digital </Text>
        <Map />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {
          navigation.navigate('Riwayat');
        }}>
          <Image source={require('../assets/img/back-black.png')} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Detail Pelaporan</Text>
        </View>
      </View>
      <View style={styles.content}>
        {loading == true && (
          <ActivityIndicator size="large" style={styles.activity} color={light} />
        )}
        {loading == false && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id_pelaporan}
            contentContainerStyle={{ paddingBottom: 180 }}
          />
        )}
        {/* {initialRegion.map((result) => {
          return (
            <Text key={result.id_pelaporan}>{result.latitude}</Text>
            // <View style={styles.mapContainer} key={result.id_pelaporan}>
            //   <MapView
            //     style={styles.map}
            //     initialRegion={{
            //       latitude: result.latitude,
            //       longitude: 109.2778566107154,
            //       latitudeDelta: 0.001,
            //       longitudeDelta: 0.001,
            //     }}
            //     showsTraffic={true}
            //   >
            //     <Marker coordinate={{
            //       latitude: -7.407483359520519,
            //       longitude: 109.2778566107154,
            //     }} />
            //   </MapView>
            // </View>
          )
        })} */}

      </View>
    </View >
  )
}

export default RiwayatDetail

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: dark,
    padding: 10
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
    padding: 10
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    color: dark
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
    marginVertical: 5
  },
  card: {
    backgroundColor: light,
    padding: 10,
    borderRadius: 10,
    paddingBottom: 30
  },
  dataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: dark
  },
  image: {
    width: '100%',
    height: 400,
    marginVertical: 5
  },
  mapContainer: {
    width: '100%',
    height: 400,
  },
  map: {
    width: '100%',
    height: '100%',
    marginBottom: 10
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})