import { Alert, TextInput, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
var dark = '#202329';
var light = '#E5E5E5';
const KS = () => {
    const navigation = useNavigation();
    const [kritik, setKritik] = useState();

    const submit = () => {
        fetch('https://sirusak.skrpoject.my.id/api/api.php?aksi=insKritik', {
            method: 'post',
            body: JSON.stringify({
                params: kritik
            }),
            headers: {
                'Content-Type': 'multipart/form-data; ',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response == 1) {
                    Alert.alert('', 'Berhasil!', [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Home')
                        }
                    ]);
                } else {
                    Alert.alert('', 'Gagal!');
                }
            })
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <TouchableOpacity style={styles.backBtn} onPress={() => {
                        navigation.navigate('Home');
                    }}>
                        <Image source={require('../assets/img/back-black.png')} />
                    </TouchableOpacity> */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerText}>Kritik & Saran</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Berikan kritik & saran kepada kami</Text>
                    <TextInput
                        placeholder='Kritik dan Saran'
                        underlineColorAndroid="transparent"
                        numberOfLines={10}
                        multiline={true}
                        style={{
                            backgroundColor: light,
                            color: 'black',
                            width: '100%',
                            marginTop: 10,
                            borderRadius: 6
                        }}
                        onChangeText={setKritik} value={kritik}
                        placeholderTextColor="black"
                    />
                    <TouchableOpacity style={styles.submitBtn} onPress={submit}>
                        <Text style={styles.submitTxt}>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default KS

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
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.04,
        backgroundColor: dark
    },
    text: {
        fontWeight: 'bold',
        color: light,
        fontSize: width * 0.05
    },
    submitBtn: {
        backgroundColor: light,
        marginVertical: height * 0.02,
        height: '8%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    submitTxt: {
        color: dark,
        fontWeight: 'bold'
    }
})