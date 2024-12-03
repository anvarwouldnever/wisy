import React from "react";
import Animated, { ZoomInEasyDown, ZoomInEasyUp } from "react-native-reanimated";
import { Text, View, useWindowDimensions, StyleSheet, Platform } from "react-native";

export default function Game1Text3Animation() {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return <Animated.View entering={ZoomInEasyDown} style={{width: windowWidth * (180 / 800), height: 'auto', alignSelf: 'center', backgroundColor: '#C4DF84', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderBottomRightRadius: 16, padding: windowHeight * (12 / 360)}}>
                <Text style={{fontWeight: '400', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), lineHeight: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (20 / 360), color: '#222222'}}>Let’s start simple..</Text>
                <View style={styles.triangle}/>
            </Animated.View>
}

const styles = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      borderRightWidth: 16,     // Ширина треугольника (основание)
      borderTopWidth: 8,        // Высота треугольника
      borderRightColor: 'transparent',
      borderTopColor: '#C4DF84',   // Цвет треугольника
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      position: 'absolute',
      bottom: -8,
      left: 0
    },
  });