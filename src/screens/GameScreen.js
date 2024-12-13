import { View, TouchableOpacity, Text, Image, useWindowDimensions, Platform, ImageBackground } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import store from '../store/store'
import Game1Screen from './Game1Screen'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, withTiming, withSpring, withSequence, useSharedValue } from 'react-native-reanimated'
import narrowleft from '../images/narrowleft-purple.png'
import star from '../images/Star.png'
import bg from '../images/bgg.png'
import Game5Screen from './Game5Screen'
import Game3Screen from './Game3Screen'
import Game4Screen from './Game4Screen'
import Game6Screen from './Game6Screen'
import Game2Screen from './Game2Screen'
import TestScreen from './TestScreen'
import Game8Screen from './Game8Screen'
import Game9Screen from './Game9Screen'
import Game10Screen from './Game10Screen'
import Game11Screen from './Game11Screen'
import Game12Screen from './Game12Screen'
import Game13Screen from './Game13Screen'
import statStar from '../images/tabler_star-filled.png';
import CongratulationsScreen from './CongratulationsScreen'

const GameScreen = (params) => {

    const tasks = params.route.params.tasks
    const navigation = useNavigation()
    const [level, setLevel] = useState(0);

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const RenderVoiceGame = () => {
        return (    
            <Game1Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderWithImageGame = () => {
        return (
            <Game5Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderSimpleGame = () => {
        return (
            <Game3Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderWithAudio = () => {
        return (
            <Game4Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderWithTitleGame = () => {
        return (
            <Game2Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderHandWrittenSimpleGame = () => {
        return (
            <Game8Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderHandWrittenRepeatGame = () => {
        return (
            <Game10Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderHandWrittenCountingGame = () => {
        return (
            <Game9Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderHandWrittenWordGame = () => {
        return (
            <Game11Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderTextSingleChoiceSimpleGame = () => {
        return (
            <Game13Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderTextSingleChoiceWithAudioGame = () => {
        return (
            <Game12Screen data={tasks[level]} setLevel={setLevel}/>
        )
    }

    const RenderPuzzleGame = () => {
        const [data, setData] = useState(null);
    
        useEffect(() => {
            const svgData = tasks[level].content.svg
            
            if (svgData) {
                function parseSVG() {
                    const groupRegex = /<g[^>]+id="([^"]+)">([\s\S]*?)<\/g>/g;
                    const pathRegex = /<path[^>]+data-name="([^"]+)"[^>]+d="([^"]+)"[^>]+fill="([^"]+)"[^>]+stroke-width="([^"]+)"/g;
    
                    const partsPaths = [];
                    const imagePaths = [];
    
                    let groupMatch;
                    
                    while ((groupMatch = groupRegex.exec(svgData)) !== null) {
                        const groupId = groupMatch[1];
                        const groupContent = groupMatch[2];
    
                        let pathMatch;
                        
                        while ((pathMatch = pathRegex.exec(groupContent)) !== null) {
                            const path = {
                                id: pathMatch[1],
                                d: pathMatch[2],
                                fill: groupId === "image" ? '#dedbfb' : pathMatch[3],
                                strokeWidth: pathMatch[4]
                            };
    
                            if (groupId === "parts") {
                                partsPaths.push(path);
                            } else if (groupId === "image") {
                                imagePaths.push(path);
                            }
                        }
                    }
    
                    return { partsPaths, imagePaths };
                }
    
                const parsedData = parseSVG();
    
                setData(parsedData);
            }
        }, [])

        return data ? <Game6Screen data={data} setLevel={setLevel} /> : null;
    };
    
    const animatedProgress = useAnimatedStyle(() => {
        return {
            width: withTiming(level === 1 ? windowWidth * (8 / 800) : level === 2? windowWidth * (16 / 800) : level === 3? windowWidth * (24 / 800) : level === 4? windowWidth * (32 / 800) : level === 5? windowWidth * (40 / 800) : level === 6? windowWidth * (48 / 800) : level === 7? windowWidth * (56 / 800) : level === 8? windowWidth * (64 / 800) : level === 9? windowWidth * (72 / 800) : level === 10 && windowWidth * (80 / 800), {duration: 300})
        }
    });

    const BackButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: 'white', width: windowWidth * (85 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), borderRadius: 100, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: windowWidth * (8 / 800), position: 'absolute', left: 30, top: 30}}>
                <Image source={narrowleft} style={{width: 24, height: 24, aspectRatio: 24 / 24}}/>
                <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), lineHeight: windowHeight * (20 / 360), color: '#504297'}}>Exit</Text>
            </TouchableOpacity>
        )
    }

    const ProgressAnimation = () => {
        return (
            <View style={{width: windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (28 / 800) : windowHeight * (28 / 360), position: 'absolute', right: 30, top: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), backgroundColor: 'white', borderRadius: 100, alignItems: 'center', flexDirection: 'row', padding: 2}}>
                    <Animated.View style={[animatedProgress, {height: Platform.isPad? windowWidth * (8 / 800) : windowHeight * (8 / 360), backgroundColor: '#504297', borderRadius: 100}]}/>
                </View>
                <Image source={star} style={{width: windowWidth * (28 / 800), height: Platform.isPad? windowWidth * (28 / 800) : windowHeight * (28 / 360), aspectRatio: 28 / 28, position: 'absolute', alignSelf: 'center', right: -2, bottom: -3}}/>
            </View>      
        )
    }

    const StarStats = () => {
        return (
            <Animated.View onLayout={(event) => handleLayout(event)} style={[animatedStyle, {position: 'absolute', right: 30, top: 30, backgroundColor: 'white', width: windowWidth * (75 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), borderRadius: 100, flexDirection: 'row', justifyContent: 'space-evenly'}]}>
                <Image source={statStar} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24, alignSelf: 'center'}}/>
                <Text style={{fontWeight: '600', fontSize: windowWidth * (20 / 800), color: 'black', textAlign: 'center', alignSelf: 'center'}}>{stars}</Text>
            </Animated.View>
        )
    }

    // console.log(tasks)

    return (
        <View style={{flex: 1}}>
            <ImageBackground source={bg} style={{flex: 1, alignItems: 'center', padding: 30, paddingVertical: Platform.isPad? windowWidth * (40 / 800) : Platform.OS === 'ios'? 25 : 25, width: windowWidth, height: windowHeight, justifyContent: 'space-between'}}>
            {
                tasks && tasks[level] && tasks[level].type ? (
                    tasks[level].type === 'voice_input' ?  
                    <RenderVoiceGame /> :
                    tasks[level].type === 'single_choice' && tasks[level].content.sub_type === 'with_image'?
                    <RenderWithImageGame /> :
                    tasks[level].type === 'single_choice' && tasks[level].content.sub_type === 'simple'?
                    <RenderSimpleGame /> :
                    tasks[level].type === 'single_choice' && tasks[level].content.sub_type === 'with_audio'?
                    <RenderWithAudio /> :
                    tasks[level].type === 'single_choice' && tasks[level].content.sub_type === 'with_title'?
                    <RenderWithTitleGame /> :
                    tasks[level].type === 'handwritten' && tasks[level].content.sub_type === 'simple'?
                    <RenderHandWrittenSimpleGame /> :
                    tasks[level].type === 'handwritten' && tasks[level].content.sub_type === 'repeat'?
                    <RenderHandWrittenRepeatGame /> :
                    tasks[level].type === 'handwritten' && tasks[level].content.sub_type === 'counting'?
                    <RenderHandWrittenCountingGame /> :
                    tasks[level].type === 'handwritten' && tasks[level].content.sub_type === 'word'?
                    <RenderHandWrittenWordGame /> :
                    tasks[level].type === 'puzzle'?
                    <RenderPuzzleGame /> :
                    tasks[level].type === 'text_single_choice' && tasks[level].content.options[0].audio === null && tasks[level].content.options[0].text != ""?
                    <RenderTextSingleChoiceSimpleGame /> : 
                    tasks[level].type === 'text_single_choice' && tasks[level].content.options[0].audio != null || tasks[level].content.options[0].text.includes(" ")?
                    <RenderTextSingleChoiceWithAudioGame /> : <CongratulationsScreen />
                ) : <CongratulationsScreen />
            }
                <BackButton />
                {tasks && tasks[level] && tasks[level].type && <ProgressAnimation />}
            </ImageBackground>
        </View>
    )
}

export default GameScreen;