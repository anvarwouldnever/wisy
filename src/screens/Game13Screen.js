import { View, Text, Image, useWindowDimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { ZoomInEasyDown } from 'react-native-reanimated'
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation'
import wisy from '../images/pandaHead.png'
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio'
import store from '../store/store'

const Game13Screen = ({ data, setLevel }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState('');
    const [attempt, setAttempt] = useState('1');
    const [thinking, setThinking] = useState(false);

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

    const RenderGame13Component = () => {

        const options = [{num: '1'}, {num: '2'}, {num: '3'}]

        return (
            <View style={{width: windowWidth * (592 / 800), height: windowHeight * (160 / 360), flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: '100%', height: windowHeight * (40 / 360), justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#222222', fontWeight: '600', fontSize: windowWidth * (24 / 800)}}>{data.content.question}</Text>
                </View>
                <View style={{width: 'auto', gap: 16, height: windowHeight * (80 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    {data && data.content.options && data.content.options.map((option, index) => {
                        return (
                            <TouchableOpacity onPress={() => answer({ answer: option.id })} key={index} style={{width: windowWidth * (80 / 800), height: windowHeight * (80 / 360), backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                                <Text style={{fontWeight: '600', fontSize: windowWidth * (24 / 800), color: '#D4D1D1'}}>{option.text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <Animated.View entering={ZoomInEasyDown} style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center'}}>
            <RenderGame13Component />
            <View style={{width: windowWidth * (255 / 800), position: 'absolute', left: 0, bottom: 0, height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <Game3TextAnimation text={text} thinking={thinking}/>
            </View>
        </Animated.View>
    )
}

export default Game13Screen;