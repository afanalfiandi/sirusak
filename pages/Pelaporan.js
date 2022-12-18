import { Image, ActivityIndicator, Dimensions, Alert, Modal, ScrollView, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PageSlider } from '@pietile-native-kit/page-slider';

import MapView, { MarkerAnimated } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Select2 from "react-native-select-two";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var dark = '#202329';
var light = '#E5E5E5';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false
  }
};

const Pelaporan = () => {
  useEffect(() => {
    getPosition();
    getJenisKerusakan();
    getRambu();
    getTingkatKerusakan();
  }, []);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [tk, setTk] = React.useState('1');
  const [nama, setNama] = useState();
  const [noHP, setNoHP] = useState();
  const [email, setEmail] = useState();
  const [rambu, setNamaRambu] = useState();
  const [lokasi, setLokasi] = useState();
  const [ukuran, setUkuran] = useState();
  const [jenisKerusakan, setJenisKerusakan] = useState('Jenis Kerusakan');
  const [keterangan, setKeterangan] = useState();
  const [uri, setUri] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [token, setToken] = useState('');

  const onCurrentPageChange = () => { }

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



  const [dataRambu, setdDataRambu] = useState(
    [
      { id: 0, name: "name" }
    ]
  );
  const [dataTingkatKerusakan, setDataTingkatKerusakan] = useState(
    [
      { id: 0, name: "name" }
    ]
  );
  const [dataJenisKerusakan, setDataJenisKerusakan] = useState(
    [
      { id: 0, name: "name" }
    ]
  );


  const getPosition = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition((position) => {
        const lat = JSON.stringify(position.coords.latitude);
        const long = JSON.stringify(position.coords.longitude);
        setinitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        });

        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

      }, (error) => {
        if (error.code == 2) {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then((data) => {
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Aktifkan Izin Lokasi",
            message:
              "Untuk menggunakan aplikasi, beri izin lokasi",
            buttonNeutral: "Tanya Nanti",
            buttonNegative: "Batal",
            buttonPositive: "Izinkan"
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const getJenisKerusakan = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getJenisKerusakan', {})
      .then((response) => response.json())
      .then((res) => {
        setDataJenisKerusakan(res);
        // console.log(res);
      })
  }

  const getRambu = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getRambu', {})
      .then((response) => response.json())
      .then((res) => {
        setdDataRambu(res);
      })
  }

  const getTingkatKerusakan = () => {
    fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=getTingkatKerusakan', {})
      .then((response) => response.json())
      .then((res) => {
        setDataTingkatKerusakan(res);
      })
  }

  const Map = () => {
    return (
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsTraffic={true}
      >
        <MarkerAnimated coordinate={marker} draggable onDragEnd={(a) => {
          // console.log(a.nativeEvent.coordinate.latitude);

          setinitialRegion({
            latitude: a.nativeEvent.coordinate.latitude,
            longitude: a.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          });

          setMarker({
            latitude: a.nativeEvent.coordinate.latitude,
            longitude: a.nativeEvent.coordinate.longitude
          })
          setLat(a.nativeEvent.coordinate.latitude);
          setLong(a.nativeEvent.coordinate.longitude);
        }} />
      </MapView>
    )
  }

  const submit = async () => {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('noHP', noHP);
    formData.append('email', email);
    formData.append('rambu', rambu);
    formData.append('jenisKerusakan', jenisKerusakan);
    formData.append('lokasi', lokasi);
    formData.append('ukuran', ukuran);
    formData.append('uri', uri);
    formData.append('tk', tk);
    formData.append('keterangan', keterangan);
    formData.append('lat', lat);
    formData.append('long', long);

    formData.append('file', {
      uri: uri,
      type: type,
      name: name,
    });
    let res = await fetch(
      'https://sirusak.skrpoject.my.id/api/api.php?aksi=insPelaporan',
      {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    ).then((res) => res.json()).then((resp) => {
      console.log(resp);
      if (resp != "0") {
        setToken(resp);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setModalVisible(true);
        },3000);
      } else {
        alert('Pelaporan gagal! Silahkan tunggu beberapa saat.');
      }
    })
  }

  const close = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  }
  const handleLaunchGallery = async () => {
    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('Cancel');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      setUri(result.assets[0].uri,);
      setType(result.assets[0].type,);
      setName(result.assets[0].fileName);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { close(); }}>
                <Image source={require('../assets/img/close.png')} />
              </TouchableOpacity>
              <Text style={styles.h1}>Pelaporan Berhasil!</Text>
              <Text style={styles.h1}>Silahkan simpan token dibawah ini untuk melacak laporan Anda!</Text>

              <View style={styles.tokenContainer}>
                <Text style={[styles.h1, { color: dark, fontSize: 22 }]}>{token}</Text>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.backBtn} onPress={() => {
            navigation.navigate('Home');
          }}>
            <Image source={require('../assets/img/back-black.png')} />
          </TouchableOpacity> */}
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Pelaporan </Text>
          </View>
        </View>

        <View style={styles.content}>
          <PageSlider
            style={styles.pageSlider}
            selectedPage={selectedPage}
            onSelectedPageChange={setSelectedPage}
            onCurrentPageChange={onCurrentPageChange}
          >
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Pelapor</Text>

              <TextInput placeholder='Nama' placeholderTextColor="black" style={[styles.input]} onChangeText={setNama} value={nama} />


              <TextInput placeholder='No. HP' placeholderTextColor="black" style={[styles.input]} onChangeText={setNoHP} value={noHP} />
              <TextInput placeholder='Email' placeholderTextColor="black" style={[styles.input]} onChangeText={setEmail} value={email} />


              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => { setSelectedPage('1'); }}>
                  <Text style={styles.textBtn}>Lanjut</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Kerusakan Rambu Lalu Lintas</Text>

              {/* <TextInput placeholder='Nama Rambu Lalu Lintas' placeholderTextColor="black" style={styles.[input}] onChangeText={setNamaRmbu} value={namaRambu} /> */}
              <Select2
                isSelectSingle
                style={styles.input}
                colorTheme={dark}
                popupTitle="Pilih Rambu Lalu Lintas"
                title="Pilih Rambu Lalu Lintas"
                cancelButtonText="Batal"
                selectButtonText="Pilih"
                searchPlaceHolderText="Cari"
                data={dataRambu}
                onSelect={data => {
                  setNamaRambu(data[0])
                  // console.log([data[0]]);
                }}
                onRemoveItem={data => {
                  setNamaRambu(data[0])
                }}
              />

              <Select2
                isSelectSingle
                style={styles.input}
                colorTheme={dark}
                popupTitle="Pilih Jenis Kerusakan"
                title="Pilih Jenis Kerusakan"
                cancelButtonText="Batal"
                selectButtonText="Pilih"
                searchPlaceHolderText="Cari"
                data={dataJenisKerusakan}
                onSelect={data => {
                  setJenisKerusakan(data[0])
                }}
                onRemoveItem={data => {
                  setJenisKerusakan(data[0])
                }}
              />


              <TextInput placeholder='Lokasi Kejadian' placeholderTextColor="black" style={[styles.input]} onChangeText={setLokasi} value={lokasi} />
              <TextInput placeholder='Ukuran Rambu' placeholderTextColor="black" style={[styles.input]} onChangeText={setUkuran} value={ukuran} />
              <TouchableOpacity onPress={handleLaunchGallery} style={[styles.input, { paddingVertical: 15, paddingHorizontal: 15 }]}>
                <Text style={{ color: 'black' }}>Pilih Foto</Text>
                {name != null && (
                  <Text style={{ color: 'black' }}>✔</Text>
                )}
              </TouchableOpacity>

              {/* <Text style={[styles.formTitle, styles.formTitleBelow]}>Tingkat Kerusakan</Text> */}

              <Select2
                isSelectSingle
                style={styles.input}
                colorTheme={dark}
                popupTitle="Pilih Tingkat Kerusakan"
                title="Pilih Tingkat Kerusakan"
                cancelButtonText="Batal"
                selectButtonText="Pilih"
                searchPlaceHolderText="Cari"
                data={dataTingkatKerusakan}
                onSelect={data => {
                  setTk(data[0])
                }}
                onRemoveItem={data => {
                  setTk(data[0])
                }}
              />

              <TextInput
                placeholder='Keterangan'
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                numberOfLines={5}
                multiline={true}
                style={{
                  backgroundColor: light,
                  color: 'black',
                  width: '100%',
                  marginTop: 10,
                  borderRadius: 6,
                  paddingHorizontal: 15
                }}
                onChangeText={setKeterangan} value={keterangan}
              />

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn2} onPress={() => { setSelectedPage('0'); }}>
                  <Text style={styles.textBtn}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => { setSelectedPage('2'); }}>
                  <Text style={styles.textBtn}>Lanjut</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formContainer}>
              {loading == true && (
                <ActivityIndicator size="large" style={styles.activity} color={light} />
              )}
              <Text style={styles.formTitle}>Lokasi</Text>

              <View style={styles.mapContainer}>
                <Map />
                <Text style={styles.petunjukText}>*tahan dan geser marker untuk menentukan titik</Text>

                <Text style={styles.coordText}>Latitude : {lat}</Text>
                <Text style={styles.coordText}>Longitude : {long}</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn2} onPress={() => { setSelectedPage('1'); }}>
                  <Text style={styles.textBtn}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={submit}>
                  <Text style={styles.textBtn}>Kirim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PageSlider>
        </View>
      </View >
    </ScrollView >
  )
}

