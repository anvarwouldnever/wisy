import { useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Text, useWindowDimensions, TouchableOpacity, Image, Platform, Vibration } from 'react-native';
import bg from '../images/bg.png'
import narrowleft from '../images/narrowleft-purple.png'
import wisy from '../images/pandaHead.png'
import star from '../images/Star.png'
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Game1TextAnimation from '../animations/Game1/Game1TextAnimations';
import MicroAnimation from '../animations/MicroAnimation';
import api from '../api/api'
import TaskComponent from '../components/TaskComponent';
import store from '../store/store';

const Game1Screen = ({ data, setLevel }) => {

    // console.log(data)

    const navigation = useNavigation();
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const [text, setText] = useState("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..");
    const [attempt, setAttempt] = useState('1');
    const [image, setImage] = useState(1);
    const [thinking, setThinking] = useState(false);

    const vibrate = () => {
        Vibration.vibrate(500);
    };

    const correctAnswer = (hint) => {
        setImage(2)
        setText(hint)
        setTimeout(() => {
            setText("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..")
            setAttempt('1')
            setLevel(prev => prev + 1)
            setImage(1)
        }, 3000);
    };

    const incorrectAnswer = (hint, attempt) => {
        setText(hint)
        setAttempt(attempt) 
    };

    const incorrectAnswerToNext = (hint) => {
        vibrate()
        setText(hint)
        setTimeout(() => {
            setLevel(prev => prev + 1)
            setImage(1)
            setText("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..")
            setAttempt('1')
        }, 3000); 
    };

    const sendAnswer = async(uri) => {
        try {
            setThinking(true)
            const requestStatus = await api.answerTask(data.id, attempt, uri, `${store.playingChildId.id}`)
            return requestStatus    
        } catch (error) {
            console.log(error)   
        } finally {
            setThinking(false)
        }
    };

    return (
        <View style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50}}>
            <View source={bg} style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, justifyContent: Platform.isPad? 'center' : ''}}>
                {data && <TaskComponent image={image === 1? data.content.placeholder_image.url : data.content.image.url} successImage={image}/>}
                    <View style={{width: windowWidth * (255 / 800), height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (150 / 360), alignItems: 'flex-end', flexDirection: 'row', position: 'absolute', left: 0, bottom: 0}}>
                        <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                        <Game1TextAnimation text={text} thinking={thinking}/>
                    </View>
                    <View style={{position: 'absolute', bottom: 0, right: 0}}>
                        {!thinking && <MicroAnimation correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} incorrectAnswerToNext={incorrectAnswerToNext} setText={setText} sendAnswer={sendAnswer} />}
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
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

export default Game1Screen;

// import { useState, useRef } from 'react';
// import { View, StyleSheet, ImageBackground, Text, useWindowDimensions, TouchableOpacity, Image, Platform, Vibration } from 'react-native';
// import bg from '../images/bg.png'
// import narrowleft from '../images/narrowleft-purple.png'
// import wisy from '../images/pandaHead.png'
// import star from '../images/Star.png'
// import { useNavigation } from '@react-navigation/native';
// import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
// import Game1TextAnimation from '../animations/Game1/Game1TextAnimations';
// import MicroAnimation from '../animations/MicroAnimation';
// import api from '../api/api'
// import TaskComponent from '../components/TaskComponent';
// import store from '../store/store';

// const Game1Screen = () => {

//     const navigation = useNavigation();
//     const { height: windowHeight, width: windowWidth } = useWindowDimensions();

//     const [level, setLevel] = useState(0);
//     const [text, setText] = useState("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..");
//     const [attempt, setAttempt] = useState('1');
//     const [image, setImage] = useState(1);
//     const [thinking, setThinking] = useState(false);

//     const animatedProgress = useAnimatedStyle(() => {
//         return {
//             width: withTiming(level === 1 ? windowWidth * (8 / 800) : level === 2? windowWidth * (16 / 800) : level === 3? windowWidth * (24 / 800) : level === 4? windowWidth * (32 / 800) : level === 5? windowWidth * (40 / 800) : level === 6? windowWidth * (48 / 800) : level === 7? windowWidth * (56 / 800) : level === 8? windowWidth * (64 / 800) : level === 9? windowWidth * (72 / 800) : level === 10 && windowWidth * (80 / 800), {duration: 300})
//         }
//     });

