import React, { useEffect } from "react";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { Text, View, useWindowDimensions, StyleSheet, Platform } from "react-native";

const Game2TextIncorrectAnimation = ({ correctAnimal, setText }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    useEffect(() => {
      // Устанавливаем таймер
      const timer = setTimeout(() => {
          setText(4);
      }, 3000);

      // Очищаем таймер при размонтировании компонента
      return () => clearTimeout(timer);
  }, [setText]); 

    return <Animated.View entering={ZoomInEasyDown} style={{width: windowWidth * (180 / 800), height: 'auto', alignSelf: 'center', backgroundColor: '#C4DF84', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderBottomRightRadius: 16, padding: windowHeight * (12 / 360)}}>
                <Text style={{fontWeight: '400', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), lineHeight: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (20 / 360), color: '#222222'}}>Incorrect.. The animal is called “{correctAnimal}”                                              Try again..</Text>
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

export default Game2TextIncorrectAnimation;