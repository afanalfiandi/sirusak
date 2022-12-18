import { StyleSheet, Text, ScrollView, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RiwayatDetail = () => {

  const navigation = useNavigation();
  const [params, setParams] = useState();
  const [data, setData] = useState();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      // console.log(item.id_pelaporan)

      navigation.navigate('RiwayatDetail', {
        paramKey: item.id_pelaporan,
      });
    }}>
      <View>
        <Text style={styles.text}>{item.nama}</Text>
        <Text style={styles.textHead}>{item.nama_rambu}</Text>
        <Text style={styles.text}>{item.tgl}</Text>
      </View>
      <View>
        <Image style={styles.viewImg} source={require('../assets/img/back-black.png')} />
      </View>
    </TouchableOpacity>
  );

  const submit = () => {
    fetch('https://afanalfiandi.com/pelaporanapp/api/api.php?aksi=getRiwayat', {
      method: 'post',
      body: JSON.stringify({
        params: params
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response != null) {
          setData(response);
        }
      })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {
          navigation.navigate('Home');
        }}>
          <Image source={require('../assets/img/back-black.png')} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Riwayat</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchInput} placeholder='Email/No. HP Pelapor' onChangeText={setParams} value={params} />
          <TouchableOpacity style={styles.searchBtn} onPress={submit}>
            <Text style={styles.searchTxt}>Cari</Text>
          </TouchableOpacity>
        </View>
        {data == null && (
          <Text style={{ textAlign: 'center', margin: 20, fontSize: 20 }}>Data tidak ditemukan</Text>
        )}
        {data != null && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id_pelaporan}
          />
        )}

      </View>
    </SafeAreaView>
  )
}

export default RiwayatDetail

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#D7D8D6'
  },
  header: {
    height: height * 0.065,
    backgroundColor: 'white',
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
    textAlign: 'center'
  },
  content: {
    height: '100%',
    padding: 10
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
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
  viewImg: {
    transform: [{ rotate: '180deg' }]
  },
  textHead: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})