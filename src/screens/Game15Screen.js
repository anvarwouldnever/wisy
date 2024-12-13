import React, { useState, useRef } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedProps, runOnJS } from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const Game15Screen = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [lines, setLines] = useState([])
    const lineStartX = useSharedValue(0);
    const lineStartY = useSharedValue(0);
    const lineEndX = useSharedValue(0);
    const lineEndY = useSharedValue(0);
    
    const containerOffset = { top: 35, left: 200 }; // Смещение контейнера

    const animatedProps = useAnimatedProps(() => ({
        x1: lineStartX.value,
        y1: lineStartY.value,
        x2: lineEndX.value,
        y2: lineEndY.value,
    }));

    const images = [{}, {}, {}]
    const options = [{}, {}, {}]

    return (
        <View style={{ flex: 1 }}>
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
            <View style={{ width: windowWidth * (375 / 800), height: windowHeight * (312 / 360), position: 'absolute', top: '7%', left: '27%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{height: '100%', width: 'auto', justifyContent: 'space-between', flexDirection: 'column'}}>
                    {images.map((images, index) => {

                        const updateArray = (data) => {
                            setLines(prev => [...prev, data])
                        }

                        const gesture = Gesture.Pan()
                            .onBegin((event) => {
                                console.log('tapped')
                                lineStartX.value = event.absoluteX;
                                lineStartY.value = event.absoluteY;
                                lineEndX.value = event.absoluteX;
                                lineEndY.value = event.absoluteY;
                            })
                            .onUpdate((event) => {
                                lineEndX.value = event.absoluteX
                                lineEndY.value = event.absoluteY
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
                            <GestureDetector key={index} gesture={gesture}>
                                <View style={{ width: windowWidth * (96 / 800), height: windowHeight * (96 / 360), borderRadius: 10, backgroundColor: 'white'}}>

                                </View>
                            </GestureDetector>
                        )
                    })}
                </View>
                <View style={{height: '100%', width: 'auto', justifyContent: 'space-between', flexDirection: 'column'}}>
                    {images.map((images, index) => {

                        const updateArray = (data) => {
                            setLines(prev => [...prev, data])
                        }

                        const gesture = Gesture.Pan()
                            .onBegin((event) => {
                                console.log('tapped')
                                lineStartX.value = event.absoluteX;
                                lineStartY.value = event.absoluteY;
                                lineEndX.value = event.absoluteX;
                                lineEndY.value = event.absoluteY;
                            })
                            .onUpdate((event) => {
                                lineEndX.value = event.absoluteX
                                lineEndY.value = event.absoluteY
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
                            <GestureDetector key={index} gesture={gesture}>
                                <View style={{ width: windowWidth * (96 / 800), height: windowHeight * (96 / 360), borderRadius: 10, backgroundColor: 'white'}}>

                                </View>
                            </GestureDetector>
                        )
                    })}
                </View>
            </View>
        </View>
    )          
}

export default Game15Screen;