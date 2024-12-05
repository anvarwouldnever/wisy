import React, { useEffect, useCallback, useState } from "react";
import { View, ImageBackground, Platform, useWindowDimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import bgimage from '../images/BGimage.png'
import * as ScreenOrientation from 'expo-screen-orientation';
import mywisy from '../images/MyWisy-waving.png'
import dog from '../images/Dog.png'
import reload from '../images/tabler_reload.png'
import GamesCollections from "../components/GamesList";
import GameCategories from "../components/GameOptions";
import tabler from '../images/tabler_device-gamepad.png';
import building from '../images/tabler_building-store.png';
import star from '../images/tabler_star-filled.png';
import parent from '../images/tabler_accessible.png';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import store from "../store/store";
import arrow from '../images/arrow-left.png';

const GamesScreen = () => {

    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState(0);
    const [subCollections, setSubCollections] = useState(null)
    const [name, setName] = useState('')

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={bgimage} style={{flex: 1}}>
                <View style={{backgroundColor: '#F8F8F8', height: windowHeight, width: windowWidth * (280 / 800), borderTopRightRadius: 24, borderBottomRightRadius: 24}}>
                    <View style={{width: windowWidth * (126 / 800), alignItems: 'center', flexDirection: 'row', height: Platform.isPad? windowWidth * (48 / 800) : windowHeight * (48 / 360), position: 'absolute', left: windowWidth * (60 / 800), top: windowHeight * (20 / 360)}}>
                        <View style={{width: windowWidth * (100 / 800), justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'center', right: 0, borderRadius: 100, height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: '#FFFFFF'}}>
                            <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: '#000000'}}>{store.playingChildId.name}</Text>
                        </View>
                        <Image source={dog} style={{width: windowWidth * (48 / 800), height: windowHeight * (48 / 360), aspectRatio: 48 / 48}}/>
                    </View>
                    <View style={{width: windowWidth * (190 / 800), justifyContent: 'center', alignItems: 'center', height: Platform.isPad? windowWidth * (190 / 800) : windowHeight * (190 / 360), top: windowHeight * (154 / 360), left: windowWidth * (60 / 800)}}>
                        <Image source={mywisy} style={{width: Platform.isPad? windowWidth * (220 / 800) : 220, height: Platform.isPad? windowWidth * (220 / 800) : 220, aspectRatio: 220 / 220}}/>
                    </View>
                    <View style={{width: windowWidth * (192 / 800), height: Platform.isPad? windowWidth * (60 / 800) : windowHeight * (60 / 360), position: 'absolute', top: windowHeight * (94 / 360), left: windowWidth * (60 / 800)}}>
                        <View style={{borderRadius: 16, backgroundColor: '#C4DF84', padding: 13, width: windowWidth * (192 / 800), height: 'auto'}}>
                            <Text style={{fontWeight: '500', fontSize: 14}} >Sveiks! Spied uz kādas no spēlēm, lai sāktu</Text>
                        </View>
                        <TouchableOpacity style={{borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -5, right: -10, backgroundColor: '#F8F8F8', width: windowWidth * (32 / 800), height: Platform.isPad? windowWidth * (32 / 800) : windowHeight * (32 / 360), borderWidth: 1, borderColor: '#0000001A'}}>
                            <Image source={reload} style={{width: 16, height: 16, aspectRatio: 16 / 16}}/>
                        </TouchableOpacity>
                        <View style={styles.triangle}/>
                    </View>
                </View>
                {subCollections != null? <View style={{flexDirection: 'row', alignItems: 'center', width: 'auto', justifyContent: 'space-between', position: 'absolute', top: windowHeight * (24 / 360), left: windowWidth * (320 / 800)}}>
                    <TouchableOpacity onPress={() => setSubCollections(null)} style={{width: windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={arrow} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360),}}/>
                    </TouchableOpacity>
                    <Text style={{fontWeight: '600', color: 'white', marginLeft: 20, fontSize: windowWidth * (20 / 800), height: windowHeight * (22 / 360)}}>
                        {name}
                    </Text>
                </View> : 
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8', borderRadius: 100, padding: 8, width: windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (56 / 800) : windowHeight * (56 / 360), position: 'absolute', top: windowHeight * (16 / 360), left: windowWidth * (320 / 800)}}>
                    <TouchableOpacity style={{borderRadius: 100, backgroundColor: '#504297', justifyContent: 'center', alignItems: 'center', width: windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), borderWidth: 1, borderColor: 'black'}}>
                        <Image source={tabler} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), backgroundColor: '#504297', aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360)}}>
                        <Image source={building} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                </View>}
                <View style={{backgroundColor: '#F8F8F833', justifyContent: 'space-between', flexDirection: 'row', padding: 8, alignItems: 'center', width: windowWidth * (75 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), top: windowHeight * (24 / 360), left: windowWidth * (653 / 800), position: 'absolute', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF1F'}}>
                    <Image source={star} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                    <Text style={{fontWeight: '600', fontSize: windowWidth * (20 / 800), color: 'white', textAlign: 'center'}}>180</Text>
                </View>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), position: 'absolute', top: windowHeight * (24 / 360), left: windowWidth * (736 / 800), backgroundColor: '#F8F8F833', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF1F'}} onPress={() => navigation.navigate('ParentsCaptchaScreen')}>
                    <Image source={parent} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                </TouchableOpacity>
                <View style={{width: windowWidth * (470 / 800), height: windowHeight * (64 / 360), position: 'absolute', bottom: 5, left: windowWidth * (320 / 800), height: 'auto'}}>
                    <GameCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} setSubCollections={setSubCollections}/>
                </View>
                <View style={{width: windowWidth * (480 / 800), height: Platform.isPad? windowWidth * (200 / 800) : windowHeight * (160 / 360), position: 'absolute', top: windowHeight * (104 / 360), left: windowWidth * (320 / 800)}}>
                    <GamesCollections activeCategory={activeCategory} subCollections={subCollections} setSubCollections={setSubCollections} setName={setName}/>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 10, // Half of the desired width
        borderRightWidth: 10, // Half of the desired width
        borderTopWidth: 8, // Desired height
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#C4DF84',
        alignSelf: 'center',
    },
});

export default GamesScreen;