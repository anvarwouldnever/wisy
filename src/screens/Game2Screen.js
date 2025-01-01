import React, { useState, } from "react";
import { View, StyleSheet, useWindowDimensions, Image, Platform } from "react-native"
import Game2Animals1Animation from "../animations/Game2/Game2Animals1Animation";
import wisy from '../images/pandaHead.png'
import Game2Text1Animation from "../animations/Game2/Game2Text1Animation";
import api from '../api/api'
import { playSound } from "../hooks/usePlayBase64Audio";
import store from "../store/store";

const Game2Screen = ({ data, setLevel, setStars }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState(data.content.wisy_question)
    const [attempt, setAttempt] = useState('1')
    const [thinking, setThinking] = useState(false); 

    const answer = async({ answer }) => {
        try {
            setThinking(true)
            const response = await api.answerTaskSC({task_id: data.id, attempt: attempt, child_id: store.playingChildId.id, answer: answer})
            console.log(response)
            if (response && response.stars) {
                console.log(response.stars)
                setText(response?.hint)
                playSound(response?.sound)
                setTimeout(() => {
                    setStars(response.stars)
                    setLevel(prev => prev + 1);
                }, 1500);
                return
            }
            else if (response && !response.success && !response.to_next) {
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
                setText(response.hint)
                playSound(response.sound)
                setTimeout(() => {
                    setLevel(prev => prev + 1);
                    setAttempt('1');
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setThinking(false)
        }
    }

    return (
        <View style={{position: 'absolute', top: 24, width: windowWidth - 60, height: windowHeight - 60, justifyContent: 'center'}}>
            {data && <Game2Animals1Animation text={text} answer={answer} images={data.content.images} animal={data.content.title}/>}
            <View style={{width: windowWidth * (255 / 800), height: Platform.isPad? windowHeight * (60 / 360) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', position: 'absolute', bottom: 0, left: 0, flexDirection: 'row'}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <Game2Text1Animation text={text} thinking={thinking}/> 
            </View>
        </View>
    )
}

export default Game2Screen; 