export default Pelaporan

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
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
  },
  formContainer: {
    padding: 15,
    alignItems: 'center',
    flex: 1
  },
  formTitle: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    color: light
  },

  input: {
    backgroundColor: light,
    color: 'black',
    width: '100%',
    paddingHorizontal: 15,
    marginTop: height * 0.02,
    borderRadius: 6,
    justifyContent: 'center'
  },
  btnContainer: {
    bottom: height * 0.10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  btn: {
    backgroundColor: light,
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btn2: {
    backgroundColor: light,
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textBtn: {
    color: dark,
    fontSize: 16,
    fontWeight: 'bold'
  },
  radioContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  mapContainer: {
    width: '100%',
    height: '40%',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  coordText: {
    marginTop: height * 0.02,
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: light
  },
  petunjukText: {
    marginTop: height * 0.02,
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: light
  },
  inputFoto: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dark
  },
  modalView: {
    backgroundColor: dark,
    borderRadius: 5,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: 'center'
  },
  button: {
    borderRadius: 2,
    padding: 10,
    width: '80%',
    marginTop: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: light
  },
  h1: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: light
  },









  JKcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  JKmodalView: {
    width: width - 30,
    paddingVertical: 25,
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  JKbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  JKuttonOpen: {
    backgroundColor: "#F194FF",
  },
  JKttonClose: {
    backgroundColor: "#2196F3",
  },
  JtextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  JKmodalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  JKoptText: {
    marginBottom: 6,
    color: 'black'
  },
  JKoption: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    width: '100%',
  },
  tokenContainer: {
    backgroundColor: light,
    width: width - 30,
    marginTop: 10,
    paddingVertical: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 30,
    top: 30
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    position: 'absolute'
  }
})