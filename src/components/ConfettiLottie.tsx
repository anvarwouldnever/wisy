import LottieView from "lottie-react-native"
import { useRef, useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import confetti from '../lotties/confett.json'

const ConfettiLottie = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const confettiRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
        confettiRef.current?.play(0, 150);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        return () => {
            confettiRef.current?.reset(); // Сбрасываем confetti
        };
    }, []);

    return (
        <LottieView
            ref={confettiRef} 
            source={confetti}
            style={{ width: windowWidth, height: windowHeight, transform: [{ scale: Platform.isPad? 3 : 1.5 }] }}
            resizeMode='center'
            autoPlay={true}
            loop={false}
        />
    )
}

export default ConfettiLottie;