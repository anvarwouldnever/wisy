import { Platform, Image, Text, useWindowDimensions } from "react-native";
import star from '../images/tabler_star-filled.png';
import { useEffect, useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withSpring } from "react-native-reanimated";
import * as Haptics from 'expo-haptics'

const StarStats = ({ numStars, layoutCaptured, setLayoutCaptured }) => {

    const bounceValue = useSharedValue(1);
    const [stars, setStars] = useState(180)

    const handleLayout = (event) => {
        event.persist()
        setTimeout(() => {
            if (!layoutCaptured) {
                setLayoutCaptured(event.nativeEvent.layout);
            }
        }, 3000);
    };
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: bounceValue.value }],
    }));
    
    const triggerBounce = () => {
        setStars(prev => prev + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        bounceValue.value = withSequence(
            withSpring(1.2, { stiffness: 200 }),
            withSpring(1, { stiffness: 100 })
        );
    };

    useEffect(() => {
        if (numStars) {
            triggerBounce();
        }
    }, [numStars]);

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <Animated.View onLayout={(event) => handleLayout(event)} style={[animatedStyle, {position: 'absolute', right: 30, top: 0, backgroundColor: 'white', width: windowWidth * (75 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), borderRadius: 100, flexDirection: 'row', justifyContent: 'space-evenly'}]}>
            <Image source={star} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360), aspectRatio: 24 / 24, alignSelf: 'center'}}/>
            <Text style={{fontWeight: '600', fontSize: windowWidth * (20 / 800), color: 'black', textAlign: 'center', alignSelf: 'center'}}>{stars}</Text>
        </Animated.View>
    )
}

export default StarStats;