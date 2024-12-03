import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Dimensions, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import Logo from "../components/Logo";
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useAnimatedProps, useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash"
import lapa from '../images/lapa.png'
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";

const { width, height } = Dimensions.get('window');

const LoaderScreen = () => {

    const AnimatedCircle = Animated.createAnimatedComponent(Circle)
    const [text, setText] = useState('Finding activities that matches your child’s skills!')
    
    const progress = useSharedValue(0)
    const navigation = useNavigation()

    useEffect(() => {
        progress.value = withTiming(1, {duration: 1500})
        setTimeout(() => {
            setText('We have matched activities that fit your child!')
        }, 1300);
    }, [])

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: (height * (500 / 932)) * (1 - progress.value)
    }))

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}%`
    })

    const angle = useSharedValue(-Math.PI / 2);

    useEffect(() => {
        angle.value = withTiming(2 * Math.PI - Math.PI / 2, { duration: 1500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const radius = (height * (78 / 932))
        const centerX = width / 2;
        const centerY = height / 2;

        return {
            transform: [
                { translateX: centerX + radius * Math.cos(angle.value) - centerX },
                { translateY: centerY + radius * Math.sin(angle.value) - centerY },
            ],
        };
    });

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            <Logo />
            <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', top: height * (320 / 932), height: height * (170 / 932), width: width * (170 / 430)}}>
                <Svg style={{position: 'absolute', height: height * (170 / 800), width: width * (170 / 360)}}>
                    <AnimatedCircle 
                        cy={height * (100 / 932)}
                        cx={width * (100 / 430)}
                        r={(height * (500 / 932)) / (2 * Math.PI)}
                        stroke={'#91B049'}
                        strokeWidth={10}
                        strokeDasharray={(height * (500 / 932))}
                        strokeDashoffset={(height * (500 / 932)) * 0.7}
                        fill={'white'}
                        animatedProps={animatedProps}
                        strokeLinecap={'round'}
                        strokeLinejoin={'round'}
                        transform={`rotate(265 ${width * (100 / 430)} ${height * (100 / 932)})`}
                    />
                </Svg>
                <ReText style={{position: 'absolute', color: '#222222', fontSize: (height * (24 / 800)), fontWeight: '600'}} text={progressText}/>
                <View style={styles.container}>
                    <Animated.Image source={lapa} style={[styles.circle, animatedStyle]} />
                </View>
            </View>
            <Text style={{width: width * (312 / 360), height: height * (56 / 800), color: '#222222', fontWeight: '600', fontSize: Platform.isPad? height * (15 / 800) : height * (20 / 800), textAlign: 'center', lineHeight: height * (28 / 800), position: 'absolute', top: height * (550 / 932)}}>{text}</Text>
            {text === 'We have matched activities that fit your child!' && 
            <TouchableOpacity onPress={() => navigation.navigate('ChoosePlayerScreen')} style={{position: 'absolute', top: height * (800 / 932),  backgroundColor: '#504297', width: width * (312 / 360), height: height * (56 / 800), borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#FFFFFF', fontSize: Platform.isPad? height * (10 / 800) : height * (14 / 800), fontWeight: '600', textAlign: 'center', lineHeight: 24}}>Continue</Text>
            </TouchableOpacity>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 25
    },
});

export default LoaderScreen;