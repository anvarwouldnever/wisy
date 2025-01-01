import React, { useState } from "react";
import { TouchableOpacity, View, useWindowDimensions, Image, Text } from "react-native";
import mail from '../images/mail.png'
import narrowright from '../images/narrowright.png'
import password from '../images/password.png'
import support from '../images/message.png'
import speaker from '../images/speaker.png'
import Animated, { withTiming, useAnimatedStyle } from "react-native-reanimated";
import text from '../images/text.png'
import NewPasswordModal from "./NewPasswordModal";
import PopUpModal from "./PopUpModal";
import { useNavigation } from "@react-navigation/native";
import store from "../store/store";

const ParentsSettings = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [toggleState, setToggleState] = useState('on')
    const [modal, setModal] = useState(false)
    const [popUpModal, setPopUpModal] = useState(false)
    const [secure, setSecure] = useState(true)
    const navigation = useNavigation()

    const animatedToggle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: withTiming(toggleState === 'on'? windowHeight * (9 / 800) : 0, {duration: 300})
            }],
            backgroundColor: withTiming(toggleState === 'off'? 'white' : 'black', {duration: 400})
        }
    })

    const logout = () => {
        store.setToken(null)
        // setTimeout(() => {
        //     navigation.navigate('AuthScreen')
        // }, 100);
    }

    return (
            <View style={{width: windowWidth * (312 / 360), backgroundColor: 'white', alignItems: 'center', height: windowHeight * (414 / 800), gap: 16}}>
                <PopUpModal modal={popUpModal} setModal={setPopUpModal}/>
                <Text style={{width: windowWidth * (312 / 360), height: windowHeight * (24 / 800), fontWeight: '600', fontSize: windowHeight * (16 / 800), lineHeight: windowHeight * (24 / 800)}}>Settings</Text>
                <View style={{width: 'auto', height: windowHeight * (328 / 800), alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
                    <TouchableOpacity style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10, gap: 8}}>
                        <Image source={mail} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: '#222222', width: windowWidth * (216 / 360)}}>Change email</Text>
                        <Image source={narrowright} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModal(true)} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10}}>
                        <Image source={password} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: '#222222', width: windowWidth * (216 / 360)}}>Change password</Text>
                        <Image source={narrowright} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {setToggleState(prev => prev === 'on'? 'off' : 'on')}} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10}}>
                        <Image source={speaker} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: '#222222', width: windowWidth * (216 / 360)}}>Voice instructions</Text>
                        <View style={{width: windowHeight * (22 / 800), height: windowHeight * (14 / 800), borderWidth: windowHeight * (2 / 800), borderColor: '#222222', borderRadius: 100, justifyContent: 'center', padding: 2}}>
                            <Animated.View style={[animatedToggle, {backgroundColor: 'black', borderWidth: windowHeight * (2 / 800), borderColor: 'black', width: windowHeight * (6 / 800), height: windowHeight * (6 / 800), borderRadius: 100}]}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10}}>
                        <Image source={text} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: '#222222', width: windowWidth * (216 / 360)}}>Text instructions</Text>
                        <View style={{width: windowHeight * (22 / 800), height: windowHeight * (14 / 800), borderWidth: windowHeight * (2 / 800), borderColor: '#222222', borderRadius: 100, justifyContent: 'center', padding: 2}}>
                            <Animated.View style={[{backgroundColor: 'black', borderWidth: windowHeight * (2 / 800), borderColor: 'black', width: windowHeight * (6 / 800), height: windowHeight * (6 / 800), borderRadius: 100}]}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TextToSpeech')} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10}}>
                        <Image source={support} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: '#222222', width: windowWidth * (216 / 360)}}>Support</Text>
                        <Image source={narrowright} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: windowHeight * (16 / 800), borderRadius: 10}}>
                        <Image source={support} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        <Text style={{fontSize: windowHeight * (14 / 800), fontWeight: '600', lineHeight: windowHeight * (20 / 800), color: 'red', width: windowWidth * (216 / 360)}}>Logout</Text>
                        <Image source={narrowright} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    </TouchableOpacity>
                </View>
                <NewPasswordModal secure={secure} modal={modal} setModal={setModal} setSecure={setSecure} setPopUpModal={setPopUpModal}/>
            </View> 
    )
}

export default ParentsSettings;