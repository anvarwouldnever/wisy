import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated'
import squareright from '../../images/squareright.png'

const G6Image2 = () => {

    const [dropped, setDropped] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withTiming(1.4, { 
                    duration: 1000, 
                    easing: Easing.out(Easing.exp) // Используем плавный easing
                })} 
            ],
            top: withTiming(windowHeight * (175 / 430), {
                duration: 1000, 
                easing: Easing.out(Easing.exp) // Плавность движения
            }),  
            left: withTiming(windowWidth * (190 / 932), {
                duration: 1000, 
                easing: Easing.out(Easing.exp)
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
                event.absoluteX < (windowWidth * (235 / 932)) && event.absoluteX > (windowWidth * (175 / 932)) && event.absoluteY > (windowHeight * (170 / 430)) && event.absoluteY < (windowHeight * (230 / 430))
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
            <Animated.Image source={squareright} style={[{ transform: [{ translateX: translateX }, { translateY: translateY }], position: 'absolute', right: 190, top: 100, width: windowWidth * (38 / 800), height: windowHeight * (38 / 360), resizeMode: 'contain' }, dropped && animatedStyle]} />     
        </PanGestureHandler>
    )
}

export default G6Image2;