import { TextInput, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var dark = '#202329';
var light = '#E5E5E5';

const Tentang = () => {
    const navigation = useNavigation();

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
                        <Text style={styles.headerText}>Tentang</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Image source={require('../assets/img/tentang-img.png')} />
                        <Image source={require('../assets/img/app-logo-md.png')} />
                    </View>
                    <Text style={styles.text}>Jl. Raya Kaligondang KM 2,4 {'\n'}
                        Desa Kalikajar,  {'\n'}
                        Kecamatan Kaligondang  {'\n'}
                        Kabupaten Purbalingga  {'\n'}
                        Propinsi Jawa Tengah  {'\n'}
                        Kode Pos : 53391
                    </Text>
                    <Text style={styles.textApk}>

                        Aplikasi ini dibuat  berjtuan untuk
                        mempermudah pelaporan kerusakan
                        rambu lalu lintas yang ada
                        di kabupaten purbalingga
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Tentang

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: dark,
        alignItems: 'center'
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
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'white',
        width: '70%'
    },
    tentangContainer: {
        marginLeft: 10
    },
    text: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: light,
        textAlign: 'center',
        marginVertical: 15
    },
    textApk: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: light,
        textAlign: 'center'
    }
})