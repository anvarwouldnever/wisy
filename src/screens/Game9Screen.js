import { View, Text, Platform, useWindowDimensions, Image, FlatList, PanResponder, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import wisy from '../images/pandaHead.png'
import { Svg, Polyline } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { playSound } from '../hooks/usePlayBase64Audio';
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation';
import api from '../api/api'
import store from '../store/store';

const Game9Screen = ({ data, setLevel, setStars }) => {
    
    let images = data.content.images
    // console.log(data)
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation();

    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState([]);

    const [text, setText] = useState(data.content.wisy_question);
    const [attempt, setAttempt] = useState('1');
    const [thinking, setThinking] = useState(false);

    const viewShotRef = useRef(null);
    
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

    const renderItem = ({ item }) => {
        const isSvg = item.url.endsWith('.svg');
    
        return isSvg ? (
            <SvgUri 
                uri={item.url} 
                width={windowWidth * (64 / 800)} 
                height={Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360)} 
            />
        ) : (
            <Image 
                source={{ uri: item.url }} 
                style={{ 
                    width: windowWidth * (64 / 800), 
                    height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360) 
                }} 
                resizeMode="contain" 
            />
        );
    };

    const saveAndShareImage = async () => {
        try {
            const uri = await captureRef(viewShotRef, {
                format: 'png',
                quality: 1,
            });

            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) throw new Error('File does not exist');

            const fileName = uri.split('/').pop();
            const fileType = 'image/png';

            const file = {
                uri,
                name: fileName,
                type: fileType,
            };

            return file;
        } catch (error) {
            console.error("Error saving and sharing image:", error);
        }
    };

    const answer = async() => {
        try {
            const image = await saveAndShareImage()
            // console.log(image)
            setThinking(true)
            const response = await api.answerHandWritten({task_id: data.id, attempt: attempt, child_id: store.playingChildId.id, images: [image]})
            console.log(response)
            if (response && response.stars) {
                setText(response?.hint)
                playSound(response?.sound)
                setTimeout(() => {
                    setStars(response.stars)
                    setLevel(prev => prev + 1);
                }, 1500);
            }
            else if (response && response.stars) {
                setText(response?.hint)
                playSound(response?.sound)
                setTimeout(() => {
                    setStars(response.stars)
                    setLevel(prev => prev + 1);
                }, 1500);
            }
            else if (response && !response.success && !response.to_next) {
                setText(response.hint)
                playSound(response.sound)
                setAttempt('2')
                setLines([])
            } else if(response && response.success) {
                setText(response.hint)
                playSound(response.sound)
                setTimeout(() => {
                    setLevel(prev => prev + 1);
                    setAttempt('1');
                }, 1500);
            } else if(response && !response.success && response.to_next) {
                setLevel(prev => prev + 1);
                setText('Not correct... But anyways, lets move on')
                setAttempt('1')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setThinking(false)
        }
    };


    return (
        <View style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{alignItems: 'center', width: windowWidth * (602 / 800), height: Platform.isPad? windowWidth * (239 / 800) : windowHeight * (239 / 360), flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (602 / 800), height: Platform.isPad? windowWidth * (84 / 800) : windowHeight * (84 / 360), alignItems: 'center'}}>
                    <FlatList 
                        data={images}
                        renderItem={renderItem}
                        contentContainerStyle={{backgroundColor: 'white', alignItems: 'center', borderRadius: 10, gap: windowWidth * (10 / 800), padding: 10}}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: windowWidth * (292 / 800), height: windowHeight * (115 / 360)}}>
                    <View style={{width: windowWidth * (115 / 800), height: Platform.isPad? windowWidth * (115 / 800) : windowHeight * (115 / 360), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                        {data.content.question_image.endsWith('.svg') ? (
                            <SvgUri 
                                uri={data.content.question_image} 
                                width={windowWidth * (80 / 800)} 
                                height={windowHeight * (80 / 360)} 
                            />
                        ) : (
                            <Image 
                                source={{ uri: data.content.question_image }} 
                                style={{
                                    width: windowWidth * (80 / 800), 
                                    height: Platform.isPad? windowWidth * (80 / 800) : windowHeight * (80 / 360)
                                }}
                            />
                        )}
                    </View>
                    <Text style={{fontSize: 40, fontWeight: '600', color: '#504297'}}>=</Text>
                    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
                        <View
                            {...panResponder.panHandlers}
                            style={{width: windowWidth * (115 / 800), height: Platform.isPad? windowWidth * (115 / 800) : windowHeight * (115 / 360), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}
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
                </View>
            </View>
            <View style={{width: 'auto', height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0}}>
                <View style={{width: windowWidth * (255 / 800), height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (100 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                    <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                    <Game3TextAnimation text={text} thinking={thinking}/>
                </View>
            </View>
            {lines.length != 0 && <TouchableOpacity onPress={() => answer()} style={{width: windowWidth * (120 / 800), backgroundColor: '#FF69B4', borderRadius: 100, height: Platform.isPad? windowWidth * (50 / 800) : windowHeight * (50 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, right: 0}}>
                <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>Send</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default Game9Screen;