import { View, Text, useWindowDimensions, Platform, Image, TouchableOpacity, PanResponder } from 'react-native'
import React, { useState, useRef } from 'react'
import Game8Tutorial from '../components/Game8Tutorial';
import { useNavigation } from '@react-navigation/native';
import Animated, { ZoomInEasyDown } from 'react-native-reanimated';
import wisy from '../images/pandaHead.png'
import Svg, { Polyline } from 'react-native-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Game10Screen = ({ data, setLevel }) => {

    // console.log(data)
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [tutorial, setTutorial] = useState(true);
    const viewShotRef = useRef(null);
    
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

    const saveAndShareImage = async () => {
        try {
        const uri = await captureRef(viewShotRef, {
            format: 'png',
            quality: 1,
        });

        const fileName = uri.split('/').pop();
        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
            from: uri,
            to: destinationUri,
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(destinationUri);
        } else {
            console.log("Sharing is not available on this platform.");
        }
        } catch (error) {
        console.error("Error saving and sharing image:", error);
        }
    };

    return (
        <View entering={ZoomInEasyDown} style={{position: 'absolute', top: 24, width: windowWidth - 60, height: windowHeight - 60, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: windowWidth * (408 / 800), height: windowHeight * (184 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: windowWidth * (184 / 800), height: windowHeight * (184 / 360), borderRadius: 10}}>
                    <Text style={{fontSize: 112, color: "#504297", fontWeight: '600', textAlign: 'center'}}>A</Text>
                </View>
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>  
                    <View
                        {...panResponder.panHandlers}
                        style={{backgroundColor: 'white', width: windowWidth * (184 / 800), height: windowHeight * (184 / 360), borderRadius: 10}}
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
            </View>
            <View style={{width: windowWidth * (730 / 800), height: Platform.isPad? windowWidth * (64 / 800) : 'auto', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0}}>
                <View style={{width: 'auto', height: Platform.isPad? windowWidth * (150 / 800) : 'auto', alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                    <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                </View>
            </View>
        </View>
    )
}

export default Game10Screen;