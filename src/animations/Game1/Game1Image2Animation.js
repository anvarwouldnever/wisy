import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import unknowndog from '../../images/unknownDog.png'
import dog from '../../images/dogGame1.png'
import { useWindowDimensions, Platform } from "react-native";

const Game1Image2Animation = ({level}) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return <Animated.Image entering={FadeInRight} source={level === 2? unknowndog : dog} style={{width: windowWidth * (140 / 800), height: Platform.isPad? windowWidth * (140 / 800) : windowHeight * (140 / 360)}}/>
}

export default Game1Image2Animation;