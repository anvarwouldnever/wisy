import { View, useWindowDimensions, FlatList, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import dog from '../../images/dogGame1.png'
import cow from '../../images/cow.png'
import petux from '../../images/petux.png'
import cat from '../../images/catGame4.png'
import ship from '../../images/ship.png'
import passedimg from '../../images/gamepassed.png';
import speaker from '../../images/speaker2.png'
import * as Speech from 'expo-speech'
import store from '../../store/store'
import Animated, { ZoomInEasyDown } from 'react-native-reanimated'

const Game4Animals2Animation = ({ setText, setLevel }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [correct, setCorrect] = useState(false)
    const [incorrectAnimal, setIncorrectAnimal] = useState('')

    const voice = async() => {
        try {
            await store.setPlayingMusic(false)
            setText(null)
            Speech.speak('chicken', {
                language: 'en-US',  
                pitch: 1,         
                rate: 1,
            })

            const interval = setInterval(async () => {
                const isSpeaking = await Speech.isSpeakingAsync();
                if (!isSpeaking) {
                    clearInterval(interval);
                    // Возобновляем музыку после озвучивания
                    await store.setPlayingMusic(true);
                }
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const answer = (name) => {
        if (name === 'petux') {
            setIncorrectAnimal('')
            setCorrect(true)
            setText('That’s correct!')
            setTimeout(() => {
                setText('Tap on the speaker to play the sound..')
                setLevel(2)
            }, 2000);
        } else {
            setIncorrectAnimal(name)
            setText('Incorrect. Try again!')
            setTimeout(() => {
                setText(null)
            }, 2000);
        }
    }

    const data = [
        {image: cow, name: 'cow'},
        {image: cat, name: 'cat'},
        {image: petux, name: 'petux'},
        {image: ship, name: 'ship'},
        {image: dog, name: 'dog'},
    ]

    const renderItem = ({ item }) => {

        return  <TouchableOpacity onPress={() => answer(item.name)} style={{borderRadius: 10, backgroundColor: incorrectAnimal === item.name? 'pink' : item.name === 'petux' && correct? '#ADD64D4D' : 'white', width: windowWidth * (120 / 800), height: Platform.isPad? windowWidth * (120 / 800) : windowHeight * (120 / 360), justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: incorrectAnimal === item.name? 'red' : item.name === 'petux' && correct? '#ADD64D' : 'white'}}>
                    <Image source={item.image} style={{width: windowWidth * (108 / 800), height: Platform.isPad? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 / 1}}/>
                    {item.name === 'petux' && correct && <Image source={passedimg} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4}}/>}
                </TouchableOpacity>
    }
    
    return (
        <Animated.View entering={ZoomInEasyDown} style={{width: windowWidth * (664 / 800), height: windowHeight * (232 / 360), position: 'absolute', alignSelf: 'center', top: '20%', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => voice()} style={{width: windowWidth * (80 / 800), borderWidth: 1, height: windowHeight * (80 / 360), borderRadius: 100, backgroundColor: '#B3ABDB', borderColor: '#DFD0EE', borderWidth: 4, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={speaker} style={{width: windowWidth * (40 / 800), height: windowHeight * (40 / 360)}}/>
            </TouchableOpacity>
            <View style={{height: Platform.isPad? windowWidth * (120 / 800) : windowHeight * (120 / 360), alignItems: 'center'}}>
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={{width: '100%', justifyContent: 'space-between'}}
                />
            </View>
        </Animated.View>
    )
}

export default Game4Animals2Animation;