import { View, Text, FlatList, Image, useWindowDimensions, Button, TouchableOpacity, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import image1 from '../images/game8tutorial1.png'
import image2 from '../images/game8tutorial2.png'
import image3 from '../images/game8tutorial3.png'
import image4 from '../images/game8tutorial4.png'
import image5 from '../images/game8tutorial5.png'
import arrow from '../images/arrow-right.png'
import arrow1 from '../images/arrow-left.png'

const Game8Tutorial = () => {

    const { width, height } = useWindowDimensions();
    const data = [image1, image2, image3, image4, image5]
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const renderItem = ({ item }) => {
        return (
            <Image source={item} style={{width: width * (430 / 800), height: height * (272 / 360), resizeMode: 'contain'}}/>
        )
    }

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    }

    return (
        <View style={{height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity activeOpacity={currentIndex === 0? 0 : 1} style={{width: width * (40 / 800), height: Platform.isPad? width * (40 / 800) : height * (40 / 360), borderRadius: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', opacity: currentIndex === 0? 0 : 1}} onPress={handlePrevious}>
                <Image source={arrow1} style={{width: width * (24 / 800), height: Platform.isPad? width * (24 / 800) : height * (24 / 360)}}/>
            </TouchableOpacity>
            <View style={{width: width * (464 / 800), height: Platform.isPad? width * (272 / 800) : height * (272 / 360), backgroundColor: 'white', alignItems: 'center', padding: 20, borderRadius: 16}}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    horizontal
                    contentContainerStyle={{alignItems: 'center'}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    pagingEnabled
                    snapToAlignment='center'
                    decelerationRate="fast"
                    snapToInterval={width * (464 / 800)}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
            <TouchableOpacity activeOpacity={currentIndex === 4? 0 : 1} style={{width: width * (40 / 800), height: Platform.isPad? width * (40 / 800) : height * (40 / 360), borderRadius: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', opacity: currentIndex === 4? 0 : 1}} onPress={handleNext}>
                <Image source={arrow} style={{width: width * (24 / 800), height: Platform.isPad? width * (24 / 800) : height * (24 / 360)}}/>
            </TouchableOpacity>
        </View>
    )
}

export default Game8Tutorial;