import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing, withRepeat } from 'react-native-reanimated';

const DotsAnimation = () => {
const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const dot1Opacity = useSharedValue(0);
  const dot2Opacity = useSharedValue(0);
  const dot3Opacity = useSharedValue(0);

  const duration = 300;

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }));                

  useEffect(() => {
    const animateDots = () => {
      dot1Opacity.value = withSequence(
        withTiming(1, { duration }), // Появление первой точки
        withTiming(0, { duration })  // Исчезновение первой точки
      );

      dot2Opacity.value = withDelay(
        duration - 100, // Задержка перед второй точкой
        withSequence(
          withTiming(1, { duration }), // Появление второй точки
          withTiming(0, { duration })  // Исчезновение второй точки
        )
      );

      dot3Opacity.value = withDelay(
        duration * 1.5, // Задержка перед третьей точкой
        withSequence(
          withTiming(1, { duration }), // Появление третьей точки
          withTiming(0, { duration })  // Исчезновение третьей точки
        )
      );
    };

    const interval = setInterval(() => {
      animateDots(); // Запускаем анимацию в интервале
    }, duration * 3.5); // Общее время для всех точек

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []);

  const height = windowHeight * (20 / 932);

  return (
    <View style={styles.container}>
      <Svg height={height} width="60">
        <AnimatedCircle cx="5" cy="12" r="1.5" fill="#555" style={dot1Style} />
        <AnimatedCircle cx="15" cy="12" r="1.5" fill="#555" style={dot2Style} />
        <AnimatedCircle cx="25" cy="12" r="1.5" fill="#555" style={dot3Style} />
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DotsAnimation;
