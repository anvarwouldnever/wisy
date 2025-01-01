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

    // useEffect(() => {
    //     const fetchCollections = () => {
    //         const category = store.categories[activeCategory];
    //         if (category && category.collections) {
    //             setCollections(category.collections);
    //         }
    //     };
    //     fetchCollections();
    // }, [store.categories[activeCategory].collections, activeCategory]);

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();


    const HeaderCollection = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', width: 'auto', justifyContent: 'space-between', position: 'absolute', top: windowHeight * (24 / 360), left: windowWidth * (320 / 800)}}>
                <TouchableOpacity onPress={() => setSubCollections(null)} style={{width: Platform.isPad? windowWidth * (72 / 1194) : windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (72 / 1194) : windowHeight * (40 / 360), backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={arrow} style={{width: Platform.isPad? windowWidth * (40 / 1194) : windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (40 / 1194) : windowHeight * (24 / 360),}}/>
                </TouchableOpacity>
                <Text style={{fontWeight: '600', color: 'white', marginLeft: 20, fontSize: Platform.isPad? windowWidth * (20 / 800) : windowWidth * (20 / 800), textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center'}}>
                    {name}
                </Text>
            </View>
        )
    }

    const HeaderMenu = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8', borderRadius: 100, padding: 8, width: Platform.isPad? windowWidth * (184 / 1194) : windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (104 / 1194) : windowHeight * (56 / 360), position: 'absolute', top: windowHeight * (16 / 360), left: windowWidth * (320 / 800)}}>
                <TouchableOpacity style={{borderRadius: 100, backgroundColor: '#504297', justifyContent: 'center', alignItems: 'center', width: Platform.isPad? windowWidth * (72 / 1194) : windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (68 / 1194) : windowHeight * (40 / 360), borderColor: 'black'}}>
                    <Image source={tabler} style={{width: Platform.isPad? windowWidth * (40 / 1194) : windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (40 / 1194) : windowHeight * (24 / 360), backgroundColor: '#504297', aspectRatio: 24 / 24}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: Platform.isPad? windowWidth * (72 / 1194) : windowWidth * (40 / 800), height: Platform.isPad? windowHeight * (68 / 834) : windowHeight * (40 / 360),}}>
                    <Image source={building} style={{width: Platform.isPad? windowWidth * (40 / 1194) : windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (40 / 1194) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                </TouchableOpacity>
            </View>
        )
    }

    // Platform.isPad? windowWidth * (60 / 800) : windowHeight * (60 / 360)

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={bgimage} style={{flex: 1}}>
            <View style={{backgroundColor: '#F8F8F8', height: windowHeight, width: windowWidth * (280 / 800), borderTopRightRadius: 24, borderBottomRightRadius: 24, alignItems: 'center'}}>
                <View style={{width: windowWidth * (126 / 800), alignItems: 'center', flexDirection: 'row', height: Platform.isPad? windowWidth * (48 / 800) : windowHeight * (48 / 360), position: 'absolute', left: windowWidth * (60 / 800), top: windowHeight * (20 / 360)}}>
                    <View style={{width: windowWidth * (100 / 800), justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'center', right: 0, borderRadius: 100, height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: '#FFFFFF'}}>
                        <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: '#000000'}}>{store.playingChildId.name}</Text>
                    </View>
                    <Image source={dog} style={{width: windowWidth * (48 / 800), height: windowHeight * (48 / 360), aspectRatio: 48 / 48}}/>
                </View>
                <View style={{alignItems: 'center', position: 'absolute', bottom: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (10 / 360), left: Platform.isPad? 'auto' : windowWidth * (60 / 800), justifyContent: 'space-between', height: 'auto', gap: Platform.isPad? 20 : 0}}>
                    <View style={{width: windowWidth * (192 / 800), height: 'auto'}}>
                        <View style={{borderRadius: 16, backgroundColor: '#C4DF84', padding: 13, width: windowWidth * (192 / 800), height: 'auto'}}>
                            <Text style={{fontWeight: '500', fontSize: windowWidth * (14 / 800)}}>
                                Lorem ipsum dolor sit amet consectetur. Nulla dignsim malesuada . . .
                            </Text>
                        </View>
                        <View style={styles.triangle}/>
                        <TouchableOpacity style={{borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -10, right: -10, backgroundColor: '#F8F8F8', width: windowWidth * (32 / 800), height: Platform.isPad? windowWidth * (32 / 800) : windowHeight * (32 / 360), borderWidth: 1, borderColor: '#0000001A'}}>
                            <Image source={reload} style={{width: windowWidth * (16 / 800), height: Platform.isPad? windowWidth * (16 / 800) : windowHeight * (16 / 360), aspectRatio: 16 / 16}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: windowWidth * (190 / 800), justifyContent: 'center', alignItems: 'center', height: Platform.isPad? windowWidth * (190 / 800) : windowHeight * (190 / 360)}}>
                        <Image source={mywisy} style={{width: Platform.isPad? windowWidth * (220 / 800) : 220, height: Platform.isPad? windowWidth * (220 / 800) : 220, aspectRatio: 220 / 220}}/>
                    </View>
                </View>
            </View>
                {subCollections != null? <HeaderCollection /> : <HeaderMenu />}
                <View style={{backgroundColor: '#F8F8F833', gap: 4, justifyContent: 'center', flexDirection: 'row', padding: 8, alignItems: 'center', width: Platform.isPad? windowWidth * (113 / 1194) : windowWidth * (75 / 800), height: Platform.isPad? windowWidth * (72 / 1194) : windowHeight * (40 / 360), top: windowHeight * (24 / 360), left: windowWidth * (653 / 800), position: 'absolute', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF1F'}}>
                    <Image source={star} style={{width: Platform.isPad? windowWidth * (40 / 1194) : windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (40 / 1194) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                    <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowHeight * (24 / 834) : windowWidth * (20 / 800), color: 'white', textAlign: 'center'}}>180</Text>
                </View>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: Platform.isPad? windowWidth * (68 / 1194) : windowWidth * (40 / 800), height: Platform.isPad? windowWidth * (68 / 1194) : windowHeight * (40 / 360), position: 'absolute', top: windowHeight * (24 / 360), left: windowWidth * (736 / 800), backgroundColor: '#F8F8F833', borderRadius: 100, borderWidth: 1, borderColor: '#FFFFFF1F'}} onPress={() => navigation.navigate('ParentsCaptchaScreen')}>
                    <Image source={parent} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24}}/>
                </TouchableOpacity>
                <View style={{width: windowWidth * (470 / 800), height: windowHeight * (64 / 360), position: 'absolute', bottom: 5, left: windowWidth * (320 / 800), height: 'auto'}}>
                    <GameCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} setSubCollections={setSubCollections}/>
                </View>
                <View style={{width: windowWidth * (480 / 800), height: Platform.isPad? windowHeight * (402 / 834) : windowHeight * (160 / 360), position: 'absolute', top: Platform.isPad? windowHeight * (224 / 834) : windowHeight * (104 / 360), left: windowWidth * (320 / 800)}}>
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