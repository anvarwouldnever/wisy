import { View, Text, useWindowDimensions, Image, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Animated, {ZoomInEasyDown} from 'react-native-reanimated';
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation';
import wisy from '../images/pandaHead.png'
import speaker from '../images/tabler_speakerphone.png'
import store from '../store/store';
import { Audio } from 'expo-av';
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio';

const Game12Screen = ({ data, setLevel }) => {

    console.log(data)
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState('');
    const [attempt, setAttempt] = useState('1');
    const [thinking, setThinking] = useState(false);
    const sound = useRef(new Audio.Sound());

    useEffect(() => {
        return () => {
            sound.current.unloadAsync();
        };
    }, [])

    const voice = async (audio) => {
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

    const answer = async({ answer }) => {
        try {
            setThinking(true)
            const response = await api.answerTaskSC({task_id: data.id, attempt: attempt, child_id: store.playingChildId.id, answer: answer})
            if (response && !response.success && !response.to_next) {
                setText(response.hint)
                playSound(response.sound)
                setAttempt('2')
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
    }

    const RenderGame12Component = () => {

        const options = [{text: 'It helps to fly'}, {text: 'It is necessary for eating'}, {text: 'It encourages thinking'}]

        return (
            <View style={{width: windowWidth * (440 / 800), height: windowHeight * (208 / 360), flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: '100%', height: windowHeight * (40 / 360), justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#222222', fontWeight: '600', fontSize: windowWidth * (24 / 800)}}>{data.content.question}</Text>
                </View>
                <View style={{width: windowWidth * (440 / 800), height: windowHeight * (144 / 360), justifyContent: 'space-between', alignItems: 'center'}}>
                    {data && data.content.options && data.content.options.map((option, index) => {

                        console.log(option)

                        return (
                            <View key={index} style={{width: windowWidth * (440 / 800), height: windowHeight * (40 / 360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => answer({ answer: option.id })} style={{width: option.audio != null ? windowWidth * (390 / 800) : windowWidth * (440 / 800), height: windowHeight * (40 / 360), backgroundColor: 'white', borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: option.audio === null? 100 : 0, borderBottomRightRadius: option.audio === null? 100 : 0, justifyContent: 'center', paddingLeft: 16}}>
                                    <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: '#222222', textAlign: option.audio === null? 'center' : 'left'}}>{option.text}</Text>
                                </TouchableOpacity>
                                {option.audio != null && <TouchableOpacity onPress={() => voice(option.audio)} style={{width: windowWidth * (46 / 800), height: windowHeight * (40 / 360), backgroundColor: '#B3ABDB', borderTopRightRadius: 100, borderBottomRightRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={speaker} style={{width: windowWidth * (24 / 800), height: windowHeight * (24 / 360)}}/>
                                </TouchableOpacity>}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <Animated.View entering={ZoomInEasyDown} style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center'}}>
            <RenderGame12Component />
            <View style={{width: windowWidth * (255 / 800), position: 'absolute', left: 0, bottom: 0, height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <Game3TextAnimation text={text} thinking={thinking}/>
            </View>
        </Animated.View>
    )
}

export default Game12Screen;