import React, { useState } from "react";
import { Image, Dimensions, View, Text, Platform } from "react-native";
import dog from '../images/Dog.png'
import lion from '../images/Lion.png'
import cat from '../images/Cat.png'
import girafe from '../images/Girafe.png'
import monkey from '../images/Monkey.png'
import koala from '../images/Koala.png'
import owl from '../images/Owl.png'
import rabbit from '../images/Rabbit.png'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, SlideInRight, Extrapolation } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');
const AvatarWidth = width * (180 / 360)
const AvatarHeight = height * (180 / 800)
const Spacing = width * (10 / 360);

const RenderItem = ({ item, index, scrollX }) => {
    
    const size = useSharedValue(0.8);
    const opacity = useSharedValue(0.5);

    const inputRange = [
        (index - 1) * (AvatarWidth + Spacing),
        index * (AvatarWidth + Spacing),
        (index + 1) * (AvatarWidth + Spacing)
    ]

    size.value = interpolate (
        scrollX,
        inputRange,
        [Platform.OS === 'ios'? 0.9 : 1, 1, Platform.OS === 'ios'? 0.9 : 1],
        Extrapolation.CLAMP
    )

    opacity.value = interpolate(
        scrollX,
        inputRange,
        [Platform.OS === 'ios'? 0.5 : 1, 1, Platform.OS === 'ios'? 0.5 : 1],
        Extrapolation.CLAMP
    );

    const animatedImage = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: size.value }],
            opacity: opacity.value
        }
    })

    return (
        <Animated.View style={[animatedImage, {alignItems: 'center', marginLeft: index === 0? width * (110 / 430) : Spacing, marginRight: index === 7? width * (110 / 430) : Spacing, width: AvatarWidth - Spacing, height: AvatarHeight}]}>
            <Image style={{borderRadius: 1000, borderColor: '#504297', borderWidth: 3, width: '100%', height: '100%', aspectRatio: 1 / 1}} source={item.image}/>
        </Animated.View>
    )
}

const ChildAvatar = () => {
 
    const [scrollX, setScrollX] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleScroll = (event) => {
        const newScrollX = event.nativeEvent.contentOffset.x;
        setScrollX(newScrollX);
        setCurrentIndex(Math.floor(newScrollX / (AvatarWidth - Spacing)));
    };

    const avatars = [
        {key: '1', image: dog},
        {key: '2', image: rabbit},
        {key: '3', image: cat},
        {key: '4', image: girafe},
        {key: '5', image: monkey},
        {key: '6', image: koala},
        {key: '7', image: owl},
        {key: '8', image: lion}
    ]

    return (
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
            <Text style={{width: width * (314 / 360), height: 'auto', color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800), textAlign: 'center'}}>
                Choose an avatar for your child
            </Text>
            <Animated.FlatList
                entering={SlideInRight}
                data={avatars}
                keyExtractor={item => item.key}
                renderItem={({item, index}) => {
                    return (
                        <RenderItem item={item} index={index} scrollX={scrollX}/>
                    )}
                }    
                horizontal={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                snapToInterval={AvatarWidth + Spacing}
                pagingEnabled={true}
                decelerationRate="fast"
                style={{marginTop: height * (40 / 932)}}
            />  
            <View style={{width: width * (156 / 360), height: height * (100 / 932), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                    return (
                        <View key={index} style={{width: 12, height: 12, borderRadius: 100, opacity: 0.9, backgroundColor: currentIndex === index ? '#504297' : '#E5E5E5'}}/>
                    )
                })}
            </View> 
        </View>
    )
}

export default ChildAvatar