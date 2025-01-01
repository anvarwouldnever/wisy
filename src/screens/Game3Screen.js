import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { ZoomInEasyDown, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import wisy from '../images/pandaHead.png'
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation'
import Game3AnimalsAnimation from '../animations/Game3/Game3AnimalsAnimation'
import store from '../store/store'
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio'

const Game3Screen = ({ data, setLevel, setStars }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState(data.content.wisy_question);
    const [attempt, setAttempt] = useState('1');
    const [thinking, setThinking] = useState(false);

    const answer = async({ answer }) => {
        try {
            setThinking(true)
            const response = await api.answerTaskSC({task_id: data.id, attempt: attempt, child_id: store.playingChildId.id, answer: answer})
            if (response && response.stars) {
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

    return (
        <Animated.View entering={ZoomInEasyDown} style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center'}}>
            {data && data && <Game3AnimalsAnimation answer={answer} images={data.content.images}/>}
            <View style={{width: windowWidth * (255 / 800), position: 'absolute', left: 0, bottom: 0, height: Platform.isPad? windowWidth * (80 / 800) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <Game3TextAnimation text={text} thinking={thinking}/>
            </View>
        </Animated.View>
    )
}

export default Game3Screen;

// setLevel(prev => {
//     const nextLevel = prev + 1;
//     if (nextLevel < data.length) {
//         // Увеличиваем уровень, если он меньше длины данных
//         setText(data.content.wisy_question); // Здесь используем следующий уровень
//         return nextLevel;
//     } else {
//         return prev; // Достигнут последний уровень
//     }
// });

 // useEffect(() => {
    //     const getData = () => {
    //         const singleChoiceItems = games.filter(item => 
    //             item.type === 'single_choice' &&
    //             item.content?.sub_type === 'simple'
    //         );
    
    //         if (singleChoiceItems.length > 0) {
    //             setData(singleChoiceItems);
    //             setText(singleChoiceItems[0].content.wisy_question);
    //         } else {
    //             console.log("Элементы с type 'single_choice' не найдены");
    //         }
    //     };
    
    //     getData();
    // }, []);