import { View, Text, useWindowDimensions, Image, Platform, TouchableOpacity, Vibration } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Animated, {ZoomInEasyDown} from 'react-native-reanimated';
import Game3TextAnimation from '../animations/Game3/Game3TextAnimation';
import wisy from '../images/pandaHead.png'
import speaker from '../images/tabler_speakerphone.png'
import grayspeaker from '../images/grayspeaker.png'
import blackspeaker from '../images/blackspeaker.png'
import black from '../images/tabler_speakerphone2.png'
import store from '../store/store';
import { Audio } from 'expo-av';
import api from '../api/api'
import { playSound } from '../hooks/usePlayBase64Audio';
import useTimer from '../hooks/useTimer';
import LottieView from 'lottie-react-native'
import speakingWisy from '../lotties/headv9.json'
import { playSoundWithoutStopping } from '../hooks/usePlayWithoutStoppingBackgrounds'
import Game8Tutorial from '../components/Game8Tutorial';

const Game12Screen = ({ data, setLevel, setStars, subCollectionId, onCompleteTask, isFromAttributes, setEarnedStars, introAudio, introText, introTaskIndex, level, tutorials, tutorialShow, setTutorialShow }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [text, setText] = useState(data?.content?.question);
    const [attempt, setAttempt] = useState('1');
    const [thinking, setThinking] = useState(false);
    const [id, setId] = useState(null)
    const sound = useRef(new Audio.Sound());
    const [lock, setLock] = useState(false);
    const [wisySpeaking, setWisySpeaking] = useState(false)
    
    const timeoutRef = useRef(null);
    const lottieRef = useRef(null);
    
    useEffect(() => {
        if (wisySpeaking) {
            setTimeout(() => {
                lottieRef.current?.play(180, 0);
            }, 1);
        } else {
            setTimeout(() => {
                lottieRef.current?.reset();
            }, 1);
        }
    }, [wisySpeaking]);

    const { getTime, start, stop, reset } = useTimer();

    useEffect(() => {
        const introPlay = async() => {
            try {
                setLock(true)
                if (level === introTaskIndex && introAudio && (!tutorialShow || tutorials == 0)) {
                    setWisySpeaking(true);
                    setText(introText);
                    await playSoundWithoutStopping(introAudio);
                }
            } catch (error) {
                console.log(error)
            } finally {
                try {
                    if ((data?.content?.question || data?.content?.speech) && (!tutorialShow || tutorials == 0)) {
                        setText(data?.content?.question)
                        setWisySpeaking(true);
                        await playSound(data?.content?.speech);
                    }
                } catch (error) {
                    console.error("cОшибка при воспроизведении звука:", error);
                } finally {
                    setText(null);
                    setWisySpeaking(false)
                    setLock(false)
                }
            }
        }

        introPlay()
    }, [data?.content?.speech, tutorialShow]);
                                
    const playVoice = async (sound) => {
        try {
            setWisySpeaking(true)
            await playSound(sound);
        } catch (error) {
            console.error("Ошибка при воспроизведении звука:", error);
        } finally {
            setText(null);
            setWisySpeaking(false)
            if (sound) {
                setLock(false)
                setId(null)
            } else {
                setTimeout(() => {
                    setId(null)
                    setLock(false)
                }, 1000);
            }
        }
    };

    useEffect(() => {
        start();
        return () => {
            reset();
        }
    }, [])
                            
    // useEffect(() => {
    //     if (id?.id && id?.result) {
    //         if (timeoutRef.current) {
    //             clearTimeout(timeoutRef.current);
    //         }
    //         timeoutRef.current = setTimeout(() => {
    //             setId(null);
    //         }, 2500);
    //     }
    //     return () => {
    //         if (timeoutRef.current) {
    //             clearTimeout(timeoutRef.current);
    //         }
    //     };
    // }, [id]);

    useEffect(() => {
        return () => {
            sound.current.unloadAsync();
        };
    }, [])

    const voice = async (audio) => {
        try {
            sound.current.unloadAsync();
            store.setPlayingMusic(false);
            await sound.current.loadAsync({ uri: audio });
            await sound.current.playAsync();

            sound.current.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    store.setPlayingMusic(true);
                    sound.current.unloadAsync();
                }
            });
        } catch (error) {
            console.log("Error playing audio:", error);
            await sound.current.unloadAsync();
        }
    };

    const vibrate = () => {
        Vibration.vibrate(500);
    };

    const answer = async({ answer }) => {
        try {
            const lead_time = getTime();
            stop();
            setId(null)
            setThinking(true)
            setLock(true)
            const response = await api.answerTaskSC({task_id: data.id, attempt: attempt, child_id: store.playingChildId.id, answer: answer, lead_time: lead_time, token: store.token, lang: store.language})
            if (response && response.stars && response.success) {
                reset()
                if (isFromAttributes) {
                            store.loadCategories();
                        } else {
                            onCompleteTask(subCollectionId, data.next_task_id)
                        }
                setId({id: answer, result: 'correct'})
                setText(response?.hint)

                try {
                    // console.log(response?.sound)
                    setWisySpeaking(true)
                    await playSound(response?.sound)
                } catch (error) {
                    console.log(error)
                } finally {
                    setText(null);
                    setWisySpeaking(false);
                    if (response?.sound) {
                        setId(null)
                    } else {
                        setTimeout(() => {
                            setId(null)
                        }, 1500);
                    }
                    setTimeout(() => {
                        setStars(response?.stars);
                        setEarnedStars(response?.stars - response?.old_stars)
                        setLevel(prev => prev + 1);
                        setLock(false)
                    }, 1500);
                }
                return;
            }
            else if (response && response.stars && !response.success) {
                reset()
                if (isFromAttributes) {
                            store.loadCategories();
                        } else {
                            onCompleteTask(subCollectionId, data.next_task_id)
                        }
                setId({id: answer, result: 'wrong'})
                setText(response?.hint)
                
                try {
                    setWisySpeaking(true)
                    await playSound(response?.sound)
                } catch (error) {
                    console.log(error)
                } finally {
                    setText(null);
                    setWisySpeaking(false);
                    if (response?.sound) {
                        setId(null)
                    } else {
                        setTimeout(() => {
                            setId(null)
                        }, 1500);
                    }
                    setTimeout(() => {
                        setStars(response?.stars);
                        setEarnedStars(response?.stars - response?.old_stars)
                        setLevel(prev => prev + 1);
                        setLock(false)
                    }, 1500);
                }
                return;
            }
            else if (response && !response.success && !response.to_next) {
                start();
                setId({id: answer, result: 'wrong'})
                vibrate();
                setText(response.hint)
                playVoice(response?.sound)
                setAttempt('2')
            } else if(response && response.success) {
                reset()
                if (isFromAttributes) {
                            store.loadCategories();
                        } else {
                            onCompleteTask(subCollectionId, data.next_task_id)
                        }
                setId({id: answer, result: 'correct'})
                setText(response.hint)

                try {
                    setWisySpeaking(true)
                    await playSound(response?.sound)
                } catch (error) {
                    console.log(error)
                } finally {
                    setText(null);
                    setWisySpeaking(false);
                    if (response?.sound) {
                        setId(null)
                    } else {
                        setTimeout(() => {
                            setId(null)
                        }, 1500);
                    }
                    setTimeout(() => {
                        setLevel(prev => prev + 1);
                        setAttempt('1');
                        setLock(false)
                    }, 1500);
                }
            } else if(response && !response.success && response.to_next) {
                reset()
                if (isFromAttributes) {
                    store.loadCategories();
                } else {
                    onCompleteTask(subCollectionId, data.next_task_id)
                }
                setId({id: answer, result: 'wrong'})
                vibrate();
                setText(response.hint)
                try {
                    setWisySpeaking(true)
                    await playSound(response?.sound)
                } catch (error) {
                    console.log(error)
                } finally {
                    setText(null);
                    setWisySpeaking(false);
                    if (response?.sound) {
                        setId(null)
                    } else {
                        setTimeout(() => {
                            setId(null)
                        }, 1500);
                    }
                    setTimeout(() => {
                        setLevel(prev => prev + 1);
                        setAttempt('1');
                        setLock(false)
                    }, 1500);
                }
            }
        } catch (error) {
            console.log(error)
            setLock(false)
        } finally {
            setThinking(false)
        }
    }

    const RenderGame12Component = () => {

        return (
            <View style={{width: windowWidth * (440 / 800), height: 'auto', flexDirection: 'column',  gap: windowWidth * (24 / 800), justifyContent: 'flex-start'}}>
                <View style={{width: '100%', height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#222222', fontWeight: '600', fontSize: windowWidth * (24 / 800)}}>{data?.content?.question}</Text>
                </View>
                <View style={{width: windowWidth * (440 / 800), height: 'auto', gap: windowWidth * (12 / 800), justifyContent: 'space-between', alignItems: 'center'}}>
                    {data && data.content.options && data.content.options.map((option, index) => {

                        // console.log(option.audio)

                        return (
                            <View key={index} style={{width: windowWidth * (440 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 100}}>
                                <View style={{backgroundColor: 'white', borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: option.audio === null? 100 : 0, borderBottomRightRadius: option.audio === null? 100 : 0}}>
                                    <TouchableOpacity onPress={!lock? () => {
                                        answer({ answer: option.id })
                                        if (timeoutRef.current) {
                                            clearTimeout(timeoutRef.current); // Сбрасываем таймер, если был установлен
                                        }
                                        setId(null);
                                        } : () => {return}} style={{width: option.audio != null ? windowWidth * (390 / 800) : windowWidth * (440 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: id?.id == option.id && id?.result == 'correct'? '#ADD64D' : id?.id == option.id && id?.result == 'wrong'? '#D816164D' : 'white', borderColor: id?.id == option.id && id?.result == 'correct'? '#ADD64D' : id?.id == option.id && id?.result == 'wrong'? '#D816164D' : 'white', borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: option.audio === null? 100 : 0, borderBottomRightRadius: option.audio === null? 100 : 0, justifyContent: 'center', paddingLeft: 16}}>
                                        <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: id?.id != null && id?.id == option.id? '#222222' : id?.id != null && id?.id != option.id? '#D4D1D1' : '#222222', textAlign: option.audio === null? 'center' : 'left'}}>{option.text}</Text>
                                    </TouchableOpacity>
                                </View>
                                {option.audio != null && 
                                <View style={{borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: 'white'}}>
                                    <TouchableOpacity onPress={() => voice(option.audio)} style={{width: windowWidth * (46 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: id?.id != null && id?.id != option.id? 'white' : id?.result == 'wrong'? '#D816164D' : id?.result == 'correct'? '#ADD64D' : '#B3ABDB', borderTopRightRadius: 100, borderBottomRightRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={id?.id != null && id?.id != option.id? grayspeaker : id?.result == 'correct' || 'wrong' && id?.id == option.id? black : speaker} style={{width: windowWidth * (24 / 800), height: Platform.isPad? windowWidth * (24 / 800) : windowHeight * (24 / 360)}}/>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <Animated.View style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent', alignItems: Platform.isPad? 'center' : ''}}>
            {tutorialShow && tutorials?.length > 0 && <View style={{ width: windowWidth * (600 / 800), height: windowHeight * (272 / 360), position: 'absolute', alignSelf: 'center', top: '6%' }}>
                <Game8Tutorial tutorials={tutorials}/>
            </View>}
            {(!tutorialShow || tutorials?.length == 0 || isFromAttributes) && <RenderGame12Component />}
            {(!tutorialShow || tutorials?.length == 0 || isFromAttributes) &&  <View style={{width: windowWidth * (255 / 800), position: 'absolute', left: 0, bottom: 0, height: Platform.isPad? windowWidth * (80 / 800) : windowHeight * (80 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                <LottieView
                    ref={lottieRef}
                    resizeMode="cover"
                    source={speakingWisy}
                    style={{
                        width: windowWidth * (64 / 800),
                        height: Platform.isPad ? windowWidth * (64 / 800) : windowHeight * (64 / 360),
                        aspectRatio: 64 / 64,
                    }}
                    autoPlay={false}
                    loop={true}
                />
                <Game3TextAnimation text={text} thinking={thinking}/>
            </View>}
            {tutorialShow && tutorials?.length > 0 && <TouchableOpacity onPress={() => setTutorialShow(false)} style={{width: windowWidth * (58 / 800), height: Platform.isPad? windowWidth * (40 / 800) : windowHeight * (40 / 360), backgroundColor: 'white', alignSelf: 'flex-end', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                                                                    <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowWidth * (12 / 800) : 12, color: '#504297'}}>
                                                                      Skip
                                                                    </Text>
                                                                </TouchableOpacity>}
        </Animated.View>
    )
}

export default Game12Screen;