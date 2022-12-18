import { TextInput, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Kontak = () => {
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
                        <Text style={styles.headerText}>Kontak</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Image source={require('../assets/img/tentang-img.png')} />
                        <View style={styles.tentangContainer}>
                            <Text style={styles.text}>
                                Telp: (0281) 891427 {'\n'}
                                Email: purbalingga@dinhub.id
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Kontak


const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: '#D7D8D6',
        alignItems: 'center'
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
        height: '40%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tentangContainer: {
        marginLeft: 10
    },
    text: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'black',
    },
    textApk: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
})