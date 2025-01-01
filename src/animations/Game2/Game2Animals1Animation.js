import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, FlatList, Text, Image, TouchableOpacity, Platform } from "react-native";
import passedimg from '../../images/gamepassed.png';
import { SvgUri } from "react-native-svg";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";

const Animals1Animation = ({ answer, images, animal }) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Change key on animal or images update
    }, [animal, images]);
    
    const renderItem = ({ item }) => {
        const isSvg = item.url.endsWith('.svg');
    
        return (
            <TouchableOpacity onPress={() => answer({ answer: item.id })} style={{
                borderRadius: 10, backgroundColor: 'white', 
                width: windowWidth * (120 / 800), height: Platform.isPad ? windowWidth * (120 / 800) : windowHeight * (120 / 360), 
                justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white'
            }}>
                {isSvg ? (
                    <SvgUri uri={item.url} width={Platform.isPad? windowWidth * (100 / 800) : windowWidth * (100 / 800)} height={Platform.isPad? windowWidth * (100 / 800) : windowHeight * (100 / 360)} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 360) : windowHeight * (108 / 360), aspectRatio: 1 }} />
                ) : (
                    <Image source={{ uri: item.url }} style={{ width: Platform.isPad? windowWidth * (100 / 800) : windowWidth * (100 / 800), height: Platform.isPad ? windowWidth * (100 / 800) : windowHeight * (100 / 360), aspectRatio: 1 }} />
                )}
                {item.name === 'monkey' && <Image source={passedimg} style={{ width: windowWidth * (24 / 800), height: Platform.isPad ? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4 }} />}
            </TouchableOpacity>
        );
    };

    return (
            <Animated.View key={key} entering={ZoomInEasyDown.duration(400)} style={{width: windowWidth * (664 / 800), height: Platform.isPad? windowWidth * (228 / 800) : windowHeight * (228 / 360), position: 'absolute', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (192 / 800), height: Platform.isPad? windowWidth * (52 / 800) : windowHeight * (52 / 360), borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#222222', fontSize: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (20 / 360), fontWeight: '500', textAlign: 'center'}}>{animal}</Text>
                </View> 
                <View style={{width: windowWidth * (664 / 800), height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360)}}>
                    <FlatList 
                        data={images}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}
                    />
                </View>
            </Animated.View>
        )
}

export default Animals1Animation;