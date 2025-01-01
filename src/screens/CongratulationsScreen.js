import React, { useRef, useEffect, useState } from 'react';
import { View, useWindowDimensions, Image, Text, TouchableOpacity, Platform } from 'react-native';
import Animated, { BounceIn, FadeOut, withTiming, runOnJS, useSharedValue, useAnimatedStyle, withDelay, FadeIn, withSequence, withSpring } from 'react-native-reanimated';
import star from '../images/tabler_star-filled.png';
import * as Haptics from 'expo-haptics'
import StarsLottie from '../components/StarsLottie';
import ConfettiLottie from '../components/ConfettiLottie';
import StarStats from '../components/StarStats';
import store from '../store/store';

const CongratulationsScreen = ({ onComplete, stars: starsText }) => {
    
    const stars = Array.from({ length: parseInt(starsText, 10) }, (_, index) => ({
        id: index + 1,
    }));
    
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [numStars, setNumStars] = useState(0)

    const [layoutCaptured, setLayoutCaptured] = useState();

    useEffect(() => {
        onComplete(stars.length);
    }, [])

    const starsContainerOpacity = useSharedValue(1) 

    const animatedValues = useRef(stars.map(() => ({
        x: useSharedValue(Platform.isPad? windowWidth * (506 / 800) : windowWidth * (507 / 800)),
        y: useSharedValue(Platform.isPad? windowHeight * (135 / 360) : windowHeight * (134 / 360))
    })));

    const Nums = () => {
        setNumStars(prev => prev + 1)
    }

    useEffect(() => {
        if (layoutCaptured) {
            stars.forEach((star, index) => {
                const delay = (index * 200);
                const delayTimer = setTimeout(() => {
                    starsContainerOpacity.value = withTiming(0, { duration: 500 });
                    animatedValues.current[index].y.value = withTiming(layoutCaptured.y, { duration: 600 });
                    animatedValues.current[index].x.value = withTiming(layoutCaptured.x + 30, { duration: 600 }, () => {
                        runOnJS(Nums)()
                    });
                }, delay);
                return () => clearTimeout(delayTimer);
            });
        }
    }, [layoutCaptured]);

    const animatedStyles = animatedValues.current.map(({ x, y }) => {
        return useAnimatedStyle(() => ({
            left: x.value,
            top: y.value,
        }));
    });

    const starsContainerStyle = useAnimatedStyle(() => ({
        opacity: starsContainerOpacity.value,
    }));

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ConfettiLottie />
            <Animated.View entering={BounceIn.delay(800).duration(700)}
                style={{
                    top: Platform.isPad? windowHeight * (80 / 360) : windowHeight * (40 / 360),
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: windowWidth * (260 / 800),
                    height: Platform.isPad? windowWidth * (250 / 800) : windowHeight * (250 / 360),
                    alignSelf: 'center',
                    borderRadius: 20,
                    flexDirection: 'row',
                }}
            >
                <StarsLottie stars={stars}/>
                <Animated.View entering={BounceIn.delay(1700).duration(800).springify(400)} style={[starsContainerStyle, {width: 75, height: 40, backgroundColor: '#B3ABDB', position: 'absolute', borderRadius: 100, alignSelf: 'flex-end', gap: 1, top: Platform.isPad? '35%' : '35%', right: -40, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10}]}>
                    <Text style={{fontWeight: '600', color: 'white', fontSize: 23, textAlign: 'center', alignSelf: 'flex-end'}}>+{`${stars.length}`}</Text>
                </Animated.View>
                <View style={{width: windowWidth * (212 / 800), height: Platform.isPad? windowWidth * (60 / 800) : windowHeight * (60 / 360), position: 'absolute', alignSelf: 'center', left: '10%', justifyContent: 'space-between', padding: 4}}>
                    <Text style={{fontSize: windowWidth * (20 / 800), fontWeight: '600', color: '#222222', alignSelf: 'center'}}>Congratulations!</Text>
                    <Text style={{fontSize: windowWidth * (14 / 800), fontWeight: '400', color: '#222222', alignSelf: 'center'}}>You’ve just earned {`${stars.length}`} stars!!</Text>
                </View>
                <TouchableOpacity style={{width: windowWidth * (212 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), position: 'absolute', backgroundColor: '#504297', bottom: Platform.isPad? windowWidth * (30 / 800) : windowHeight * (30 / 360), borderRadius: 100, alignSelf: 'center', left: '10%', paddingHorizontal: 16, justifyContent: 'center'}}>
                    <Text style={{fontSize: windowWidth * (12 / 800), fontWeight: '600', color: 'white'}}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
            {stars.map((item, index) => {
                return (
                    <Animated.Image
                        key={index}
                        entering={FadeIn.delay(1700)}
                        source={star}
                        style={[animatedStyles[index],
                            {
                                width: Platform.isPad? windowHeight * (20 / 360) : windowWidth * (20 / 800),
                                height: Platform.isPad? windowHeight * (20 / 800) : windowHeight * (20 / 360),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                position: 'absolute',
                            },
                        ]}
                />
                )})}
                <StarStats 
                    numStars={numStars}
                    layoutCaptured={layoutCaptured}
                    setLayoutCaptured={setLayoutCaptured}
                />
        </View>
    );
};

export default CongratulationsScreen;


// const animatedX = useSharedValue(565);
    // const animatedY = useSharedValue(153);


    // const animatedStyle = useAnimatedStyle(() => ({
    //     left: animatedX.value, // Абсолютное положение
    //     top: animatedY.value,  // Абсолютное положение
    // }));

    // useEffect(() => {
    //     if (statStarLayout) {
    //         stars.forEach((star, index) => {
    //             const delay = 2000 + (index * 500); // задержка 500мс между анимациями каждой звезды
    //             const delayTimer = setTimeout(() => {
    //                 animatedY.value = withTiming(statStarLayout.y, { duration: 800 });
    //                 animatedX.value = withTiming(statStarLayout.x, { duration: 800 });
    //             }, delay);

    //             return () => clearTimeout(delayTimer);
    //         });
    //     }
    // }, [statStarLayout]);


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //     lottieRef.current?.play(0, 60);
    //     }, 800);

    //     return () => clearTimeout(timer);
    // }, []);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //     confettiRef.current?.play(0, 150);
    //     }, 0);

    //     return () => clearTimeout(timer);
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         lottieRef.current?.reset(); // Сбрасываем star1
    //         confettiRef.current?.reset(); // Сбрасываем confetti
    //     };
    // }, []);

    // const Lottie = () => {
    //     return (
    //         <LottieView
    //             ref={lottieRef}
    //             source={stars.length === 1? star1 : stars.length === 2? star2 : stars.length === 3? star3 : star0}
    //             style={{ width: windowWidth * (245 / 800), height: windowHeight * (220 / 360)}}
    //             resizeMode='center'
    //             autoPlay={false}
    //             loop={false}
    //             // onAnimationFinish={() => {console.log('finished')}}
    //         />
    //     );
    // };

    // const Confetti = () => {
    //     return (
    //         <LottieView
    //             ref={confettiRef} 
    //             source={confetti}
    //             style={{ width: windowWidth, height: windowHeight }}
    //             resizeMode='center'
    //             autoPlay={true}
    //             loop={false}
    //             // onAnimationFinish={() => {console.log('confetti finished')}}
    //         />
    //     )
    // }