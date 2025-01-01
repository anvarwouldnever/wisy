import { View, Image, TouchableOpacity, FlatList, Platform, useWindowDimensions } from 'react-native';
import Animated, { ZoomInEasyDown } from 'react-native-reanimated';
import SvgUri from 'react-native-svg';
import React, { useState, useEffect } from 'react';

const Game5AnimalsAnimation = ({ answer, images, animal }) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Change key on animal or images update
    }, [images]);

    const isAnimalSvg = animal && animal.endsWith('.svg');

    const renderItem = ({ item }) => {
        const isSvg = item.url.endsWith('.svg');
    
        return (
            <TouchableOpacity onPress={() => answer({ answer: item.id })} style={{
                borderRadius: 10, backgroundColor: 'white', 
                width: windowWidth * (120 / 800), height: Platform.isPad ? windowWidth * (120 / 800) : windowHeight * (120 / 360), 
                justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white'
            }}>
                {isSvg ? (
                    <SvgUri uri={item.url} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 }} />
                ) : (
                    <Image source={{ uri: item.url }} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 }} />
                )}
                {item.name === 'monkey' && <Image source={passedimg} style={{ width: windowWidth * (24 / 800), height: Platform.isPad ? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4 }} />}
            </TouchableOpacity>
        );
    };
    
    return (
        <Animated.View key={key} entering={ZoomInEasyDown} style={{ width: windowWidth * (528 / 800), height: Platform.isPad? windowWidth * (312 / 800) : windowHeight * (312 / 360), alignSelf: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
            {animal ? (
                isAnimalSvg ? (
                    <SvgUri uri={animal} style={{ width: windowWidth * (244 / 800), height: windowHeight * (152 / 360) }} />
                ) : (
                    <Image source={{ uri: animal }} style={{ width: windowWidth * (244 / 800), height: Platform.isPad? windowWidth * (152 / 800) : windowHeight * (152 / 360), resizeMode: 'contain' }} />
                )
            ) : null}
            <View style={{ height: Platform.isPad ? windowWidth * (120 / 800) : windowHeight * (120 / 360), alignItems: 'center' }}>
                <FlatList 
                    data={images}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={{ width: '100%', justifyContent: 'space-evenly'}}
                />
            </View>
        </Animated.View>
    );
};

export default Game5AnimalsAnimation;
