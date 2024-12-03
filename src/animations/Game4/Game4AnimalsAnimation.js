import { View, useWindowDimensions, FlatList, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import passedimg from '../../images/gamepassed.png';
import speaker from '../../images/speaker2.png'
import store from '../../store/store'
import { SvgUri } from "react-native-svg";
import { Audio } from 'expo-av';
import Animated, { ZoomInEasyDown } from 'react-native-reanimated';

const Game4AnimalsAnimation = ({ answer, audio, images }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const sound = React.useRef(new Audio.Sound());

    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Change key on animal or images update
    }, [images, audio]);

    useEffect(() => {
        return () => {
            sound.current.unloadAsync();
        };
    }, [])

    const voice = async () => {
        try {
            store.setPlayingMusic(false);
            await sound.current.loadAsync({ uri: audio });
            await sound.current.playAsync();
    
            // Устанавливаем проверку окончания воспроизведения
            sound.current.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    store.setPlayingMusic(true);
                    sound.current.unloadAsync();
                }
            });
        } catch (error) {
            console.log("Error playing audio:", error);
            await sound.current.unloadAsync();
        }
    };

    const renderItem = ({ item }) => {
        const isSvg = item.url.endsWith('.svg');
    
        return (
            <TouchableOpacity onPress={() => answer({ answer: item.id })} style={{
                borderRadius: 10, backgroundColor: 'white', 
                width: windowWidth * (120 / 800), height: Platform.isPad ? windowWidth * (120 / 800) : windowHeight * (120 / 360), 
                justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white'
            }}>
                {isSvg ? (
                    <SvgUri uri={item.url} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1, borderRadius: 5 }} />
                ) : (
                    <Image source={{ uri: item.url }} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1, borderRadius: 5 }} />
                )}
                {item.name === 'monkey' && <Image source={passedimg} style={{ width: windowWidth * (24 / 800), height: Platform.isPad ? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4 }} />}
            </TouchableOpacity>
        );
    };
    
    return (
        <Animated.View key={key} entering={ZoomInEasyDown} style={{width: windowWidth * (664 / 800), height: windowHeight * (232 / 360), position: 'absolute', alignSelf: 'center', top: '10%', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => voice()} style={{width: windowWidth * (80 / 800), borderWidth: 1, height: windowHeight * (80 / 360), borderRadius: 100, backgroundColor: '#B3ABDB', borderColor: '#DFD0EE', borderWidth: 4, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={speaker} style={{width: windowWidth * (40 / 800), height: windowHeight * (40 / 360)}}/>
            </TouchableOpacity>
            <View style={{height: Platform.isPad? windowWidth * (120 / 800) : windowHeight * (120 / 360), alignItems: 'center', width: 'auto'}}>
                <FlatList 
                    data={images}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={{width: '100%', justifyContent: 'space-evenly'}}
                />
            </View>
        </Animated.View>
    )
}

export default Game4AnimalsAnimation;

// const answer = (name) => {
    //     if (name === 'cow') {
    //         setIncorrectAnimal('')
    //         setCorrect(true)
    //         setText('That’s correct!')
    //         setTimeout(() => {
    //             setText('Tap on the speaker to play the sound..')
    //             setLevel(2)
    //         }, 2000);
    //     } else {
    //         setIncorrectAnimal(name)
    //         setText('Incorrect. Try again!')
    //         setTimeout(() => {
    //             setText(null)
    //         }, 2000);
    //     }
    // }