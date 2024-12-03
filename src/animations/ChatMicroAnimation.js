import { View, Text, TouchableOpacity, Image, useWindowDimensions, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Audio } from "expo-av";
import store from '../store/store';
import microimg from '../images/micro.png'
import * as FileSystem from 'expo-file-system';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import api from '../api/api'

const ChatMicroAnimation = ({text}) => {

    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [microOn, setMicroOn] = useState(false)
    const { startRecording, stopRecording } = useAudioRecorder()

    const animatedMicro = useAnimatedStyle(() => {
        
        const scaleX = withTiming(microOn ? 1.5 : 1, {duration: 100})
        const scaleY = withTiming(microOn ? 1.5 : 1, {duration: 100})
        // const backgroundColor = withTiming(microOn? "grey" : "white", { duration: 100 })
    
        return {
            transform: [
                { scaleX },
                { scaleY },
            ],
        };
    });

    async function PressOut() {
        setMicroOn(false)
        store.setPlayingMusic(true)

        try {
            const uri = await stopRecording()
            if (uri) {
                console.log(uri);
                store.setMessages({ type: 'voice', text: uri, author: 'You' });
                const base64Audio = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                Keyboard.dismiss();
                setTimeout(async() => {
                    await store.setMessages({type: 'thinking', text: 'Thinking', author: 'MyWisy'})
                }, 500);
                try {
                    const response = await api.sendMessage({ message: base64Audio });
                    await store.setMessages({type: 'text', text: response.response, author: 'MyWisy'});
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    }


    async function PressIn() {
        try {
            setMicroOn(true)
            setTimeout(() => {
                store.setPlayingMusic(false)
                startRecording()
            }, 100);

        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    return (
        <Animated.View style={[animatedMicro]}>
            <TouchableOpacity onPressIn={PressIn} onPressOut={PressOut} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: text === ''? '#E5E5E5' : '#C4DF84'}}>
                <Image source={microimg} style={{width: windowWidth * (13 / 360), height: windowHeight * (22 / 800)}}/>
            </TouchableOpacity> 
        </Animated.View>
    )
}

export default ChatMicroAnimation;

// const base64Audio = await FileSystem.readAsStringAsync(uri, {
                //     encoding: FileSystem.EncodingType.Base64,
                // });
                // Keyboard.dismiss();
                // setTimeout(async() => {
                //     await store.setMessages({type: 'thinking', text: 'Thinking', author: 'MyWisy'})
                // }, 500);
                // try {
                //     const response = await api.sendMessage({ message: base64Audio });
                //     await store.setMessages({type: 'text', text: response.response, author: 'MyWisy'});
                // } catch (error) {
                //     console.log(error)
                // }