import { useWindowDimensions, FlatList, TouchableOpacity, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { ZoomInEasyDown } from 'react-native-reanimated'
import passedimg from '../../images/gamepassed.png';
import { SvgUri } from 'react-native-svg';

const Game3AnimalsAnimation = ({ answer, images }) => {

    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Change key on animal or images update
    }, [images]);

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const renderItem = ({ item }) => {
        const isSvg = item.url.endsWith('.svg');
    
        return (
            <TouchableOpacity onPress={() => answer({ answer: item.id })} style={{
                borderRadius: 10, backgroundColor: 'white', 
                width: windowWidth * (120 / 800), height: Platform.isPad ? windowWidth * (120 / 800) : windowHeight * (120 / 360), 
                justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white'
            }}>
                {isSvg ? (
                    <SvgUri uri={item.url} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 }} />
                ) : (
                    <Image source={{ uri: item.url }} style={{ width: windowWidth * (108 / 800), height: Platform.isPad ? windowWidth * (108 / 800) : windowHeight * (108 / 360), aspectRatio: 1 }} />
                )}
                {item.name === 'monkey' && <Image source={passedimg} style={{ width: windowWidth * (24 / 800), height: Platform.isPad ? windowWidth * (24 / 800) : windowHeight * (24 / 360), position: 'absolute', right: 4, top: 4 }} />}
            </TouchableOpacity>
        );
    };

    return (
        <Animated.View key={key} entering={ZoomInEasyDown} style={{width: windowWidth * (664 / 800), height: windowHeight * (120 / 360), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', position: 'absolute'}}>
            <FlatList 
                data={images}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                contentContainerStyle={{width: '100%', justifyContent: 'space-evenly'}}
            />
        </Animated.View>
    )
}

export default Game3AnimalsAnimation;

// const answer = (name) => {
//     if (name === 'monkey') {
//         setIncorrectAnimal('')
//         setText('Good job!')
//         setCorrect(true)
//         setTimeout(() => {
//             setLevel(2)
//             setText('Let’s try other animals..')
//         }, 2000);
//     } else {
//         setIncorrectAnimal(name)
//         setText('All animals in the row are lions except one..')
//     }
// }