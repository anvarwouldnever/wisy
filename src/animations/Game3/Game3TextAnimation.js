import React, { useRef } from "react";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { Text, View, useWindowDimensions, StyleSheet, Platform } from "react-native";
import LottieView from 'lottie-react-native'
import lottie from '../../../assets/6Vcbuw6I0c (1).json'

const Game3TextAnimation = ({ text, thinking }) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const animationRef = useRef(null);

    const Lottie = () => {
        return (
            <LottieView
                ref={animationRef}
                source={lottie} 
                loop
                autoPlay
                style={{width: 50, height: 40, alignSelf: 'center', transform: [{ scale: Platform.isPad? 1.5 : 1 }]}}
            />
        )
    }

    return (
        <Animated.View
            key={[text, thinking]}
            entering={ZoomInEasyDown}
            style={{
                width: !thinking? 'auto' : windowWidth * (130 / 800),
                height: 'auto',
                alignSelf: 'flex-start',
                backgroundColor: thinking? '#C4DF84' : text? '#C4DF84' : 'transparent',
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                borderBottomRightRadius: 16,
                padding: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360),
                marginLeft: 10
            }}
        >
            {!thinking? <Text
                style={{
                    fontWeight: '400',
                    fontSize: Platform.isPad ? windowWidth * (12 / 800) : windowHeight * (12 / 360),
                    lineHeight: Platform.isPad ? windowWidth * (20 / 800) : windowHeight * (20 / 360),
                    color: '#222222'
                }}
            >
                {text}
            </Text>
            :
            <Lottie />}
            <View style={{
                width: 0,
                height: 0,
                borderRightWidth: 16,     // Ширина треугольника (основание)
                borderTopWidth: 8,        // Высота треугольника
                borderRightColor: 'transparent',
                borderTopColor: thinking? '#C4DF84' : text? '#C4DF84' : 'transparent',   // Цвет треугольника
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                position: 'absolute',
                bottom: -8,
                left: 0
            }} />
        </Animated.View>
    );
}

// const styles = StyleSheet.create({
//     triangle: {
//         width: 0,
//         height: 0,
//         borderRightWidth: 16,     // Ширина треугольника (основание)
//         borderTopWidth: 8,        // Высота треугольника
//         borderRightColor: 'transparent',
//         borderTopColor: text? '#C4DF84' : '',   // Цвет треугольника
//         borderLeftWidth: 0,
//         borderBottomWidth: 0,
//         position: 'absolute',
//         bottom: -8,
//         left: 0
//     },
// });

export default Game3TextAnimation;