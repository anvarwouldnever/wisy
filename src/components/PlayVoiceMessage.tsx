import React, { useState, useEffect } from "react";
import { Text, View, useWindowDimensions, Image } from "react-native";
import { AVPlaybackStatus, Audio } from "expo-av";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Sound } from "expo-av/build/Audio";
import Animated, { useAnimatedStyle, withTiming, SlideInRight, SlideInLeft } from "react-native-reanimated";
import store from "../store/store";

const PlayVoiceMessage = ({uri, animated}) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [sound, setSound] = useState<Sound>();
    const [status, setStatus] = useState<AVPlaybackStatus>();

    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
    }, [sound]);

    async function playSound(uri: any) {

        await store.setPlayingMusic(false)
        const { sound } = await Audio.Sound.createAsync({uri: uri}, { progressUpdateIntervalMillis: 1000 / 60 }, onPlaybackStatusUpdate)
        setSound(sound);
    
        await sound.playAsync();
    }

    async function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        setStatus(status)
        if (status.isLoaded && status.didJustFinish && !status.isLooping) {
            store.setPlayingMusic(true);
        }
    }

    const formatMillis = (millis: number) => {
        const minutes = Math.floor(millis / (1000 * 60));
        const seconds = Math.floor((millis % (1000 * 60)) / 1000)

        return `${minutes}:${seconds < 10? '0' : ''}${seconds}`
    }

    const isPlaying = status?.isLoaded ? status.isPlaying : false
    const position = status?.isLoaded ? status.positionMillis : 0
    const duration = status?.isLoaded ? status.durationMillis : 1;

    const progress = position / duration;

    const animatedProgress = useAnimatedStyle(() => ({
        
        left: withTiming(`${progress * 100}%`, {duration: 1000 / 60})
    }))

    return (
        <Animated.View entering={animated? SlideInRight : undefined} style={{flexDirection: 'column', gap: windowWidth * (8 / 360), alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row-reverse', alignItems: 'center', gap: windowWidth * (8 / 360),}}>
                <Image source={require('../images/Dog.png')} style={{ width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24 }} />
                <Text style={{color: '#555555', fontWeight: '600', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (24 / 800),}}>You</Text>
            </View>
            <View style={{width: windowWidth * (250 / 360), height: 70, shadowColor: "#000000", shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.2, shadowRadius: 7, backgroundColor: 'white', borderRadius: 10, alignSelf: 'flex-end', marginRight: 5, flexDirection: 'row', alignItems: 'center', padding: 20, gap: 10, justifyContent: 'center'}}>
                <Ionicons name={isPlaying? 'pause-outline' : 'play'} size={25} onPress={() => playSound(uri)}/>
                <View style={{height: 2, width: windowWidth * (180 / 360), backgroundColor: 'grey', flexDirection: 'row', alignItems: 'center'}}>
                    <Animated.View style={[animatedProgress, {position: 'absolute', width: 10, height: 10, backgroundColor: 'royalblue', borderRadius: 100}]}/>
                </View>
                {/* <Text style={{position: 'absolute', alignSelf: 'flex-start', right: 20, bottom: 5, fontSize: 10}}>{formatMillis(position || 0)} / {formatMillis(duration || 0)}</Text> */}
            </View>
        </Animated.View>
    )
}

export default PlayVoiceMessage;