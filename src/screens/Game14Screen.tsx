import React, { useState, useRef } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedProps, runOnJS } from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const Game14Screen = () => {

        const { height: windowHeight, width: windowWidth } = useWindowDimensions();
        const [lines, setLines] = useState([])
        const lineStartX = useSharedValue(0);
        const lineStartY = useSharedValue(0);
        const lineEndX = useSharedValue(0);
        const lineEndY = useSharedValue(0);
    
        const containerOffset = { top: 35, left: 200 }; // Смещение контейнера
        const mainContainerOffset = { top: 24 };

        const animatedProps = useAnimatedProps(() => ({
            x1: lineStartX.value,
            y1: lineStartY.value,
            x2: lineEndX.value,
            y2: lineEndY.value,
        }));

            const images = [{}, {}, {}]
            const options = [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}, {key: '6'}]

            return (
                    <View style={{ top: mainContainerOffset.top, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', }}>
                        <Svg onResponderMove={() => {}} style={{ position: 'absolute', width: '100%', height: '100%'}}>
                        {lines && lines.length > 0 && lines.map((line, index) => (
                            <Line
                                key={index}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#504297"
                                strokeWidth="2"
                            />
                            ))}
                        
                            <AnimatedLine
                                animatedProps={animatedProps}
                                stroke={'#504297'}
                                strokeWidth="2"
                            />
                        </Svg>
                        <View style={{width: windowWidth * (448 / 800), height: windowHeight * (300 / 360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: containerOffset.top, left: containerOffset.left}}>
                            <View style={{width: windowWidth * (80 / 800), height: windowHeight * (272 / 360), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
                                {images.map((item, index) => {
                                    return (
                                        <View key={index} style={{width: windowWidth * (80 / 800), height: windowHeight * (80 / 360), backgroundColor: 'white', backgroundColor: 'white', borderRadius: 10}}>
                
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{width: windowWidth * (160 / 800), height: windowHeight * (300 / 360), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', overflow: 'visible'}}>
                                {options.map((item, index) => {

                                    const updateArray = (data) => {
                                        setLines(prev => [...prev, data])
                                    }

                                    const gesture = Gesture.Pan()
                                        .onBegin((event) => {
                                            console.log('tapped')
                                            lineStartX.value = event.absoluteX - mainContainerOffset.top;
                                            lineStartY.value = event.absoluteY - mainContainerOffset.top;
                                            lineEndX.value = event.absoluteX - mainContainerOffset.top;
                                            lineEndY.value = event.absoluteY - mainContainerOffset.top;
                                        })
                                        .onUpdate((event) => {
                                            lineEndX.value = event.absoluteX - mainContainerOffset.top
                                            lineEndY.value = event.absoluteY - mainContainerOffset.top
                                        })
                                        .onEnd((event) => {
                                            runOnJS(updateArray)({
                                                x1: lineStartX.value,
                                                y1: lineStartY.value,
                                                x2: lineEndX.value,
                                                y2: lineEndY.value
                                            })
                                        })
                
                                    return (
                                        <GestureDetector key={item.key} gesture={gesture}>
                                            <View style={{width: windowWidth * (160 / 800), height: windowHeight * (40 / 360), backgroundColor: 'white', borderRadius: 10}}>
                                                
                                            </View>
                                        </GestureDetector>
                                    )
                                })}
                            </View>
                            <View style={{width: windowWidth * (80 / 800), height: windowHeight * (272 / 360), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
                                {images.map((item, index) => {
                                    return (
                                        <View key={index} style={{width: windowWidth * (80 / 800), height: windowHeight * (80 / 360), backgroundColor: 'white', backgroundColor: 'white', borderRadius: 10}}>
                
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        
                    </View>
                )
                
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    box: {
      position: 'absolute',
      alignSelf: 'center',
      width: 200,
      height: 200,
      backgroundColor: 'white',
      borderRadius: 10,
      top: '25%',
      left: '10%',
    },
    boxRight: {
      position: 'absolute',
      alignSelf: 'center',
      width: 200,
      height: 200,
      backgroundColor: 'white',
      borderRadius: 10,
      top: '25%',
      right: '10%',
    },
    line: {
      position: 'absolute',
      height: 3,
      backgroundColor: 'red',
    },
  });

export default Game14Screen;