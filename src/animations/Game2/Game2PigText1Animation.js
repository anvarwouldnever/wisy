import React, { useEffect } from "react";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { Text, View, useWindowDimensions, StyleSheet, Platform } from "react-native";

const Game2PigText1Animation = ({ setText }) => {

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  useEffect(() => {
      const timer = setTimeout(() => {
          setText(4);
      }, 3000);

      return () => clearTimeout(timer);
  }, [setText]);

    return <Animated.View entering={ZoomInEasyDown} style={{width: windowWidth * (180 / 800), height: 'auto', alignSelf: 'center', backgroundColor: '#C4DF84', borderTopRightRadius: 16, borderTopLeftRadius: 16, borderBottomRightRadius: 16, padding: windowHeight * (12 / 360)}}>
                <Text style={{fontWeight: '400', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), lineHeight: Platform.isPad? windowWidth * (20 / 800) : windowHeight * (20 / 360), color: '#222222'}}>Incorrect..                                   A pig is a domesticated animal known for its plump body, snout, and curly tail. It often lives on farms and enjoys rooting around in the dirt..</Text>
                <View style={styles.triangle}/>
            </Animated.View>
}

const styles = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      borderRightWidth: 16,
      borderTopWidth: 8,
      borderRightColor: 'transparent',
      borderTopColor: '#C4DF84',
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      position: 'absolute',
      bottom: -8,
      left: 0
    },
  });

export default Game2PigText1Animation;