import { useWindowDimensions, FlatList, TouchableOpacity, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import lion from '../../images/lionGame2.png'
import giraffe from '../../images/giraffe.png'
import Animated, { ZoomInEasyDown } from 'react-native-reanimated'
import passedimg from '../../images/gamepassed.png';

const Game3Animals2Animation = ({ setText, setLevel }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [correct, setCorrect] = useState(false)
    const [incorrectAnimal, setIncorrectAnimal] = useState('')

    const answer = (name) => {
        if (name === 'lion') {
            setIncorrectAnimal('')
            setText('Good job!')
            setCorrect(true)
            setTimeout(() => {
                setLevel(2)
                setText('Let’s try other animals..')
            }, 2000);
        } else {
            setIncorrectAnimal(name)
            setText('All animals in the row are giraffes except one..')
        }
    }

    const renderItem = ({ item }) => {

        return <TouchableOpacity onPress={() => answer(item.name)} style={{borderRadius: 10, backgroundColor: incorrectAnimal === item.name? 'pink' : item.name === 'lion' && correct? '#ADD64D4D' : 'white', width: windowWidth * (120 / 800), height: Platform.isPad? windowWidth * (120 / 800) : windowHeight * (120 / 360), justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: incorrectAnimal === item.name? 'red' : item.name === 'lion' && correct? '#ADD64D' : 'white'}}>
                    <Image source={item.image} style={{width: windowWidth * (108 / 800), height: Platform.isPad? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 / 1}}/>
                    {item.name === 'lion' && correct && <Image source={passedimg} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4}}/>}
                </TouchableOpacity>
    }

    const data = [
        {image: giraffe, name: 'giraffe1'},
        {image: giraffe, name: 'giraffe2'},
        {image: giraffe, name: 'giraffe3'},
        {image: giraffe, name: 'giraffe4'},
        {image: lion, name: 'lion'},
    ]

    return (
        <Animated.View entering={ZoomInEasyDown} style={{width: windowWidth * (664 / 800), height: windowHeight * (120 / 360), justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <FlatList 
                data={data}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                contentContainerStyle={{width: '100%', justifyContent: 'space-between'}}
            />
        </Animated.View>
    )
}

export default Game3Animals2Animation;