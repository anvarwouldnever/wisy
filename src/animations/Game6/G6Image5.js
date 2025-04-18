import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated'
import leftwing from '../../images/leftwing.png'

const G6Image5 = () => {

    const [dropped, setDropped] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: '-70.29deg' }, // Поворот на -7.5 градусов
                { scale: withTiming(2.3, { 
                    duration: 1000, 
                    easing: Easing.out(Easing.exp) // Используем плавный easing
                })} 
            ],
            top: withTiming(windowHeight * (195 / 430), {
                duration: 1000, 
                easing: Easing.out(Easing.exp) // Плавность движения
            }),  
            left: withTiming(windowWidth * (162 / 932), {
                duration: 1000, 
                easing: Easing.out(Easing.exp) // Плавность движения
            })
        };
    });

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const onDrop = () => {
        setDropped(true)
    };

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            if (dropped) return
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            if (dropped) return
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: (event) => {
            if (dropped) return
            console.log(event)
            if (
                event.absoluteX < (windowWidth * (255 / 932)) && event.absoluteX > (windowWidth * (143 / 932))  // && event.absoluteY > (windowHeight * (185 / 430))
            ) {
                runOnJS(onDrop)();
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.Image source={leftwing} style={[{ transform: [{ translateX: translateX }, { translateY: translateY }], position: 'absolute', right: 230, top: 230, width: windowWidth * (75 / 800), height: windowHeight * (60 / 360), resizeMode: 'contain' }, dropped && animatedStyle]} />     
        </PanGestureHandler>
    )
}

export default G6Image5;