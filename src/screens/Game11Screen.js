import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, PanResponder, Image, TouchableOpacity, Platform } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Svg, { Polyline } from 'react-native-svg';
import lion from '../images/pig.png'
import speaker from '../images/speaker2.png'
import store from '../store/store';
import { Audio } from 'expo-av';
import wisy from '../images/pandaHead.png'

const Game11Screen = ({ data, setLevel }) => {

    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState([]);
    const sound = React.useRef(new Audio.Sound());
    const audio = data.content.audio

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const word = `${data.content.word}`.split('');

    const viewShotRef = useRef(null);

    const [text, setText] = useState(data.content.wisy_question);
    const [thinking, setThinking] = useState(false);

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
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentLine([`${locationX},${locationY}`]);
        },
        onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentLine((prev) => [...prev, `${locationX},${locationY}`]);
        },
        onPanResponderRelease: () => {
        setLines((prev) => [...prev, currentLine]);
        setCurrentLine([]);
        },
    });

    return (
        <View style={{ position: 'absolute', top: 24, width: windowWidth - 60, height: windowHeight - 60, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ minWidth: windowWidth * (320 / 800), height: windowHeight * (260 / 360), alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', top: 0}}>
                <View style={{ width: windowWidth * (244 / 800), height: windowHeight * (140 / 360), backgroundColor: '#FFFFFF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Image source={{ uri: data.content.image }} style={{width: windowWidth * (108 / 800), height: windowHeight * (108 / 360)}}/>
                    <TouchableOpacity onPress={() => voice()} style={{width: windowWidth * (64 / 800), borderWidth: 1, height: windowHeight * (64 / 360), borderRadius: 100, backgroundColor: '#B3ABDB', borderColor: '#DFD0EE', borderWidth: 4, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={speaker} style={{width: windowWidth * (30 / 800), height: windowHeight * (30 / 360)}}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    {word.map((letter, index) => {
                        const isUnknown = letter === '*';

                        return (
                            <View key={index} style={{ width: windowWidth * (96 / 800), height: windowHeight * (96 / 360), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                                {isUnknown ? (
                                    <ViewShot ref={viewShotRef} style={{borderRadius: 10, borderColor: '#504297', borderWidth: 2}} options={{ format: 'png', quality: 1 }}>  
                                        <View
                                            {...panResponder.panHandlers}
                                            style={{backgroundColor: 'white', width: windowWidth * (94 / 800), height: windowHeight * (94 / 360), borderRadius: 10}}
                                        >
                                            <Svg height='100%' width='100%'>
                                            {lines.map((line, index) => (
                                                <Polyline
                                                key={index}
                                                points={line.join(' ')}
                                                stroke="#504297"
                                                strokeWidth="4"
                                                fill="none"
                                                />
                                            ))}
                                            <Polyline
                                                points={currentLine.join(' ')}
                                                stroke="#504297"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            </Svg>
                                        </View>
                                    </ViewShot>
                                ) : (
                                    <Text style={{ fontSize: 64, fontWeight: '600', textAlign: 'center', color: '#504297' }}>{letter}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={{width: windowWidth * (255 / 800), position: 'absolute', left: 0, bottom: 0, height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                {/* <Game3TextAnimation text={text} thinking={thinking}/> */}
            </View>
        </View>
    );
};

export default Game11Screen;


