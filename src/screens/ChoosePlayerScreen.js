import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useWindowDimensions, Image, Platform, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import rabbit from '../images/Rabbit.png'
import plus from '../images/Button.png'
import narrow from '../images/narrowright-white.png'
import narrowleft from '../images/narrowleft-purple.png'
import BackgroundMusic from '../components/BackgroundMusic';
import Children from '../components/Children';
import store from '../store/store';
import bg from '../images/choosePlayer.png'

const ChoosePlayerScreen = () => {
    const navigation = useNavigation();
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [chosenPlayerIndex, setChosenPlayerIndex] = useState(null);
    const [chosenPlayer, setChosenPlayer] = useState()

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    return (
        <ImageBackground source={bg} style={styles.container}>
            <BackgroundMusic />
            <View style={{width: Platform.isPad? 'auto' : 'auto', alignItems: 'center'}}>
                <Children setChosenPlayerIndex={setChosenPlayerIndex} chosenPlayerIndex={chosenPlayerIndex} setChosenPlayer={setChosenPlayer}/>
            </View>
            {chosenPlayerIndex != null && <TouchableOpacity onPress={() => {
                    navigation.navigate('GamesScreen')
                    store.setPlayingChildId(chosenPlayer);
                }
            } style={{borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#504297', width: Platform.isPad? windowWidth * (147 / 800) : windowWidth * (147 / 800), height: Platform.isPad? windowWidth * (56 / 800) : windowHeight * (56 / 360), top: windowHeight * (280 / 360), left: windowWidth * (629 / 800), position: 'absolute'}}>
                <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), color: 'white'}}>Let's play</Text>
                <Image source={narrow} style={{width: 24, height: 24, marginLeft: 10, aspectRatio: 24 / 24}}/>
            </TouchableOpacity>}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDE7EC'
    },
    text: {
        fontSize: 18,
        color: 'blue',
    },
});

export default ChoosePlayerScreen

