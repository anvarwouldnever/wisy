import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, useWindowDimensions, Text, Platform, TouchableOpacity, Image, View } from "react-native";
import store from "../store/store";
import { SvgUri } from "react-native-svg";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const GamesCollections = ({ setSubCollections, subCollections, setName, activeCategory }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation()

    const collections = store.categories[activeCategory].collections

    const renderCollections = ({ item }) => {

        return (
            <Animated.View entering={FadeInRight} exiting={FadeOutLeft.duration(100)} style={{width: 'auto', height: 'auto'}}>
                <TouchableOpacity onPress={() => {
                    setSubCollections(item.sub_collections)
                    setName(item.name)
                }} style={{backgroundColor: '#D8F6FF33', borderRadius: 12, width: Platform.isPad? windowWidth * (176 / 800) :  windowWidth * (136 / 800), marginRight: 20, height: Platform.isPad? windowWidth * (200 / 800) : windowHeight * (160 / 360), borderWidth: 1, borderColor: '#FFFFFF1F'}}>
                    <Text style={{fontWeight: '600', fontSize: 12, lineHeight: 20, textAlign: 'center', width: '100%', height: 'auto', color: 'white', position: 'absolute', top: 8}}>Tap to play</Text>
                    <View style={{width: '100%', position: 'absolute', borderColor: 'white', borderWidth: 1, opacity: 0.12, top: 35}}/>
                    <Image source={{uri: item.image.url}} style={{width: item.thumbnail? windowWidth * (115 / 800) : windowWidth * (135 / 800), height: windowHeight * (82 / 360), alignSelf: 'center', position: 'absolute', top: windowHeight * (35 / 360), resizeMode: 'contain'}}/>
                    <View style={{width: '100%', position: 'absolute', borderColor: 'white', borderWidth: 1, opacity: 0.12, bottom: 40}}/>
                    <View style={{width: '100%', height: windowHeight * (35 / 360), bottom: 0, position: 'absolute', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                        {item.skills && item.skills.length > 0 && item.skills.map((image, index) => (
                            <Image 
                                key={index} 
                                source={image} 
                                style={{
                                    resizeMode: 'contain', 
                                    width: windowWidth * (24 / 800), 
                                    height: windowHeight * (24 / 360), 
                                    marginHorizontal: 5
                                }} 
                            />
                        ))}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const renderSubCollections = ({ item }) => {
        const { image } = item;
    
        const isSvg = typeof image === 'string' && image.endsWith('.svg');
        // onPress={() => navigation.navigate('GameScreen', { tasks: item.tasks })}
    
        return (
            <Animated.View entering={FadeInRight} style={{ width: 'auto', height: 'auto' }}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('GameScreen', { tasks: item.tasks })}
                    style={{
                        backgroundColor: '#D8F6FF33', 
                        borderRadius: 12, 
                        width: Platform.isPad ? windowWidth * (176 / 800) : windowWidth * (136 / 800), 
                        marginRight: 20, 
                        height: Platform.isPad ? windowWidth * (200 / 800) : windowHeight * (160 / 360), 
                        borderWidth: 1, 
                        borderColor: '#FFFFFF1F'
                    }}
                >
                    <Text 
                        style={{
                            fontWeight: '600', 
                            fontSize: 12, 
                            lineHeight: 20, 
                            textAlign: 'center', 
                            width: '100%', 
                            height: 'auto', 
                            color: 'white', 
                            position: 'absolute', 
                            top: 8
                        }}
                    >
                        Tap to play
                    </Text>
                    <View 
                        style={{
                            width: '100%', 
                            position: 'absolute', 
                            borderColor: 'white', 
                            borderWidth: 1, 
                            opacity: 0.12, 
                            top: 35
                        }} 
                    />
                    {isSvg ? (
                        <SvgUri 
                            uri={image} 
                            width={windowWidth * (115 / 800)} 
                            height={windowHeight * (82 / 360)} 
                            style={{
                                alignSelf: 'center', 
                                position: 'absolute', 
                                top: windowHeight * (35 / 360), 
                                resizeMode: 'contain'
                            }}
                        />
                    ) : (
                        <Image 
                            source={{ uri: image }} 
                            style={{
                                alignSelf: 'center', 
                                position: 'absolute', 
                                top: windowHeight * (35 / 360), 
                                width: windowWidth * (115 / 800), 
                                height: windowHeight * (82 / 360), 
                                resizeMode: 'contain'
                            }}
                        />
                    )}
                    <View 
                        style={{
                            width: '100%', 
                            position: 'absolute', 
                            borderColor: 'white', 
                            borderWidth: 1, 
                            opacity: 0.12, 
                            bottom: 40
                        }} 
                    />
                    <View 
                        style={{
                            width: '100%', 
                            height: windowHeight * (35 / 360), 
                            bottom: 0, 
                            position: 'absolute', 
                            alignItems: 'center', 
                            flexDirection: 'row', 
                            alignSelf: 'center', 
                            justifyContent: 'center'
                        }}
                    >
                        {item.skills && item.skills.length > 0 && item.skills.map((image, index) => (
                            <Image 
                                key={index}
                                source={image}
                                style={{
                                    resizeMode: 'contain', 
                                    width: windowWidth * (24 / 800), 
                                    height: windowHeight * (24 / 360), 
                                    marginHorizontal: 5
                                }} 
                            />
                        ))}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };
    

    return (
        <FlatList
            horizontal={true} 
            data={subCollections != null? subCollections : collections}
            renderItem={subCollections != null? renderSubCollections : renderCollections}
            keyExtractor={game => game.id}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
        />
    )
}

export default GamesCollections;

// const games = [
    //     {name: 'Dzīvnieki un kukaiņi?', id: '0', game: 'Game1Screen', image: dog, skills: [skills1, skills2], thumbnail: pronouncegame},
    //     {name: 'Where do I live?', id: '1', game: 'Game2Screen', image: bear, skills: [skills1, skillsa, skills3], thumbnail: namegame},
    //     {name: 'Where do I eat?', id: '2', game: 'Game3Screen', image: fox, skills: [skills5, skills4, skillsa, skills6], thumbnail: excessgame},
    //     {name: 'Where do I eat?', id: '3', game: 'Game4Screen', image: mosquito, skills: []},
    //     {name: 'Where do I eat?', id: '4', game: 'Game5Screen', image: mosquito, skills: [], thumbnail: skingame },
    //     {name: '17', id: '5', game: 'Game6Screen', image: mosquito},
    //     {name: '23', id: '7', game: 'Game8Screen', image: mosquito},
    //     {name: '24', id: '8', game: 'Game9Screen', image: mosquito},
    // ]