import React, { useState, useEffect, useCallback } from "react";
import Logo from "../components/Logo";
import { View, Image, Dimensions, TouchableOpacity, ImageBackground, Text, Platform, ActivityIndicator } from "react-native";
import Animated, { SlideInRight, useAnimatedStyle, withTiming } from "react-native-reanimated";
import * as ScreenOrientation from 'expo-screen-orientation';
import image from '../images/BGimage.png'
import narrowLeft from '../images/narrowleft.png'
import narrow from '../images/narrowright-purple.png'
import ChildName from "../components/ChildName";
import ChildAvatar from "../components/ChildAvatar";
import ChildAge from "../components/ChildAge";
import ChildGender from "../components/ChildGender";
import ChildEngagementTime from "../components/ChildEngagementTime";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import api from '../api/api'
import store from "../store/store";

const { width, height } = Dimensions.get('window');

const ChildParams = () => {
    const [keyboardActive, setKeyboardActive] = useState(false)
    const [focusComponent, setFocusComponent] = useState('name')
    const [options, setOptions] = useState({name: '', avatar: '1', age: '', gender: 0, engagement_time: 30})
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            }
            changeScreenOrientation();
        }, [])
    );

    const animatedUp = useAnimatedStyle(() => {
        return {
            height: withTiming(keyboardActive && focusComponent === 'name'? height * (371 / 800) : height * (642 / 800), {duration: 250})
        }
    })

    const animatedProgress = useAnimatedStyle(() => {
        return {
            width: withTiming(focusComponent === 'name'? ((width * 0.8666) / 5) : focusComponent === 'avatar'? ((width * 0.8666) / (5 / 2)) : focusComponent === 'age'? ((width * 0.8666) / (5 / 3)) : focusComponent === 'gender'? ((width * 0.8666) / (5 / 4)) : (width * 0.8666), {duration: 250})
        }
    })

    const addChild = async() => {
        try {
            setLoading(true)
            const requestStatus = await api.addChild(options.name, options.avatar, options.age, options.gender, options.engagement_time)
            await store.setChildren(requestStatus.data)
            if (requestStatus) {
                navigation.navigate('LoaderScreen')
            }
        } catch (error) {
            console.log(error)   
        } finally {
            setLoading(false)
        }
    }

    return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ImageBackground style={{flex: 1}} source={image}>
                    <Animated.View style={[animatedUp, {paddingTop: height * (60 / 932), backgroundColor: 'white', height: height * (642 / 800), alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24}]}>
                        <View style={{marginTop: Platform.OS === 'android'? -40 : 0}}>
                            <Logo />
                        </View>
                        <View style={{width: width * 0.8666, height: 8, backgroundColor: '#F8F8F8', marginVertical: height * (45 / 932), borderRadius: 100}}>
                            <Animated.View style={[animatedProgress, {width: 78, backgroundColor: '#504297', height: '100%', borderRadius: 100}]} />
                        </View>
                        <View style={{marginTop: height * (15 / 800), alignItems: 'center'}}>
                            {
                                focusComponent === 'name' && ScreenOrientation.Orientation.PORTRAIT_UP ?
                                <Animated.View key={ScreenOrientation.Orientation} style={{width: width, height: height * (180 / 800), alignItems: 'center'}}>
                                    <ChildName setKeyboardActive={setKeyboardActive} setOptions={setOptions} options={options}/> 
                                </Animated.View>
                                : focusComponent === 'avatar'?
                                <View style={{width: width, height: height * (360 / 800)}}>
                                    <ChildAvatar /> 
                                </View>
                                : focusComponent === 'gender'?
                                <View style={{width: width * 0.8666, height: height * (244 / 800)}}>
                                    <ChildGender setOptions={setOptions} options={options}/>
                                </View> 
                                : focusComponent === 'engtime'?
                                <View style={{width: width * 0.8666, height: height * (400 / 800), flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <ChildEngagementTime setOptions={setOptions} options={options}/>
                                </View> 
                                :
                                <View style={{height: height * (380 / 800), width: width, alignItems: 'center'}}>
                                    <ChildAge setOptions={setOptions} options={options}/>
                                </View>
                            }
                        </View>
                    </Animated.View>
                    <View style={{justifyContent: 'center', width: width, height: height * (140 / 932)}}>
                        <View style={{justifyContent: 'space-between', paddingHorizontal: 20, width: width, alignItems: 'center', flexDirection: 'row', height: height * (56 / 800)}}>
                            <TouchableOpacity onPress={() => setFocusComponent(prev => prev === 'avatar'? 'name' : prev === 'age'? 'avatar' : prev === 'gender'? 'age' : prev === 'engtime'? 'gender' : navigation.navigate('ChoosePlayerScreen'))} style={{width: width * (56 / 360), justifyContent: 'center', alignItems: 'center', height: height * (56 / 800), backgroundColor: '#F8F8F833', borderRadius: 100}}>
                                <Image source={narrowLeft} style={{width: height * (24 / 800), height: height * (24 / 800),}}/>
                            </TouchableOpacity>
                            {options[focusComponent] === ''?
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', gap: height * (8 / 800), flexDirection: 'row', padding: height * (16 / 800), width: width * (121 / 360), height: height * (56 / 800), backgroundColor: 'white', borderRadius: 100, opacity: 0.3}}>
                                <Text style={{color: '#504297', fontSize: height * (14 / 800), fontWeight: '600'}}>Continue</Text>
                                <Image source={narrow} style={{width: height * (24 / 800), height: height * (24 / 800), aspectRatio: 24 / 24}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={focusComponent === 'engtime' && !loading? () => addChild() : () => setFocusComponent(prev => prev === 'name'? 'avatar' : prev === 'avatar'? 'age' : prev === 'age'? 'gender' : prev === 'gender'? 'engtime' : 'engtime')} style={{alignItems: 'center', justifyContent: 'center', gap: height * (8 / 800), flexDirection: 'row', padding: height * (16 / 800), width: width * (121 / 360), height: height * (56 / 800), backgroundColor: 'white', borderRadius: 100}}>
                                <Text style={{color: '#504297', fontSize: height * (14 / 800), fontWeight: '600'}}>Continue</Text>
                                <Image source={narrow} style={{width: height * (24 / 800), height: height * (24 / 800), aspectRatio: 24 / 24}}/>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {loading && <ActivityIndicator color='#504297' style={{position: 'absolute', alignSelf: 'center', top: 0, left: 0, right: 0, bottom: 0}}/>}
                </ImageBackground>
            </View>  
    )
}

export default ChildParams;

{/* <FlatList 
    data={components}
    renderItem={renderItem}
    keyExtractor={item => item.key}
    horizontal
    style={{position: 'absolute', top: 250}}
    showsHorizontalScrollIndicator={false}
    scrollEnabled={true}
/> */}

// const toggleKeyboard = () => {
    //     Keyboard.dismiss()
    //     setKeyboardActive(false)
    // }

    // const components = [
    //     {key: '1', component: <ChildName setKeyboardActive={setKeyboardActive}/>},
    //     {key: '2', component: <ChildAvatar />},
    // ]

    // const renderItem = ({ item }) => {
    //     return (
    //             <View style={{width: width, alignItems: 'center'}}>
    //                 {item.component}
    //             </View>
    //     )
    // }