import React, { useState } from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { TouchableOpacity, Image, View, useWindowDimensions, Platform } from "react-native";
import micro from '../images/tabler_microphone.png'
import microwhite from '../images/tabler_microphone-white.png'
import { observer } from "mobx-react-lite";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { playSound } from "../hooks/usePlayBase64Audio";
import store from "../store/store";

const MicroAnimation = ({ sendAnswer, correctAnswer, incorrectAnswerToNext, incorrectAnswer, setText }) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [microOn, setMicroOn] = useState(false)
    const { startRecording, stopRecording } = useAudioRecorder()

    const handlePressIn = async() => {
        setMicroOn(true)
        setTimeout(() => {
            store.setPlayingMusic(false)
            startRecording()
        }, 100);
    }

    const handlePressOut = async() => {
        await store.setPlayingMusic(true)
        setMicroOn(false)
        const uri = await stopRecording()
        const requestStatus = await sendAnswer(uri)
        playSound(requestStatus?.sound)
        if (requestStatus?.to_next && requestStatus?.success) {
            correctAnswer(requestStatus.hint)
        } 
        else if (requestStatus.to_next && !requestStatus.success) {
            incorrectAnswerToNext(requestStatus?.hint)
        } 
        else if (!requestStatus.to_next && !requestStatus.success && requestStatus?.next_attempt) {
            incorrectAnswer(requestStatus?.hint, requestStatus?.next_attempt)
        } else {
            setText(requestStatus?.hint)
        }
    }

    const animatedMicro = useAnimatedStyle(() => {
        
        const scaleX = withTiming(microOn ? 1.2 : 1, {duration: 100})
        const scaleY = withTiming(microOn ? 1.2 : 1, {duration: 100})
        const backgroundColor = withTiming(microOn? "#504297" : "#B3ABDB", { duration: 100 })
        const borderWidth = withTiming(microOn? 4 : 1, {duration: 100})
    
        return {
            transform: [
                { scaleX },
                { scaleY },
            ],
            backgroundColor,
            borderWidth
        };
    });

    return (
        <Animated.View style={[animatedMicro, { borderStyle: 'solid', borderColor: '#B3ABDB80', borderRadius: 100, backgroundColor: '#B3ABDB', justifyContent: 'center', alignItems: 'center', width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowWidth * (64 / 800)}]}>
            <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', borderRadius: 100 }}>
                <Image source={microOn? microwhite : micro} style={{ width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24 }}/>
            </TouchableOpacity>
        </Animated.View>
    )
}


export default observer(MicroAnimation);