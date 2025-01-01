import { View, Image, Platform, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import wisy from '../images/pandaHead.png'
import Game4TextAnimation from '../animations/Game4/Game4TextAnimation'
import Game4AnimalsAnimation from '../animations/Game4/Game4AnimalsAnimation'
import store from '../store/store'
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio'
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation'

const Game4Screen = ({ data, setLevel, setStars }) => {

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
        <View style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, justifyContent: 'center'}}>
            {data && <Game4AnimalsAnimation answer={answer} audio={data.content.question_audio} images={data.content.images}/>}
            <View style={{width: windowWidth * (200 / 800), height: Platform.isPad? windowHeight * (60 / 360) : windowHeight * (80 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', left: 0, bottom: 0}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <Game3TextAnimation text={text} thinking={thinking}/>
            </View>
        </View>
    )
}

export default Game4Screen;

// useEffect(() => {
    //     const getData = () => {
    //         const singleChoiceItems = games.filter(item => 
    //             item.type === 'single_choice' &&
    //             item.content?.sub_type === 'with_audio'
    //         );
        
    //         if (singleChoiceItems) {
    //             setData(singleChoiceItems)
    //             setText(singleChoiceItems[level].content.wisy_question)
    //         } else {
    //             console.log("No item with type 'single_choice' found");
    //         }
    //     }

    //     getData()
    // }, [])

    // setLevel(prev => {
    //     const nextLevel = prev + 1;
    //     if (nextLevel < data.length) {
    //         // Увеличиваем уровень, если он меньше длины данных
    //         setText(data[nextLevel].content.wisy_question); // Здесь используем следующий уровень
    //         return nextLevel;
    //     } else {
    //         return prev; // Достигнут последний уровень
    //     }
    // });