//     const vibrate = () => {
//         Vibration.vibrate(500);
//     };

//     const correctAnswer = (hint) => {
//         setImage(2)
//         setText(hint)
//         setTimeout(() => {
//             setText("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..")
//             setAttempt('1')
//             setLevel(prev => prev + 1)
//             setImage(1)
//         }, 3000);
//     };

//     const incorrectAnswer = (hint, attempt) => {
//         setText(hint)
//         setAttempt(attempt) 
//     };

//     const incorrectAnswerToNext = (hint) => {
//         vibrate()
//         setText(hint)
//         setTimeout(() => {
//             setLevel(prev => prev + 1)
//             setImage(1)
//             setText("Kā sauc attēlā redzamo dzīvnieku? Turi mikrofona pogu, lai ierunātu atbildi..")
//             setAttempt('1')
//         }, 3000); 
//     };

//     const sendAnswer = async(uri) => {
//         try {
//             setThinking(true)
//             const requestStatus = await api.answerTask(data[level].id, attempt, uri, `${store.playingChildId.id}`)
//             return requestStatus    
//         } catch (error) {
//             console.log(error)   
//         } finally {
//             setThinking(false)
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={bg} style={{flex: 1, alignItems: 'center', padding: 30, paddingVertical: Platform.isPad? windowWidth * (40 / 800) : Platform.OS === 'ios'? 25 : 25, justifyContent: 'space-between'}}>
//                 <View style={{width: windowWidth * (730 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
//                     <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: 'white', width: windowWidth * (85 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), borderRadius: 100, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: windowWidth * (8 / 800)}}>
//                         <Image source={narrowleft} style={{width: 24, height: 24, aspectRatio: 24 / 24}}/>
//                         <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), lineHeight: windowHeight * (20 / 360), color: '#504297'}}>Exit</Text>
//                     </TouchableOpacity>
//                     <View style={{width: windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (28 / 800) : windowHeight * (28 / 360), alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
//                         <View style={{width: windowWidth * (100 / 800), height: Platform.isPad? windowWidth * (12 / 800) : windowHeight * (12 / 360), backgroundColor: 'white', borderRadius: 100, alignItems: 'center', flexDirection: 'row', padding: 2}}>
//                             <Animated.View style={[animatedProgress, {height: Platform.isPad? windowWidth * (8 / 800) : windowHeight * (8 / 360), backgroundColor: '#504297', borderRadius: 100}]}/>
//                         </View>
//                         <Image source={star} style={{width: windowWidth * (28 / 800) , height: Platform.isPad? windowWidth * (28 / 800) : windowHeight * (28 / 360), aspectRatio: 28 / 28, position: 'absolute', alignSelf: 'center', right: -2, bottom: -3}}/>
//                     </View>
//                 </View>
//                 {data && data[level] && <TaskComponent image={image === 1? data[level].content.placeholder_image.url : data[level].content.image.url} successImage={image}/>}
//                 <View style={{width: windowWidth * (730 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
//                     <View style={{width: windowWidth * (255 / 800), height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (150 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
//                         <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
//                         <Game1TextAnimation text={text} thinking={thinking}/>
//                     </View>
//                     {!thinking && <MicroAnimation correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} incorrectAnswerToNext={incorrectAnswerToNext} setText={setText} sendAnswer={sendAnswer} />}
//                 </View>
//             </ImageBackground>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   triangle: {
//     width: 0,
//     height: 0,
//     borderRightWidth: 16,     // Ширина треугольника (основание)
//     borderTopWidth: 8,        // Высота треугольника
//     borderRightColor: 'transparent',
//     borderTopColor: '#C4DF84',   // Цвет треугольника
//     borderLeftWidth: 0,
//     borderBottomWidth: 0,
//     position: 'absolute',
//     bottom: -8,
//     left: 0
//   },
// });

// export default Game1Screen;