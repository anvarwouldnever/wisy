import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import dog from '../../images/dogGame1.png'
import { useWindowDimensions, Platform } from "react-native";

const Game1ImageAnimation = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return <Animated.Image entering={FadeInRight} source={dog} style={{width: windowWidth * (140 / 800), height: Platform.isPad? windowWidth * (140 / 800) : windowHeight * (140 / 360)}}/>
}

export default Game1ImageAnimation