import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import star0 from '../lotties/0.json'
import star1 from '../lotties/1.json'
import star2 from '../lotties/2.json'
import star3 from '../lotties/3.json'


const StarsLottie = ({ stars }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const lottieRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
        lottieRef.current?.play(0, 60);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LottieView
            ref={lottieRef}
            source={stars.length === 1? star1 : stars.length === 2? star2 : stars.length === 3? star3 : star0}
            style={{ width: Platform.isPad? windowWidth * (245 / 800) : windowWidth * (245 / 800), height: Platform.isPad? windowWidth * (220 / 800) : windowHeight * (220 / 360), transform: [{ scale: Platform.isPad? 1.5 : 1}]}}
            resizeMode='center'
            autoPlay={false}
            loop={false}

        />
    );
};

export default StarsLottie;