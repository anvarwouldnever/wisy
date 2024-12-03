import React, { useState } from "react";
import { View, useWindowDimensions, FlatList, Text, Image, TouchableOpacity, Platform } from "react-native";
import lion from '../../images/lionGame2.png'
import monkey from '../../images/monkeyGame2.png'
import pig from '../../images/pig.png'
import rabbit from '../../images/rabbitGame2.png'
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import passedimg from '../../images/gamepassed.png';

const Game2Animals2Animation = ({ text, setText, setIncorrectText }) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [incorrectAnimal, setIncorrectAnimal] = useState('')

    const data = [
        {image: lion, name: 'Lion'},
        {image: monkey, name: 'Monkey'},
        {image: pig, name: 'Pig'},
        {image: rabbit, name: 'Rabbit'}
    ]

    const animal = 'Pig'
    const [attempts, setAttempts] = useState(1)

    const attemptCount = () => {
        setAttempts(attempts + 1)
    }

    const result = (chosenAnimal) => {
        if(animal === chosenAnimal) {
            setIncorrectAnimal('')
            return setText('correct')
        } else {
                if (attempts === 1) {
                    attemptCount()
                    setIncorrectText(animal)
                    setIncorrectAnimal(chosenAnimal)
                } else if (attempts === 2) {
                    attemptCount()
                    setText('incorrectPig1')
                    setIncorrectAnimal(chosenAnimal)
                } else if (attempts === 3) {
                    attemptCount()
                    setText('incorrectPig2')
                    setIncorrectAnimal(chosenAnimal)
                } else if (attempts === 4) {
                    attemptCount()
                    setText('incorrectPig3')
                    setIncorrectAnimal(chosenAnimal)
                }
            } 
        }
    
    const renderItem = ({ item }) => {

        const isCorrect = text === 'correct' && item.name === animal;

        return  <TouchableOpacity onPress={() => result(item.name)} activeOpacity={0.7} style={{borderRadius: 10, backgroundColor: incorrectAnimal === item.name? 'pink' : isCorrect? '#ADD64D4D' : 'white', width: windowWidth * (136 / 800), height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360), justifyContent: 'center', alignItems: 'center', borderColor: incorrectAnimal === item.name? 'red' : isCorrect? '#ADD64D4D' : 'white', borderWidth: 2}}>
                    <Image source={item.image} style={{width: windowWidth * (120 / 800), height: Platform.isPad? windowWidth * (120 / 800) : windowHeight * (120 / 360), aspectRatio: 1 / 1}}/>
                    {isCorrect && <Image source={passedimg} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4}}/>}
                </TouchableOpacity>
    }

    return (
            <Animated.View entering={ZoomInEasyDown.duration(500)} style={{width: windowWidth * (592 / 800), height: Platform.isPad? windowWidth * (228 / 800) : windowHeight * (228 / 360), position: 'absolute', top: windowHeight * (66 / 360), left: windowWidth * (114 / 800), alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (192 / 800), height: Platform.isPad? windowWidth * (52 / 800) : windowHeight * (52 / 360), borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#222222', fontSize: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (20 / 360), fontWeight: '500', textAlign: 'center'}}>{animal}</Text>
                </View>
                <View style={{width: windowWidth * (592 / 800), height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360)}}>
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

export default Game2Animals2Animation;