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

const Game8Screen = ({ data, setLevel }) => {

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
        <Animated.View entering={ZoomInEasyDown} style={{position: 'absolute', top: 24, width: windowWidth - 60, height: windowHeight - 60, alignItems: 'center', justifyContent: 'center'}}>
            {tutorial && <View style={{ width: windowWidth * (600 / 800), height: windowHeight * (272 / 360), position: 'absolute', alignSelf: 'center', top: '6%' }}>
                <Game8Tutorial />
            </View>}
            {!tutorial && <View style={{width: windowWidth * (592 / 800), height: windowHeight * (136 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image source={{uri: data.content.first_image }} style={{width: windowWidth * (136 / 800), height: windowHeight * (136 / 360)}}/>
                <Text style={{fontSize: 80, fontWeight: '600', color: '#555555'}}>{data.content.operation === 'addition'? '+' : ''}</Text>
                <Image source={{uri: data.content.second_image }} style={{width: windowWidth * (136 / 800), height: windowHeight * (136 / 360)}}/>
                <Text style={{fontSize: 80, fontWeight: '600', color: '#555555'}}>=</Text>
              
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>  
                    <View
                        {...panResponder.panHandlers}
                        style={{backgroundColor: 'white', width: windowWidth * (136 / 800), height: windowHeight * (136 / 360), borderRadius: 10}}
                    >
                        <Svg height='100%' width='100%'>
                        {lines.map((line, index) => (
                            <Polyline
                            key={index}
                            points={line.join(' ')}
                            stroke="#504297"
                            strokeWidth="6"
                            fill="none"
                            />
                        ))}
                        <Polyline
                            points={currentLine.join(' ')}
                            stroke="#504297"
                            strokeWidth="6"
                            fill="none"
                        />
                        </Svg>
                    </View>
                </ViewShot>
            </View>}
            <View style={{width: windowWidth * (730 / 800), height: Platform.isPad? windowWidth * (64 / 800) : 'auto', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0}}>
                <View style={{width: 'auto', height: Platform.isPad? windowWidth * (150 / 800) : 'auto', alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                    <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                </View>
                {tutorial && <TouchableOpacity onPress={() => setTutorial(false)} style={{width: windowWidth * (58 / 800), height: windowHeight * (40 / 360), backgroundColor: 'white', alignSelf: 'flex-end', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '600', fontSize: 12, color: '#504297'}}>
                      Skip
                    </Text>
                </TouchableOpacity>}
            </View>
        </Animated.View>
    )
}

export default Game8Screen;