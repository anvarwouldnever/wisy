import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, PanResponder, Image, TouchableOpacity, Platform } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import lion from '../images/pig.png'
import speaker from '../images/speaker2.png'
import store from '../store/store';
import { Audio } from 'expo-av';
import api from '../api/api'
import wisy from '../images/pandaHead.png'
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { playSound } from '../hooks/usePlayBase64Audio';
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation';
import { SvgUri } from 'react-native-svg';

const LetterBox = ({ letter, isUnknown, windowWidth, windowHeight }) => {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState([]);

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
        <View
            style={{
                width: windowWidth * (96 / 800),
                height: Platform.isPad ? windowWidth * (96 / 800) : windowHeight * (96 / 360),
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}
        >
            {isUnknown ? (
                <ViewShot
                    style={{
                        borderRadius: 10,
                        borderColor: '#504297',
                        borderWidth: 2,
                    }}
                    options={{ format: 'png', quality: 1 }}
                >
                    <View
                        {...panResponder.panHandlers}
                        style={{
                            width: windowWidth * (94 / 800),
                            height: Platform.isPad
                                ? windowWidth * (94 / 800)
                                : windowHeight * (94 / 360),
                            borderRadius: 10,
                        }}
                    >
                        <Svg height="100%" width="100%">
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
                <Text
                    style={{
                        fontSize: 64,
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#504297',
                    }}
                >
                    {letter}
                </Text>
            )}
        </View>
    );
};

export default LetterBox;