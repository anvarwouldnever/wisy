import { View, Image, Platform, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import wisy from '../images/pandaHead.png'
import Game4TextAnimation from '../animations/Game4/Game4TextAnimation'
import Game5AnimalsAnimation from '../animations/Game5/Game5AnimalsAnimation'
import store from '../store/store'
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio'
import Game2Text1Animation from '../animations/Game2/Game2Text1Animation'

const Game5Screen = ({ data, setLevel, setStars }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState(data.content.wisy_question)
    const [attempt, setAttempt] = useState('1')
    const [thinking, setThinking] = useState(false);

    // useEffect(() => {
    //     const getData = () => {
    //         const singleChoiceItems = games.filter(item => 
    //             item.type === 'single_choice' &&
    //             item.content?.sub_type === 'with_image'
    //         );

    //         if (singleChoiceItems) {
    //             setData(singleChoiceItems)
    //             setText(singleChoiceItems[0].content.wisy_question)
    //         } else {
    //             console.log("No item with type 'single_choice' found");
    //         }
    //     }

    //     getData()
    // }, [])

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
        <View style={{position: 'absolute', top: 24, width: windowWidth - 60, height: windowHeight - 60, justifyContent: 'center'}}>
            {data && <Game5AnimalsAnimation answer={answer} animal={data.content.question_image} images={data.content.images}/>}
            <View style={{width: 'auto', height: Platform.isPad? windowWidth * (150 / 800) : 'auto', alignSelf: 'center', alignItems: 'flex-end', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0,}}>
                <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                <View style={{marginBottom: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (70 / 800)}}>
                    <Game2Text1Animation text={text} thinking={thinking}/>
                </View>
            </View>
        </View>
    )
}

export default Game5Screen;

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